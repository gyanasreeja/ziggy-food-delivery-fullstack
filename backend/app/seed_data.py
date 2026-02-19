from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models.user import User, UserRole
from app.models.restaurant import Restaurant
from app.models.menu_item import MenuItem
from app.core.security import get_password_hash
import uuid

def create_admin_user(db: Session):
    """Create admin user for monitoring"""
    admin = db.query(User).filter(User.email == "admin@ziggy.com").first()
    if not admin:
        admin = User(
            email="admin@ziggy.com",
            password_hash=get_password_hash("Admin@123"),
            full_name="Ziggy Admin",
            phone="9000000001",
            role=UserRole.ADMIN,
            is_verified=True
        )
        db.add(admin)
        db.commit()
        print("✅ Admin user created: admin@ziggy.com / Admin@123")
    return admin

def create_restaurant_owner(db: Session):
    """Create restaurant owner"""
    owner = db.query(User).filter(User.email == "owner@ziggy.com").first()
    if not owner:
        owner = User(
            email="owner@ziggy.com",
            password_hash=get_password_hash("Owner@123"),
            full_name="Restaurant Owner",
            phone="9000000002",
            role=UserRole.RESTAURANT_OWNER,
            is_verified=True
        )
        db.add(owner)
        db.commit()
        print("✅ Restaurant owner created: owner@ziggy.com / Owner@123")
    return owner

def seed_restaurants(db: Session, owner_id: str):
    """Create sample restaurants"""
    
    restaurants_data = [
        {
            "name": "Pizza Paradise",
            "description": "Authentic Italian pizzas with fresh ingredients",
            "cuisine_type": ["Italian", "Pizza"],
            "address": "123 Main Street, Downtown",
            "phone": "555-0101",
            "rating": 4.5,
            "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"
        },
        {
            "name": "Burger Kingdom",
            "description": "Gourmet burgers and classic American favorites",
            "cuisine_type": ["American", "Burgers"],
            "address": "456 Oak Avenue, Food District",
            "phone": "555-0102",
            "rating": 4.3,
            "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
        },
        {
            "name": "Sushi Master",
            "description": "Fresh sushi and Japanese delicacies",
            "cuisine_type": ["Japanese", "Sushi"],
            "address": "789 Pine Road, Asian Quarter",
            "phone": "555-0103",
            "rating": 4.8,
            "image_url": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400"
        },
        {
            "name": "Taco Fiesta",
            "description": "Authentic Mexican street food",
            "cuisine_type": ["Mexican", "Tacos"],
            "address": "321 Elm Street, West Side",
            "phone": "555-0104",
            "rating": 4.4,
            "image_url": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400"
        },
        {
            "name": "Pasta House",
            "description": "Traditional Italian pasta and wine",
            "cuisine_type": ["Italian", "Pasta"],
            "address": "654 Maple Drive, Little Italy",
            "phone": "555-0105",
            "rating": 4.6,
            "image_url": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400"
        },
        {
            "name": "French Bistro",
            "description": "Elegant French cuisine and desserts",
            "cuisine_type": ["French", "Desserts"],
            "address": "987 Cedar Lane, Uptown",
            "phone": "555-0106",
            "rating": 4.7,
            "image_url": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
        }
    ]
    
    created_restaurants = []
    for rest_data in restaurants_data:
        # Check if restaurant exists
        existing = db.query(Restaurant).filter(Restaurant.name == rest_data["name"]).first()
        if not existing:
            restaurant = Restaurant(
                owner_id=owner_id,
                **rest_data
            )
            db.add(restaurant)
            db.commit()
            db.refresh(restaurant)
            created_restaurants.append(restaurant)
            print(f"✅ Created restaurant: {restaurant.name}")
        else:
            created_restaurants.append(existing)
    
    return created_restaurants

def seed_menu_items(db: Session, restaurants: list):
    """Create menu items for each restaurant"""
    
    # Pizza Paradise Menu
    pizza_items = [
        {"name": "Margherita Pizza", "description": "Classic tomato, mozzarella, basil", "price": 12.99, "category": "Italian", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300"},
        {"name": "Pepperoni Pizza", "description": "Spicy pepperoni with cheese", "price": 14.99, "category": "Italian", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300"},
        {"name": "Veggie Supreme", "description": "Bell peppers, onions, mushrooms, olives", "price": 13.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=300"},
        {"name": "Meat Lovers", "description": "Pepperoni, sausage, bacon, ham", "price": 16.99, "category": "Non-Veg", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300"},
    ]
    
    # Burger Kingdom Menu
    burger_items = [
        {"name": "Classic Cheeseburger", "description": "Beef patty, cheese, lettuce, tomato", "price": 9.99, "category": "American", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"},
        {"name": "Veggie Burger", "description": "Plant-based patty with fresh veggies", "price": 8.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300"},
        {"name": "Bacon BBQ Burger", "description": "Double beef, bacon, BBQ sauce", "price": 12.99, "category": "American", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300"},
        {"name": "French Fries", "description": "Crispy golden fries", "price": 3.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300"},
    ]
    
    # Sushi Master Menu
    sushi_items = [
        {"name": "California Roll", "description": "Crab, avocado, cucumber", "price": 8.99, "category": "Japanese", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300"},
        {"name": "Vegetable Roll", "description": "Cucumber, avocado, carrot", "price": 6.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1617196035183-421e42f2eab7?w=300"},
        {"name": "Salmon Nigiri", "description": "Fresh salmon over rice", "price": 10.99, "category": "Non-Veg", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=300"},
        {"name": "Tuna Sashimi", "description": "Premium tuna slices", "price": 14.99, "category": "Non-Veg", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=300"},
    ]
    
    # Taco Fiesta Menu
    taco_items = [
        {"name": "Beef Tacos", "description": "Seasoned beef, salsa, cheese", "price": 7.99, "category": "Mexican", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300"},
        {"name": "Veggie Tacos", "description": "Black beans, corn, peppers", "price": 6.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300"},
        {"name": "Chicken Quesadilla", "description": "Grilled chicken, cheese, tortilla", "price": 9.99, "category": "Mexican", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300"},
        {"name": "Guacamole & Chips", "description": "Fresh guacamole with tortilla chips", "price": 5.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1621843201550-0a54f66e945b?w=300"},
    ]
    
    # Pasta House Menu
    pasta_items = [
        {"name": "Spaghetti Carbonara", "description": "Creamy pasta with bacon", "price": 13.99, "category": "Italian", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300"},
        {"name": "Vegetable Lasagna", "description": "Layered pasta with veggies", "price": 11.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300"},
        {"name": "Penne Arrabbiata", "description": "Spicy tomato sauce pasta", "price": 10.99, "category": "Italian", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300"},
        {"name": "Seafood Linguine", "description": "Shrimp and mussels in white wine", "price": 16.99, "category": "Non-Veg", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300"},
    ]
    
    # French Bistro Menu
    french_items = [
        {"name": "Croissant", "description": "Buttery French pastry", "price": 3.99, "category": "Desserts", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300"},
        {"name": "Crème Brûlée", "description": "Classic French custard", "price": 7.99, "category": "Desserts", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300"},
        {"name": "Coq au Vin", "description": "Chicken braised in wine", "price": 18.99, "category": "French", "is_vegetarian": False, "image_url": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300"},
        {"name": "Ratatouille", "description": "Provençal vegetable stew", "price": 12.99, "category": "Veg", "is_vegetarian": True, "image_url": "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=300"},
    ]
    
    menu_data = [
        (restaurants[0], pizza_items),
        (restaurants[1], burger_items),
        (restaurants[2], sushi_items),
        (restaurants[3], taco_items),
        (restaurants[4], pasta_items),
        (restaurants[5], french_items),
    ]
    
    for restaurant, items in menu_data:
        for item_data in items:
            # Check if item exists
            existing = db.query(MenuItem).filter(
                MenuItem.restaurant_id == restaurant.id,
                MenuItem.name == item_data["name"]
            ).first()
            
            if not existing:
                menu_item = MenuItem(
                    restaurant_id=restaurant.id,
                    **item_data
                )
                db.add(menu_item)
        
        db.commit()
        print(f"✅ Added menu items for: {restaurant.name}")

def seed_all():
    """Run all seed functions"""
    db = SessionLocal()
    try:
        print("🌱 Starting database seeding...")
        
        admin = create_admin_user(db)
        owner = create_restaurant_owner(db)
        restaurants = seed_restaurants(db, str(owner.id))
        seed_menu_items(db, restaurants)
        
        print("\n✅ Database seeding completed!")
        print("\n📋 Login Credentials:")
        print("Admin: admin@ziggy.com / Admin@123")
        print("Owner: owner@ziggy.com / Owner@123")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_all()
    
    