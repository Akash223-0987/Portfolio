import json
from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.ai_service import generate_ai_response, generate_ai_response_stream
from fastapi.responses import StreamingResponse

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(request: ChatRequest):
    reply = await generate_ai_response(request.message)
    return {"response": reply}

async def _sse_generator(message: str):
    """Wrap each AI chunk in proper SSE format: data: <json>\n\n"""
    async for chunk in generate_ai_response_stream(message):
        payload = json.dumps({"text": chunk})
        yield f"data: {payload}\n\n"
    yield "data: [DONE]\n\n"

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        _sse_generator(request.message),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # disable Nginx/Render buffering
        }
    )
