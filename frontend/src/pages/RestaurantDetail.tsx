import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import restaurantService, { Restaurant, MenuItem } from '../services/restaurantService';
import { useCartStore } from '../store/cartStore';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  
  const { addItem, getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  useEffect(() => {
    if (id) {
      loadRestaurantData();
    }
  }, [id]);

  const loadRestaurantData = async () => {
    try {
      const [restaurantData, menuData] = await Promise.all([
        restaurantService.getRestaurant(id!),
        restaurantService.getMenu(id!)
      ]);
      
      setRestaurant(restaurantData);
      setMenuItems(menuData);
    } catch (error) {
      console.error('Failed to load restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    if (restaurant) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        restaurant_id: restaurant.id,
        restaurant_name: restaurant.name
      });
      
      // Show feedback
      alert(`${item.name} added to cart!`);
    }
  };

  const categories = ['All', 'Veg', 'Non-Veg', ...Array.from(new Set(menuItems.map(item => item.category)))];
  
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : selectedCategory === 'Veg'
    ? menuItems.filter(item => item.is_vegetarian)
    : selectedCategory === 'Non-Veg'
    ? menuItems.filter(item => !item.is_vegetarian)
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}>Loading...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div style={styles.errorContainer}>
        <h2>Restaurant not found</h2>
        <button onClick={() => navigate('/home')} style={styles.backBtn}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/home')} style={styles.backButton}>
            ← Back
          </button>
          <h1 style={styles.logo} onClick={() => navigate('/home')}>
            🍔 Ziggy
          </h1>
          <div style={styles.cartIcon} onClick={() => navigate('/cart')}>
            🛒
            {cartCount > 0 && (
              <span style={styles.cartBadge}>{cartCount}</span>
            )}
          </div>
        </div>
      </header>

      {/* Restaurant Banner */}
      <div style={styles.banner}>
        {restaurant.image_url && (
          <img 
            src={restaurant.image_url} 
            alt={restaurant.name}
            style={styles.bannerImage}
          />
        )}
        <div style={styles.overlay}>
          <div style={styles.restaurantInfo}>
            <h1 style={styles.restaurantName}>{restaurant.name}</h1>
            <p style={styles.description}>{restaurant.description}</p>
            <div style={styles.meta}>
              <span style={styles.rating}>⭐ {restaurant.rating}</span>
              <span style={styles.cuisine}>{restaurant.cuisine_type.join(' • ')}</span>
              <span style={styles.delivery}>🚚 30-40 min</span>
            </div>
            <p style={styles.address}>📍 {restaurant.address}</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.categoryContainer}>
        <div style={styles.categories}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.categoryBtn,
                ...(selectedCategory === category ? styles.categoryBtnActive : {})
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'Our Menu' : selectedCategory}
          <span style={styles.itemCount}> ({filteredItems.length} items)</span>
        </h2>
        
        <div style={styles.menuGrid}>
          {filteredItems.map(item => (
            <div key={item.id} style={styles.menuCard}>
              <div style={styles.menuImageContainer}>
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    style={styles.menuImage}
                  />
                ) : (
                  <div style={styles.noImage}>🍽️</div>
                )}
                {item.is_vegetarian && (
                  <span style={styles.vegBadge}>🟢 VEG</span>
                )}
                {!item.is_vegetarian && (
                  <span style={styles.nonVegBadge}>🔴 NON-VEG</span>
                )}
              </div>
              
              <div style={styles.menuInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemDescription}>{item.description}</p>
                
                <div style={styles.itemMeta}>
                  <span style={styles.price}>${item.price.toFixed(2)}</span>
                  <span style={styles.category}>{item.category}</span>
                </div>
                
                <button
                  onClick={() => handleAddToCart(item)}
                  style={styles.addBtn}
                  disabled={!item.is_available}
                >
                  {item.is_available ? '+ Add to Cart' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={styles.emptyState}>
            <p>No items found in this category</p>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    fontSize: '18px',
    color: '#667eea',
    fontWeight: 600,
  },
  errorContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  backBtn: {
    padding: '10px 24px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    cursor: 'pointer',
  },
  cartIcon: {
    position: 'relative' as const,
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
  },
  cartBadge: {
    position: 'absolute' as const,
    top: '0',
    right: '0',
    backgroundColor: '#f44336',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 700,
  },
  banner: {
    height: '300px',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)',
    display: 'flex',
    alignItems: 'flex-end',
  },
  restaurantInfo: {
    padding: '32px',
    color: 'white',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  restaurantName: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '16px',
    opacity: 0.9,
  },
  meta: {
    display: 'flex',
    gap: '24px',
    marginBottom: '12px',
    flexWrap: 'wrap' as const,
  },
  rating: {
    fontSize: '16px',
    fontWeight: 600,
  },
  cuisine: {
    fontSize: '16px',
  },
  delivery: {
    fontSize: '16px',
    color: '#4caf50',
    fontWeight: 600,
  },
  address: {
    fontSize: '14px',
    opacity: 0.8,
  },
  categoryContainer: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e0e0e0',
    position: 'sticky' as const,
    top: '60px',
    zIndex: 50,
  },
  categories: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    gap: '12px',
    overflowX: 'auto' as const,
  },
  categoryBtn: {
    padding: '8px 20px',
    border: '2px solid #e0e0e0',
    borderRadius: '20px',
    backgroundColor: 'white',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.3s',
  },
  categoryBtnActive: {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '24px',
    color: '#1a1a1a',
  },
  itemCount: {
    fontSize: '18px',
    fontWeight: 400,
    color: '#666',
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
  },
  menuImageContainer: {
    height: '200px',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  menuImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  noImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '64px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  vegBadge: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    backgroundColor: 'white',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#4caf50',
  },
  nonVegBadge: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    backgroundColor: 'white',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#f44336',
  },
  menuInfo: {
    padding: '20px',
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#1a1a1a',
  },
  itemDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '12px',
    height: '40px',
    overflow: 'hidden',
    display: '-webkit-box' as any,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as any,
  },
  itemMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#667eea',
  },
  category: {
    fontSize: '12px',
    color: '#999',
    backgroundColor: '#f5f5f5',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  addBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    color: '#666',
  },
};

export default RestaurantDetail;


