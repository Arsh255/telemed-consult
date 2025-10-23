from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.messages import router as message_router

app = FastAPI(title="Telemed Consult Messages API")

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(message_router)

@app.get("/")
def root():
    return {"message": "Telemed Consult Messages API is running"}
