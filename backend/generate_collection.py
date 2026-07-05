import json
import uuid

collection = {
    "info": {
        "_postman_id": str(uuid.uuid4()),
        "name": "StayEase API",
        "description": "API collection for Deliverable 2",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": []
}

base_url = "http://localhost:5000"

example_listing = {
    "id": 1,
    "name": "Eco-Friendly Treehouse",
    "location": "Kerala, India",
    "price": 2500,
    "rating": 4.8,
    "reviews": 120,
    "tag": "Eco",
    "image": "https://example.com/image.jpg",
    "amenities": ["WiFi", "Solar Power", "Organic Food"],
    "description": "A beautiful treehouse built with sustainable materials.",
    "category": "Treehouse"
}

# 1. Get All Listings
collection["item"].append({
    "name": "Get All Listings",
    "request": {
        "method": "GET",
        "header": [],
        "url": {
            "raw": f"{base_url}/api/listings",
            "protocol": "http",
            "host": ["localhost"],
            "port": "5000",
            "path": ["api", "listings"]
        }
    },
    "response": [{
        "name": "Example Response",
        "originalRequest": {
            "method": "GET",
            "url": f"{base_url}/api/listings"
        },
        "status": "OK",
        "code": 200,
        "_postman_previewlanguage": "json",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "cookie": [],
        "body": json.dumps([example_listing], indent=4)
    }]
})

# 2. Search Listings
collection["item"].append({
    "name": "Search Listings",
    "request": {
        "method": "GET",
        "header": [],
        "url": {
            "raw": f"{base_url}/api/listings/search?q=Eco",
            "protocol": "http",
            "host": ["localhost"],
            "port": "5000",
            "path": ["api", "listings", "search"],
            "query": [{"key": "q", "value": "Eco"}]
        }
    },
    "response": [{
        "name": "Example Response",
        "originalRequest": {
            "method": "GET",
            "url": f"{base_url}/api/listings/search?q=Eco"
        },
        "status": "OK",
        "code": 200,
        "_postman_previewlanguage": "json",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "cookie": [],
        "body": json.dumps([example_listing], indent=4)
    }]
})

# 3. Get Listing by ID
collection["item"].append({
    "name": "Get Listing by ID",
    "request": {
        "method": "GET",
        "header": [],
        "url": {
            "raw": f"{base_url}/api/listings/1",
            "protocol": "http",
            "host": ["localhost"],
            "port": "5000",
            "path": ["api", "listings", "1"]
        }
    },
    "response": [{
        "name": "Example Response",
        "originalRequest": {
            "method": "GET",
            "url": f"{base_url}/api/listings/1"
        },
        "status": "OK",
        "code": 200,
        "_postman_previewlanguage": "json",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "cookie": [],
        "body": json.dumps(example_listing, indent=4)
    }]
})

# 4. Create Listing
create_payload = {k: v for k, v in example_listing.items() if k != "id"}
collection["item"].append({
    "name": "Create Listing",
    "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
            "mode": "raw",
            "raw": json.dumps(create_payload, indent=4)
        },
        "url": {
            "raw": f"{base_url}/api/listings",
            "protocol": "http",
            "host": ["localhost"],
            "port": "5000",
            "path": ["api", "listings"]
        }
    },
    "response": [{
        "name": "Example Response",
        "originalRequest": {
            "method": "POST",
            "url": f"{base_url}/api/listings"
        },
        "status": "Created",
        "code": 201,
        "_postman_previewlanguage": "json",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "cookie": [],
        "body": json.dumps(example_listing, indent=4)
    }]
})

# 5. Update Listing
update_payload = {"price": 3000, "description": "Updated description"}
updated_listing = example_listing.copy()
updated_listing.update(update_payload)
collection["item"].append({
    "name": "Update Listing",
    "request": {
        "method": "PUT",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
            "mode": "raw",
            "raw": json.dumps(update_payload, indent=4)
        },
        "url": {
            "raw": f"{base_url}/api/listings/1",
            "protocol": "http",
            "host": ["localhost"],
            "port": "5000",
            "path": ["api", "listings", "1"]
        }
    },
    "response": [{
        "name": "Example Response",
        "originalRequest": {
            "method": "PUT",
            "url": f"{base_url}/api/listings/1"
        },
        "status": "OK",
        "code": 200,
        "_postman_previewlanguage": "json",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "cookie": [],
        "body": json.dumps(updated_listing, indent=4)
    }]
})

# 6. Delete Listing
collection["item"].append({
    "name": "Delete Listing",
    "request": {
        "method": "DELETE",
        "header": [],
        "url": {
            "raw": f"{base_url}/api/listings/1",
            "protocol": "http",
            "host": ["localhost"],
            "port": "5000",
            "path": ["api", "listings", "1"]
        }
    },
    "response": [{
        "name": "Example Response",
        "originalRequest": {
            "method": "DELETE",
            "url": f"{base_url}/api/listings/1"
        },
        "status": "No Content",
        "code": 204,
        "_postman_previewlanguage": "text",
        "header": [],
        "cookie": [],
        "body": ""
    }]
})

with open("W4_APICollection_YOUR_INTERN_ID.json", "w") as f:
    json.dump(collection, f, indent=4)

print("Generated W4_APICollection_YOUR_INTERN_ID.json")
