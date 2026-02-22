from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from app.database import database
from app.models.admin_model import Token, Admin
from app.auth.jwt_handler import verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_password_hash
from datetime import timedelta

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    # Find user in DB
    admin = await database["admins"].find_one({"username": form_data.username})
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(form_data.password, admin["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Only for initial setup, disable or delete in production
class SetupAdminRequest(BaseModel):
    username: str
    password: str

@router.post("/setup-admin", status_code=status.HTTP_201_CREATED)
async def setup_admin(admin_data: SetupAdminRequest):
    # Check if admin already exists
    admin_count = await database["admins"].count_documents({})
    if admin_count > 0:
        raise HTTPException(status_code=400, detail="Admin already exists.")
        
    hashed_password = get_password_hash(admin_data.password)
    new_admin = {
        "username": admin_data.username,
        "hashed_password": hashed_password
    }
    
    result = await database["admins"].insert_one(new_admin)
    return {"message": "Admin created successfully", "id": str(result.inserted_id)}
