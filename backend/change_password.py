import asyncio
import os
import getpass
from dotenv import load_dotenv
import passlib.context
from motor.motor_asyncio import AsyncIOMotorClient

# Load the environment variables to get MONGO_URL
load_dotenv(".env")
pwd_context = passlib.context.CryptContext(schemes=["bcrypt"], deprecated="auto")

async def update_password():
    client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
    db = client[os.getenv("DB_NAME")]
    
    print("--- Admin Password Reset Utility ---")
    username = input("Enter admin username (e.g., akash): ").strip()
    
    admin = await db["admins"].find_one({"username": username})
    
    if not admin:
        print(f"Error: User '{username}' not found in the database!")
        return
        
    new_password = getpass.getpass("Enter new password: ")
    confirm_password = getpass.getpass("Confirm new password: ")
    
    if new_password != confirm_password:
        print("Passwords do not match! Aborting.")
        return
        
    hashed = pwd_context.hash(new_password)
    
    await db["admins"].update_one(
        {"username": username},
        {"$set": {"hashed_password": hashed}}
    )
    print(f"\nSuccess! The password for '{username}' has been securely updated.")

if __name__ == "__main__":
    asyncio.run(update_password())
