from pydantic import BaseModel, Field
from typing import List, Optional

class ListingBase(BaseModel):
    name: str
    location: str
    price: int
    rating: float = 0.0
    reviews: int = 0
    tag: Optional[str] = None
    image: str
    amenities: List[str]
    description: str
    category: str

class ListingCreate(ListingBase):
    pass

class ListingUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    price: Optional[int] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    tag: Optional[str] = None
    image: Optional[str] = None
    amenities: Optional[List[str]] = None
    description: Optional[str] = None
    category: Optional[str] = None

class Listing(ListingBase):
    id: int

    class Config:
        from_attributes = True
