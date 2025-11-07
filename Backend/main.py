from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

app = FastAPI()

# Enable frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ MongoDB Connection
MONGO_URI = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URI)
database = client["dashboardDB"]
collection = database["dashboardData"]

# ✅ Root route (for check)
@app.get("/")
def root():
    return {"message": "Backend is connected and running!"}

# ✅ Main Data API
@app.get("/data")
async def get_data(end_year: str = None, topic: str = None, country: str = None):
    try:
        filters = {}
        if end_year:
            filters["end_year"] = end_year
        if topic:
            filters["topic"] = topic
        if country:
            filters["country"] = country

        # Fetch data from MongoDB
        data = await collection.find(filters).to_list(1000)

        # Convert ObjectId to string
        for item in data:
            item["_id"] = str(item["_id"])
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
