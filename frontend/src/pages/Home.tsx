import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import restaurantService, { Restaurant } from '../services/restaurantService';
import { useCartStore } from '../store/cartStore';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  useEffect(() => {
    loadRestaurants();
    loadUserData();
  }, []);

  useEffect(() => {
    // Filter restaurants based on search
    if (searchQuery.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine_type.some(cuisine => 
          cuisine.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery, restaurants]);

  const loadUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      console.log('User loaded:', userData);
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
      setUser({ full_name: 'Guest' });
    } finally {
      setLoading(false);
    }
  };

  const loadRestaurants = async () => {
    try {
      const data = await restaurantService.getAllRestaurants();
      console.log('Restaurants loaded:', data.length);
      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
      setRestaurants([]);
      setFilteredRestaurants([]);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    authService.logout();
    navigate('/login');
  };

  const handleRestaurantClick = (restaurantId: string) => {
    console.log('Restaurant clicked:', restaurantId);
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo} onClick={() => navigate('/home')}>
            🍔 Ziggy
          </h1>
          
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>

          <div style={styles.userSection}>
            {/* Cart Icon */}
            <div style={styles.cartIcon} onClick={handleCartClick}>
              🛒
              {cartCount > 0 && (
                <span style={styles.cartBadge}>{cartCount}</span>
              )}
            </div>
            
            <span style={styles.userName}>
              👤 {user?.full_name || 'Guest'}
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.content}>
          <div style={styles.pageHeader}>
            <h2 style={styles.pageTitle}>
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Restaurants Near You'}
            </h2>
            <p style={styles.pageSubtitle}>
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} available
            </p>
          </div>
          
          {/* Restaurant Grid */}
          {filteredRestaurants.length > 0 ? (
            <div style={styles.restaurantGrid}>
              {filteredRestaurants.map((restaurant) => (
                <div 
                  key={restaurant.id} 
                  style={styles.restaurantCard}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                >
                  <div style={styles.restaurantImage}>
                    {restaurant.image_url ? (
                      <img 
                        src={restaurant.image_url} 
                        alt={restaurant.name}
                        style={styles.image}
                      />
                    ) : (
                      <div style={styles.imagePlaceholder}>🍽️</div>
                    )}
                  </div>
                  <div style={styles.restaurantInfo}>
                    <h3 style={styles.restaurantName}>{restaurant.name}</h3>
                    <p style={styles.description}>{restaurant.description}</p>
                    <p style={styles.cuisine}>
                      {restaurant.cuisine_type.join(' • ')}
                    </p>
                    <div style={styles.restaurantMeta}>
                      <span style={styles.rating}>⭐ {restaurant.rating}</span>
                      <span style={styles.delivery}>🚚 30-40 min</span>
                    </div>
                    <p style={styles.address}>📍 {restaurant.address}</p>
                    <button 
                      style={styles.orderBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestaurantClick(restaurant.id);
                      }}
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>😔</div>
              <h3 style={styles.emptyTitle}>No restaurants found</h3>
              <p style={styles.emptyText}>
                {searchQuery 
                  ? `No restaurants match "${searchQuery}". Try a different search term.`
                  : 'No restaurants available at the moment. Please check back later.'}
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={styles.clearBtn}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const styles = {
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  loader: {
    fontSize: '18px',
    color: '#667eea',
    fontWeight: 600,
  },
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
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
    gap: '20px',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    cursor: 'pointer',
    flexShrink: 0,
  },
  searchContainer: {
    position: 'relative' as const,
    flex: 1,
    maxWidth: '500px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px 10px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '24px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  searchIcon: {
    position: 'absolute' as const,
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0,
  },
  cartIcon: {
    position: 'relative' as const,
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    transition: 'transform 0.3s',
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
  userName: {
    fontSize: '14px',
    color: '#666',
    fontWeight: 500,
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  content: {
    width: '100%',
  },
  pageHeader: {
    marginBottom: '32px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  pageSubtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  restaurantGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  restaurantImage: {
    height: '200px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden' as const,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  imagePlaceholder: {
    fontSize: '72px',
  },
  restaurantInfo: {
    padding: '20px',
  },
  restaurantName: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '8px',
    margin: 0,
  },
  description: {
    fontSize: '13px',
    color: '#999',
    margin: '8px 0',
    height: '36px',
    overflow: 'hidden' as const,
    display: '-webkit-box' as any,
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as any,
  },
  cuisine: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '12px',
    margin: '8px 0 12px 0',
  },
  restaurantMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  rating: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ff9800',
  },
  delivery: {
    fontSize: '14px',
    color: '#4caf50',
    fontWeight: 500,
  },
  address: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '16px',
  },
  orderBtn: {
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
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '16px',
    color: '#666',
    maxWidth: '400px',
    margin: '0 auto 24px',
  },
  clearBtn: {
    padding: '10px 24px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default Home;
