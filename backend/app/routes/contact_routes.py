from fastapi import APIRouter
from app.database import database
from app.models.contact_model import Contact
from datetime import datetime

router = APIRouter()
collection = database["contacts"]

@router.post("/")
async def create_contact(contact: Contact):
    contact_data = contact.model_dump()
    contact_data["created_at"] = datetime.utcnow()

    result = await collection.insert_one(contact_data)

    return {
        "message": "Message received successfully ✅",
        "id": str(result.inserted_id)
    }
