from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.project_routes import router as project_router
from app.routes.contact_routes import router as contact_router
from app.routes.resume_routes import router as resume_router
from app.auth.auth_routes import router as auth_router
from app.ai.ai_routes import router as ai_router




app = FastAPI()

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://dakashdora.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(project_router, prefix="/projects", tags=["Projects"])
app.include_router(contact_router, prefix="/contact", tags=["Contact"])
app.include_router(resume_router, prefix="/resume", tags=["Resume"])
app.include_router(ai_router, prefix="/ai", tags=["AI"])

@app.get("/")
async def root():
    return {"message": "Portfolio Backend Running 🚀"}


@app.get("/healthz")
def health_check():
    return {"status": "ok"}
