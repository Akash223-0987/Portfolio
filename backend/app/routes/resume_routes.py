from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import Response
from app.database import database
from app.auth.jwt_handler import get_current_admin
from bson import Binary

router = APIRouter()

@router.post("/")
async def upload_resume(file: UploadFile = File(...), admin: str = Depends(get_current_admin)):
    """Upload or update the resume PDF document."""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    file_content = await file.read()
    
    # Check max size (16MB limitation roughly)
    if len(file_content) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large")

    # Store it in memory DB using Binary
    doc = {
        "_id": "current_resume",
        "filename": file.filename,
        "content_type": file.content_type,
        "data": Binary(file_content)
    }

    await database["resume_file"].replace_one({"_id": "current_resume"}, doc, upsert=True)
    return {"message": "Resume uploaded successfully", "filename": file.filename}

@router.get("/")
async def download_resume():
    """Download the current resume."""
    doc = await database["resume_file"].find_one({"_id": "current_resume"})
    if not doc:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return Response(
        content=doc["data"],
        media_type=doc["content_type"],
        headers={"Content-Disposition": f"inline; filename={doc['filename']}"}
    )

@router.delete("/")
async def delete_resume(admin: str = Depends(get_current_admin)):
    """Delete the current resume."""
    result = await database["resume_file"].delete_one({"_id": "current_resume"})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {"message": "Resume deleted successfully"}

@router.get("/status")
async def get_resume_status():
    """Check if a resume exists and grab its filename."""
    doc = await database["resume_file"].find_one({"_id": "current_resume"}, {"filename": 1})
    if doc:
        return {"exists": True, "filename": doc.get("filename")}
    return {"exists": False, "filename": None}
