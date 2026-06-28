# In-memory data store for listings
listings_db = [
    {
        "id": 1,
        "name": "Mountain View Homestay",
        "location": "Manali, Himachal Pradesh",
        "price": 3200,
        "rating": 4.9,
        "reviews": 128,
        "tag": "🏆 Top Rated",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=75",
        "amenities": ["🏔️ Mountain View", "🔥 Bonfire", "☕ Breakfast"],
        "description": "Wake up to breathtaking panoramic views of the Kullu valley. A traditional Himachali homestay nestled in the mountains.",
        "category": "Mountain"
    },
    {
        "id": 2,
        "name": "Forest Retreat",
        "location": "Coorg, Karnataka",
        "price": 2800,
        "rating": 4.8,
        "reviews": 96,
        "tag": "🌿 Eco Pick",
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=75",
        "amenities": ["🌲 Forest Trails", "🦋 Wildlife", "🌧️ Rainforest"],
        "description": "Immerse yourself in the lush coffee estates of Coorg. Hear the rain on the canopy and spot exotic birds at dawn.",
        "category": "Forest"
    },
    {
        "id": 3,
        "name": "Riverside Cottage",
        "location": "Rishikesh, Uttarakhand",
        "price": 2400,
        "rating": 4.7,
        "reviews": 74,
        "tag": "💧 Waterfront",
        "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=75",
        "amenities": ["🏄 Rafting", "🧘 Yoga", "🌊 River View"],
        "description": "A serene cottage perched right on the banks of the Ganges. Perfect for yoga retreats and adventure seekers alike.",
        "category": "Riverside"
    },
    {
        "id": 4,
        "name": "Hilltop Eco Lodge",
        "location": "Munnar, Kerala",
        "price": 3600,
        "rating": 4.9,
        "reviews": 112,
        "tag": "♻️ Zero Waste",
        "image": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&auto=format&fit=crop&q=75",
        "amenities": ["☕ Tea Gardens", "🌄 Sunrise", "🌿 Organic Farm"],
        "description": "A solar-powered eco lodge in the heart of Kerala's tea country. Farm-to-table meals and misty morning walks.",
        "category": "Hilltop"
    },
    {
        "id": 5,
        "name": "Pine Valley Stay",
        "location": "Kasol, Himachal Pradesh",
        "price": 1900,
        "rating": 4.6,
        "reviews": 58,
        "tag": None,
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=75",
        "amenities": ["🌲 Pine Forest", "🎒 Trekking", "⛺ Camping"],
        "description": "Tucked away in a dense pine valley near the Parvati River. A budget-friendly gem for backpackers.",
        "category": "Mountain"
    },
    {
        "id": 6,
        "name": "Green Escape Resort",
        "location": "Wayanad, Kerala",
        "price": 4200,
        "rating": 4.9,
        "reviews": 145,
        "tag": "🌟 Premium",
        "image": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop&q=75",
        "amenities": ["🏊 Pool", "🌿 Spa", "🦚 Wildlife"],
        "description": "A premium eco resort nestled in Wayanad's wildlife sanctuary. Elephant sightings, ayurvedic spa, and infinity pool.",
        "category": "Forest"
    },
    {
        "id": 7,
        "name": "Desert Oasis Camp",
        "location": "Jaisalmer, Rajasthan",
        "price": 5500,
        "rating": 4.8,
        "reviews": 89,
        "tag": "🏜️ Unique",
        "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&auto=format&fit=crop&q=75",
        "amenities": ["🐪 Camel Safari", "🌌 Stargazing", "🎵 Folk Music"],
        "description": "Luxury desert camping in the golden Thar Desert. Camel safaris by day, stargazing by night with folk performances.",
        "category": "Desert"
    },
    {
        "id": 8,
        "name": "Backwater Houseboat",
        "location": "Alleppey, Kerala",
        "price": 6800,
        "rating": 4.9,
        "reviews": 201,
        "tag": "⛵ Exclusive",
        "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=75",
        "amenities": ["⛵ Houseboat", "🦆 Backwaters", "🍛 Kerala Cuisine"],
        "description": "Drift through Kerala's legendary backwaters on a traditional kettuvallam houseboat. Chef-prepared Kerala meals included.",
        "category": "Waterfront"
    }
]

def get_all_listings():
    return listings_db

def get_listing(listing_id: int):
    return next((item for item in listings_db if item["id"] == listing_id), None)

def create_listing(listing_data: dict):
    new_id = 1 if not listings_db else max(item["id"] for item in listings_db) + 1
    new_listing = {"id": new_id, **listing_data}
    listings_db.append(new_listing)
    return new_listing

def update_listing(listing_id: int, listing_data: dict):
    listing = get_listing(listing_id)
    if listing:
        for key, value in listing_data.items():
            if value is not None:
                listing[key] = value
        return listing
    return None

def delete_listing(listing_id: int):
    global listings_db
    listing = get_listing(listing_id)
    if listing:
        listings_db = [item for item in listings_db if item["id"] != listing_id]
        return True
    return False

def search_listings(query: str):
    query = query.lower()
    return [
        item for item in listings_db
        if query in item["name"].lower() or query in item["location"].lower()
    ]
