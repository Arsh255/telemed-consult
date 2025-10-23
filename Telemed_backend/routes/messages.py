from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from models.message_model import Message
from db import messages_collection, consultations_collection

router = APIRouter()

@router.post("/messages")
def add_message(message: Message):
    consultation = consultations_collection.find_one({"consultation_id": message.consultation_id})
    if not consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")

    result = messages_collection.insert_one(message.dict())
    return {"message": "Message added successfully", "id": str(result.inserted_id)}
