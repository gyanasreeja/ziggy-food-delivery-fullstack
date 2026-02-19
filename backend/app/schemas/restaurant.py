from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class RestaurantBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    description: Optional[str] = None
    cuisine_type: List[str]
    address: str
    phone: Optional[str] = None
    image_url: Optional[str] = None

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    cuisine_type: Optional[List[str]] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    is_active: Optional[bool] = None
    image_url: Optional[str] = None

class RestaurantResponse(RestaurantBase):
    id: UUID
    owner_id: UUID
    rating: float
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class MenuItemBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    category: Optional[str] = None
    is_vegetarian: bool = False
    is_available: bool = True
    image_url: Optional[str] = None

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    is_vegetarian: Optional[bool] = None
    is_available: Optional[bool] = None
    image_url: Optional[str] = None

class MenuItemResponse(MenuItemBase):
    id: UUID
    restaurant_id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True
        
        
        