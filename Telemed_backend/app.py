from fastapi import FastAPI


app = FastAPI(title="Telemed Consult Messages API")

@app.get("/")
def root():
    return {"message": "Telemed Consult Messages APIs is running"}