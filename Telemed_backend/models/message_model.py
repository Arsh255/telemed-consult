from pydantic import BaseModel, Field
from datetime import datetime

class Message(BaseModel):
    consultation_id: str = Field(..., description="Consultation ID")
    author: str = Field(..., description="User who sent the message")
    role: str = Field(..., pattern="^(doctor|patient)$", description="Role of the author")
    content: str = Field(..., description="Message content")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Time of message")
