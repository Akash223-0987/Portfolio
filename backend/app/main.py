from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.project_routes import router as project_router
from app.routes.contact_routes import router as contact_router
from app.auth.auth_routes import router as auth_router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(project_router, prefix="/projects", tags=["Projects"])
app.include_router(contact_router, prefix="/contact", tags=["Contact"])

@app.get("/")
async def root():
    return {"message": "Portfolio Backend Running 🚀"}
