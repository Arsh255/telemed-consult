from fastapi import FastAPI

from routes.messages import router as message_router

app = FastAPI(title="Telemed Consult Messages API")

app.include_router(message_router)

@app.get("/")
def root():
    return {"message": "Telemed Consult Messages API is running"}
