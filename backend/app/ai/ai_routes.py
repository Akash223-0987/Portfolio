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

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        generate_ai_response_stream(request.message),
        media_type="text/event-stream"
    )
