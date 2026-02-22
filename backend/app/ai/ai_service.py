import httpx
import os
from app.database import database

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

async def generate_ai_response(user_message: str):

    # Fetch projects for context
    projects = []
    async for project in database["projects"].find():
        projects.append(
            f"{project['title']}: {project['description']} (Tech: {', '.join(project['techStack'])})"
        )

    project_context = "\n".join(projects)

    # Fetch resume context
    import json
    resume_data = await database["resume"].find_one({}, {"_id": 0})
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
    3. If a user asks ANYTHING unrelated to the provided portfolio information, you MUST immediately and ONLY reply with the following exact sentence, without any preamble or additional facts: "I specialize in answering questions about Akash’s projects and technical experience. Feel free to ask about his AI systems, full-stack projects, or data analytics work."
    """

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "nvidia/nemotron-nano-12b-v2-vl:free",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                "reasoning": {"enabled": True}
            }
        )

    # We extract the content as usual. The reasoning details (if requested by frontend) could be in message["reasoning_details"] if needed.
    return response.json()["choices"][0]["message"]["content"]