from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.config import settings

from app.routes import users, parcels, auth, admins, weight_categories 
def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version="1.0.0"
    )

    # Register routers
    app.include_router(users.router)
    app.include_router(parcels.router)
    # app.include_router(auth.router)
    app.include_router(admins.router)
    app.include_router(weight_categories.router)

    # Setup CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
