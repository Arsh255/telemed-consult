Telemed Consult Messages — Full Stack Solution (FastAPI + React + MongoDB Atlas)

Overview
This project implements a simple telemedicine consultation messaging system where patients and doctors can exchange and review messages during virtual consultations.

Technologies Used
- Backend: FastAPI (Python) with PyMongo
- Frontend: React (Vite) with Axios
- Database: MongoDB Atlas (cloud-hosted)
- Data Model: Consultations and Messages collections

------------------------------------------------------------

Setup Instructions

Backend Setup (FastAPI + MongoDB Atlas)

1. Clone and set up environment
git clone <your-repo-url>
cd telemed-backend
python -m venv venv

Activate the virtual environment:
venv\Scripts\activate       # Windows
source venv/bin/activate      # macOS/Linux

2. Install dependencies
pip install -r requirements.txt

3. Configure environment
cp .env.example .env

Edit .env and add your MongoDB Atlas credentials:
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/telemed
DB_NAME=telemed

4. Seed sample data
python seed_data.py

5. Run the backend
uvicorn app:app --reload

API available at: http://127.0.0.1:8000

------------------------------------------------------------

Frontend Setup (React + Vite)

1. Navigate to the frontend directory and install dependencies
cd telemed-frontend
npm install

2. Configure API endpoint
cp .env.example .env

Edit .env:
VITE_API_URL=http://127.0.0.1:8000

3. Start the frontend
npm run dev

Application available at: http://localhost:5173

------------------------------------------------------------

API Documentation

Add Message
Endpoint: POST /messages

Request Body:
{
  "consultation_id": "CONSULT_001",
  "author": "P123",
  "role": "patient",
  "content": "Feeling dizzy today"
}

Response:
{
  "message": "Message added successfully",
  "id": "6720b3f1e4d34f2a9e1ab1b2"
}

Retrieve Messages
Endpoint: GET /consultations/{consultation_id}/messages

Optional Query Parameters:
- role=doctor
- role=patient

Example Request:
GET /consultations/CONSULT_001/messages?role=doctor

Example Response:
{
  "consultation_id": "CONSULT_001",
  "messages": [
    {
      "_id": "6720b3f1e4d34f2a9e1ab1b2",
      "author": "D456",
      "role": "doctor",
      "content": "Have you taken any medication yet?",
      "timestamp": "2025-10-23T14:00:00Z"
    }
  ]
}

------------------------------------------------------------

Architecture Decisions

Data Model

Consultations Collection:
{
  "_id": ObjectId,
  "consultation_id": "CONSULT_001",
  "patient_id": "P123",
  "doctor_id": "D456",
  "created_at": "2025-10-23T14:00:00Z"
}

Messages Collection:
{
  "_id": ObjectId,
  "consultation_id": "CONSULT_001",
  "author": "P123",
  "role": "patient",
  "content": "Hi doctor, I have been having headaches.",
  "timestamp": "2025-10-23T14:05:00Z"
}

Indexes:
- consultation_id: Optimized for message retrieval per consultation
- timestamp: Enables chronological sorting

Relationship:
One consultation has multiple messages.

------------------------------------------------------------

Technology Choices

Layer | Technology | Rationale
Backend | FastAPI (Python) | Lightweight, asynchronous, modern REST API framework
Database | MongoDB Atlas (PyMongo) | Flexible schema, scalable JSON-like storage
Frontend | React (Vite, Axios) | Efficient UI rendering and data fetching
Configuration | dotenv | Secure environment variable management
Middleware | CORS | Enables frontend-backend communication

------------------------------------------------------------

Sample Data

Consultation 1: Patient P123 and Doctor D456
Six messages discussing headache symptoms.

Consultation 2: Patient P789 and Doctor D012
Six messages discussing medication side effects.

------------------------------------------------------------

Example Usage

Add a Message
curl -X POST http://127.0.0.1:8000/messages -H "Content-Type: application/json" -d '{"consultation_id": "CONSULT_001", "author": "P123", "role": "patient", "content": "Feeling dizzy"}'

Retrieve Messages
curl "http://127.0.0.1:8000/consultations/CONSULT_001/messages"

For Seeding data into database: 

Add Consultation 1 Messages:
curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_001", "author": "P123", "role": "patient", "content": "Hi doctor, I have been having headaches since yesterday."}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_001", "author": "D456", "role": "doctor", "content": "Hello! Can you describe the pain and its frequency?"}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_001", "author": "P123", "role": "patient", "content": "It’s a dull pain, comes and goes every few hours."}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_001", "author": "D456", "role": "doctor", "content": "Okay. Have you taken any medication yet?"}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_001", "author": "P123", "role": "patient", "content": "Just paracetamol, but it doesn’t help much."}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_001", "author": "D456", "role": "doctor", "content": "Understood. I’ll prescribe something stronger."}'

Add Consultation 2 Messages:

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_002", "author": "P789", "role": "patient", "content": "Doctor, my new medicine makes me dizzy."}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_002", "author": "D012", "role": "doctor", "content": "Which medication are you referring to?"}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_002", "author": "P789", "role": "patient", "content": "The one you prescribed for high blood pressure."}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_002", "author": "D012", "role": "doctor", "content": "Alright, I suggest you reduce the dosage for now."}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_002", "author": "P789", "role": "patient", "content": "Okay, should I take it every alternate day?"}'

curl -X POST http://127.0.0.1:8000/messages \
  -H "Content-Type: application/json" \
  -d '{"consultation_id": "CONSULT_002", "author": "D012", "role": "doctor", "content": "Yes, and make sure to check your blood pressure daily."}'


------------------------------------------------------------

Making This Production-Ready

Category | Recommended Improvements
Security | Implement JWT-based authentication, enable HTTPS, add audit logging
Performance | Introduce database indexing and caching for recent consultations
Reliability | Add unit and integration testing, implement error monitoring
Scalability | Use WebSocket for real-time chat and asynchronous message queues
Data Integrity | Apply stricter schema validation and atomic transactions
Compliance | Ensure encrypted data storage and audit logging for healthcare compliance
DevOps | Dockerize frontend and backend, establish CI/CD pipelines

------------------------------------------------------------

Tools Used
- Python 3.10+
- FastAPI
- PyMongo
- MongoDB Atlas
- React
- Axios
- dotenv
- Uvicorn

------------------------------------------------------------

Author Notes
Developed by Arshad Vhora for the Praxes Full Stack Coding Challenge.
This solution focuses on clean architecture, clarity, and functional correctness.
The backend and frontend communicate seamlessly via REST APIs, with pre-seeded data for easy testing and evaluation.

------------------------------------------------------------

Submission Ready
This project, including backend, frontend, and documentation, meets all functional and design requirements outlined in the challenge.
