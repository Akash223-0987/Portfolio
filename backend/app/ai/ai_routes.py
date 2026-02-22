from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.ai_service import generate_ai_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(request: ChatRequest):
    reply = await generate_ai_response(request.message)
    return {"response": reply}