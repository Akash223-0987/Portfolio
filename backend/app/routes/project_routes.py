from fastapi import APIRouter, Depends, HTTPException
from app.database import database
from app.models.project_model import Project
from app.auth.jwt_handler import get_current_admin
from bson import ObjectId
from datetime import datetime

router = APIRouter()
collection = database["projects"]

# Create project
@router.post("/")
async def create_project(project: Project, admin: dict = Depends(get_current_admin)):
    project_data = project.model_dump(exclude_unset=True)
    if "id" in project_data:
        del project_data["id"]
    if "created_at" not in project_data:
        project_data["created_at"] = datetime.utcnow()
        
    result = await collection.insert_one(project_data)
    return {
        "message": "Project created successfully",
        "id": str(result.inserted_id)
    }

# Get all projects
@router.get("/")
async def get_projects():
    projects = []
    # Find all, sorting isn't strictly necessary but helpful. Using find()
    async for project in collection.find():
        project["id"] = str(project["_id"])
        
        # Normalize MongoDB output for old schema compatibility
        if "github" in project:
            project["githubUrl"] = project.pop("github")
        if "liveDemo" in project:
            project["liveUrl"] = project.pop("liveDemo")
            
        del project["_id"]
        projects.append(project)
    
    # Sort projects locally if created_at is mixed or missing, or just return as is
    return projects

# Update project
@router.put("/{project_id}")
async def update_project(project_id: str, project: Project, admin: dict = Depends(get_current_admin)):
    project_data = project.model_dump(exclude_unset=True)
    if "id" in project_data:
        del project_data["id"]

    result = await collection.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": project_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
        
    return {"message": "Project updated successfully"}

# Delete project
@router.delete("/{project_id}")
async def delete_project(project_id: str, admin: dict = Depends(get_current_admin)):
    result = await collection.delete_one({"_id": ObjectId(project_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}
