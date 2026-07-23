from database import engine
from sqlalchemy import text
from models import database_models

# Create any new tables (like bookings)
database_models.Base.metadata.create_all(bind=engine)

with engine.connect() as conn:
    conn.execute(text("ALTER TABLE listings ADD COLUMN IF NOT EXISTS owner_id INTEGER;"))
    # Also we should add a foreign key constraint, but not strictly necessary for simple cases if it's Supabase.
    conn.commit()
    print("Database schema updated successfully!")
    print("Added owner_id column to listings table")
