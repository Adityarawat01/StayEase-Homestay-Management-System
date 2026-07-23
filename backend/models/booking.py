from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class BookingBase(BaseModel):
    listing_id: int
    check_in: datetime
    check_out: datetime
    total_price: int

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    total_price: Optional[int] = None

class BookingResponse(BookingBase):
    id: int
    user_id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
