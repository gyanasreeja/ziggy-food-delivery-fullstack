from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.restaurant import Restaurant
from app.models.menu_item import MenuItem
from app.models.user import User
from app.schemas.restaurant import (
    RestaurantCreate, RestaurantUpdate, RestaurantResponse,
    MenuItemCreate, MenuItemUpdate, MenuItemResponse
)
from app.api.deps import get_current_user

router = APIRouter(prefix="/restaurants", tags=["Restaurants"])

# Get all restaurants
@router.get("", response_model=List[RestaurantResponse])
def list_restaurants(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """List all active restaurants"""
    restaurants = db.query(Restaurant).filter(
        Restaurant.is_active == True
    ).offset(skip).limit(limit).all()
    return restaurants

# Get single restaurant
@router.get("/{restaurant_id}", response_model=RestaurantResponse)
def get_restaurant(restaurant_id: str, db: Session = Depends(get_db)):
    """Get restaurant by ID"""
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    return restaurant

# Create restaurant (requires authentication)
@router.post("", response_model=RestaurantResponse, status_code=status.HTTP_201_CREATED)
def create_restaurant(
    restaurant_data: RestaurantCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new restaurant"""
    new_restaurant = Restaurant(
        **restaurant_data.dict(),
        owner_id=current_user.id
    )
    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)
    return new_restaurant

# Get restaurant menu
@router.get("/{restaurant_id}/menu", response_model=List[MenuItemResponse])
def get_menu(
    restaurant_id: str,
    category: Optional[str] = None,
    available_only: bool = True,
    db: Session = Depends(get_db)
):
    """Get restaurant menu"""
    query = db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant_id)
    
    if available_only:
        query = query.filter(MenuItem.is_available == True)
    
    if category:
        query = query.filter(MenuItem.category == category)
    
    menu_items = query.all()
    return menu_items

# Add menu item (requires authentication)
@router.post("/{restaurant_id}/menu", response_model=MenuItemResponse, status_code=status.HTTP_201_CREATED)
def add_menu_item(
    restaurant_id: str,
    item_data: MenuItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add menu item to restaurant"""
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    # Check if user owns this restaurant
    if restaurant.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to add items to this restaurant"
        )
    
    new_item = MenuItem(**item_data.dict(), restaurant_id=restaurant_id)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item
