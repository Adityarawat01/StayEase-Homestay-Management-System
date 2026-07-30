import logging
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from models.database_models import Booking as DBBooking

logger = logging.getLogger("stayease.crud.bookings")

def get_user_bookings(db: Session, user_id: int):
    return db.query(DBBooking).filter(DBBooking.user_id == user_id).all()

def get_listing_bookings(db: Session, listing_id: int):
    return db.query(DBBooking).filter(DBBooking.listing_id == listing_id).all()

def get_booking(db: Session, booking_id: int):
    return db.query(DBBooking).filter(DBBooking.id == booking_id).first()

def create_booking(db: Session, booking_data: dict, user_id: int):
    try:
        new_booking = DBBooking(**booking_data, user_id=user_id)
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
        return new_booking
    except SQLAlchemyError as e:
        db.rollback()
        logger.error("Failed to create booking: %s", str(e))
        raise e

def delete_booking(db: Session, booking_id: int):
    try:
        db_booking = get_booking(db, booking_id)
        if not db_booking:
            return False
            
        db.delete(db_booking)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        logger.error("Failed to delete booking %s: %s", booking_id, str(e))
        raise e
