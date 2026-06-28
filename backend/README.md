# StayEase FastAPI Backend

This is the backend for the StayEase full-stack application, built using FastAPI.

## Setup Instructions

### 1. Create a Virtual Environment

```bash
python -m venv venv
```

### 2. Activate the Virtual Environment

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **macOS / Linux:**
  ```bash
  source venv/bin/activate
  ```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Server

```bash
uvicorn main:app --reload --port 5000
```

The API will be available at `http://localhost:5000`. 
API Documentation (Swagger UI) will be at `http://localhost:5000/docs`.

## API Endpoints

- `GET /api/listings`: Get all listings
- `GET /api/listings/{id}`: Get a single listing by ID
- `POST /api/listings`: Create a new listing
- `PUT /api/listings/{id}`: Update an existing listing
- `DELETE /api/listings/{id}`: Delete a listing
- `GET /api/listings/search?q=`: Search listings by name or location
