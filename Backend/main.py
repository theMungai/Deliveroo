# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.config import settings
from app.routes import users, parcels, auth, admins, weight_categories 

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://deliveroo-three.vercel.app/"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(users.router)
    app.include_router(parcels.router)
    app.include_router(auth.router) 
    app.include_router(admins.router)
    app.include_router(weight_categories.router)

    return app

import uvicorn
import os

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)


