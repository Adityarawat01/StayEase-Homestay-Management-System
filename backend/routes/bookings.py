from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from models.booking import BookingCreate, BookingResponse
from crud.bookings import get_user_bookings, create_booking, delete_booking, get_booking
from utils.auth import get_current_user
from models.database_models import User
from utils.responses import not_found_exception

router = APIRouter(
    prefix="/api/bookings",
    tags=["bookings"],
)

@router.get("", response_model=List[BookingResponse], status_code=status.HTTP_200_OK)
def read_user_bookings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_user_bookings(db, current_user.id)

@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def add_booking(booking: BookingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_booking(db, booking.model_dump(), current_user.id)

@router.delete("/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_booking(booking_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    booking = get_booking(db, booking_id)
    if not booking:
        raise not_found_exception("Booking")
    if booking.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this booking")
    
    success = delete_booking(db, booking_id)
    if not success:
        raise not_found_exception("Booking")
    return
