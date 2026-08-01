import httpx
import os
import asyncio
import json
from app.database import database

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

async def generate_ai_response_stream(user_message: str):
    # Concurrently fetch projects and resume details from MongoDB to optimize speed
    projects_task = database["projects"].find().to_list(length=100)
    resume_task = database["resume"].find_one({}, {"_id": 0})
    
    projects_data, resume_data = await asyncio.gather(projects_task, resume_task)

    projects = [
        f"{project['title']}: {project['description']} (Tech: {', '.join(project['techStack'])})"
        for project in projects_data
    ]
    project_context = "\n".join(projects)
    resume_context = json.dumps(resume_data, indent=2) if resume_data else "Resume details not available."

    system_prompt = f"""
    You are ARC, an AI assistant strictly designed ONLY to answer questions about D Akash Dora's resume, projects, skills, and professional experience.

    Use the following project and resume information to answer questions about Akash:

    --- PROJECTS ---
    {project_context}

    --- RESUME & SKILLS ---
    {resume_context}

    Be professional, concise, and confident in your responses. 

    CRITICAL RULES:
    1. NEVER answer general knowledge questions, math problems, politics, trivia, or provide random coding help unrelated to Akash.
    2. NEVER provide outside factual information (e.g., if asked "who is the prime minister?", DO NOT provide the answer).
    3. If a user asks ANYTHING unrelated to the provided portfolio information, you MUST immediately and ONLY reply with the following exact sentence: "I specialize in answering questions about Akash’s projects and technical experience. Feel free to ask about his AI systems, full-stack projects, or data analytics work."
    """

    models_to_try = [
        "google/gemma-4-26b-a4b-it:free",
        "poolside/laguna-s-2.1:free",
        "arcee-ai/trinity-large-thinking:free",
        "poolside/laguna-xs.2:free",
        "minimax/minimax-m2.5:free",
        "deepseek/deepseek-chat:free",
        "google/gemma-3-4b-it:free",
        "meta-llama/llama-3.3-70b-instruct:free"
    ]

    # Use a shorter, custom timeout configuration to fail over quickly (e.g. 5-12s)
    # instead of hanging for 60 seconds when a free OpenRouter model is rate-limited, overloaded, or down.
    timeout_config = httpx.Timeout(timeout=12.0, connect=4.0, read=8.0)
    async with httpx.AsyncClient(timeout=timeout_config) as client:
        for model in models_to_try:
            try:
                print(f"Trying AI model: {model} with Reasoning Enabled")
                async with client.stream(
                    "POST",
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                        "Content-Type": "application/json",
                        "X-Title": "Akash Portfolio AI"
                    },
                    json={
                        "model": model,
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": user_message}
                        ],
                        "stream": True,
                        "reasoning": {"enabled": True}  # Enable reasoning as requested
                    }
                ) as response:

                    if response.status_code == 429:
                        print(f"Rate limited on {model}")
                        continue
                        
                    if response.status_code != 200:
                        print(f"Error {response.status_code} on {model}")
                        continue
                    
                    async for line in response.aiter_lines():
                        if line.startswith("data: "):
                            data_str = line[6:]
                            if data_str == "[DONE]":
                                break
                            try:
                                data = json.loads(data_str)

                                if "usage" in data:
                                    usage = data["usage"]
                                    reasoning_tokens = usage.get("reasoningTokens", usage.get("reasoning_tokens"))
                                    if reasoning_tokens:
                                        print(f"\nReasoning tokens: {reasoning_tokens}")

                                if "choices" in data and len(data["choices"]) > 0:
                                    delta = data["choices"][0].get("delta", {})
                                    # Skip internal reasoning/thinking tokens — never expose to users
                                    delta_type = delta.get("type", "")
                                    if delta_type == "reasoning":
                                        continue
                                    content = delta.get("content", "")
                                    if content:
                                        yield content
                            except Exception as parse_err:
                                print(f"SSE parse error: {parse_err}")
                                continue
                    return # Successfully streamed

            except Exception as e:
                print(f"Exception calling {model}: {e}")
                continue

        yield "I'm currently receiving high traffic on my free intelligence tiers. Please check back in a few minutes!"

async def generate_ai_response(user_message: str):
    """Wait for the full stream and return it (for non-streaming UI)"""
    full_text = ""
    async for chunk in generate_ai_response_stream(user_message):
        full_text += chunk
    return full_text
