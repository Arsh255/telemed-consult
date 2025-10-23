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

@router.get("/consultations/{consultation_id}/messages")
def get_messages(consultation_id: str, role: Optional[str] = Query(None, regex="^(doctor|patient)$")):
    query = {"consultation_id": consultation_id}
    if role:
        query["role"] = role

    messages = list(messages_collection.find(query).sort("timestamp", 1))
    if not messages:
        raise HTTPException(status_code=404, detail="No messages found for this consultation")

    for msg in messages:
        msg["_id"] = str(msg["_id"])
    return {"consultation_id": consultation_id, "messages": messages}
