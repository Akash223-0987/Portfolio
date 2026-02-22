from pydantic import BaseModel, EmailStr
from datetime import datetime

class Contact(BaseModel):
    name: str
    email: EmailStr
    message: str