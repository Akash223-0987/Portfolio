from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Project(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    techStack: List[str]
    githubUrl: str
    liveUrl: Optional[str] = None
    ongoing: Optional[bool] = False
    featured: Optional[bool] = False
    created_at: Optional[datetime] = None
