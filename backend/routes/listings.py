from fastapi import APIRouter, status
from typing import List, Optional
from models.listing import Listing, ListingCreate, ListingUpdate
from data.listings import get_all_listings, get_listing, create_listing, update_listing, delete_listing, search_listings
from utils.responses import not_found_exception

router = APIRouter(
    prefix="/api/listings",
    tags=["listings"],
)

@router.get("/search", response_model=List[Listing], status_code=status.HTTP_200_OK)
def search_listings_route(q: Optional[str] = ""):
    return search_listings(q)

@router.get("", response_model=List[Listing], status_code=status.HTTP_200_OK)
def read_listings():
    return get_all_listings()

@router.get("/{listing_id}", response_model=Listing, status_code=status.HTTP_200_OK)
def read_listing(listing_id: int):
    listing = get_listing(listing_id)
    if not listing:
        raise not_found_exception("Listing")
    return listing

@router.post("", response_model=Listing, status_code=status.HTTP_201_CREATED)
def add_listing(listing: ListingCreate):
    return create_listing(listing.model_dump())

@router.put("/{listing_id}", response_model=Listing, status_code=status.HTTP_200_OK)
def modify_listing(listing_id: int, listing: ListingUpdate):
    updated = update_listing(listing_id, listing.model_dump(exclude_unset=True))
    if not updated:
        raise not_found_exception("Listing")
    return updated

@router.delete("/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_listing(listing_id: int):
    success = delete_listing(listing_id)
    if not success:
        raise not_found_exception("Listing")
    return
