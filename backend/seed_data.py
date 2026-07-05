from database import SessionLocal, engine
import models.database_models as database_models
from sqlalchemy.orm import Session

# Create tables
database_models.Base.metadata.create_all(bind=engine)

listings_data = [
    {
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

def seed_db():
    db: Session = SessionLocal()
    try:
        # Check if listings already exist
        if db.query(database_models.Listing).count() == 0:
            print("Seeding database with initial listings...")
            for data in listings_data:
                listing = database_models.Listing(**data)
                db.add(listing)
            db.commit()
            print("Database seeded successfully!")
        else:
            print("Database already contains listings. Skipping seed.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
