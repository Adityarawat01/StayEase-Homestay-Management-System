from fastapi import APIRouter, status, Depends
from typing import List, Optional
from models.listing import Listing, ListingCreate, ListingUpdate
from crud.listings import get_all_listings, get_listing, create_listing, update_listing, delete_listing, search_listings
from utils.responses import not_found_exception
from sqlalchemy.orm import Session
from database import get_db
from utils.auth import get_current_user
from models.database_models import User

router = APIRouter(
    prefix="/api/listings",
    tags=["listings"],
)

@router.get("/search", response_model=List[Listing], status_code=status.HTTP_200_OK)
def search_listings_route(q: Optional[str] = "", db: Session = Depends(get_db)):
    return search_listings(db, q)

@router.get("", response_model=List[Listing], status_code=status.HTTP_200_OK)
def read_listings(db: Session = Depends(get_db)):
    return get_all_listings(db)

@router.get("/me", response_model=List[Listing], status_code=status.HTTP_200_OK)
def read_user_listings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    from models.database_models import Listing as DBListing
    return db.query(DBListing).filter(DBListing.owner_id == current_user.id).all()

@router.get("/{listing_id}", response_model=Listing, status_code=status.HTTP_200_OK)
def read_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = get_listing(db, listing_id)
    if not listing:
        raise not_found_exception("Listing")
    return listing

@router.post("", response_model=Listing, status_code=status.HTTP_201_CREATED)
def add_listing(listing: ListingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    listing_data = listing.model_dump()
    listing_data["owner_id"] = current_user.id
    return create_listing(db, listing_data)

@router.put("/{listing_id}", response_model=Listing, status_code=status.HTTP_200_OK)
def modify_listing(listing_id: int, listing: ListingUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated = update_listing(db, listing_id, listing.model_dump(exclude_unset=True))
    if not updated:
        raise not_found_exception("Listing")
    return updated

@router.delete("/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_listing(listing_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    success = delete_listing(db, listing_id)
    if not success:
        raise not_found_exception("Listing")
    return
