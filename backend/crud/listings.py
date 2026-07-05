from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from models.database_models import Listing as DBListing

def get_all_listings(db: Session):
    return db.query(DBListing).all()

def get_listing(db: Session, listing_id: int):
    return db.query(DBListing).filter(DBListing.id == listing_id).first()

def create_listing(db: Session, listing_data: dict):
    try:
        new_listing = DBListing(**listing_data)
        db.add(new_listing)
        db.commit()
        db.refresh(new_listing)
        return new_listing
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def update_listing(db: Session, listing_id: int, listing_data: dict):
    try:
        db_listing = get_listing(db, listing_id)
        if not db_listing:
            return None
        
        for key, value in listing_data.items():
            setattr(db_listing, key, value)
            
        db.commit()
        db.refresh(db_listing)
        return db_listing
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def delete_listing(db: Session, listing_id: int):
    try:
        db_listing = get_listing(db, listing_id)
        if not db_listing:
            return False
            
        db.delete(db_listing)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def search_listings(db: Session, query: str):
    search = f"%{query}%"
    return db.query(DBListing).filter(
        DBListing.name.ilike(search) | DBListing.location.ilike(search)
    ).all()
