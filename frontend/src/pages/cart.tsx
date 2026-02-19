import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryFee = totalPrice > 0 ? 5.00 : 0;
  const tax = totalPrice * 0.08; // 8% tax
  const grandTotal = totalPrice + deliveryFee + tax;

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/home')} style={styles.backButton}>
            ← Back
          </button>
          <h1 style={styles.logo}>🍔 Ziggy</h1>
          <div style={styles.cartIcon}>
            🛒
            {totalItems > 0 && (
              <span style={styles.cartBadge}>{totalItems}</span>
            )}
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.pageTitle}>Your Cart</h1>

        {items.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={styles.emptyIcon}>🛒</div>
            <h2 style={styles.emptyTitle}>Your cart is empty</h2>
            <p style={styles.emptyText}>Add some delicious items to get started!</p>
            <button onClick={() => navigate('/home')} style={styles.shopBtn}>
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div style={styles.cartContent}>
            {/* Cart Items */}
            <div style={styles.itemsSection}>
              <div style={styles.itemsHeader}>
                <h2 style={styles.sectionTitle}>Items ({totalItems})</h2>
                <button onClick={clearCart} style={styles.clearBtn}>
                  Clear Cart
                </button>
              </div>

              {items.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <img 
                    src={item.image_url || 'https://via.placeholder.com/100'} 
                    alt={item.name}
                    style={styles.itemImage}
                  />
                  
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.restaurantName}>
                      📍 {item.restaurant_name}
                    </p>
                    <p style={styles.itemPrice}>${item.price.toFixed(2)} each</p>
                  </div>

                  <div style={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={styles.quantityBtn}
                    >
                      −
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={styles.quantityBtn}
                    >
                      +
                    </button>
                  </div>

                  <div style={styles.itemTotal}>
                    <p style={styles.totalPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={styles.removeBtn}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={styles.summarySection}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>
              
              <div style={styles.summaryRow}>
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div style={styles.divider}></div>
              
              <div style={styles.summaryTotal}>
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} style={styles.checkoutBtn}>
                Proceed to Checkout
              </button>

              <p style={styles.note}>
                💡 Free delivery on orders above $50
              </p>
            </div>
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
  },
  cartIcon: {
    position: 'relative' as const,
    fontSize: '24px',
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
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '32px',
    color: '#1a1a1a',
  },
  emptyCart: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '12px',
    color: '#1a1a1a',
  },
  emptyText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '24px',
  },
  shopBtn: {
    padding: '12px 32px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  cartContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '24px',
  },
  itemsSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
  },
  itemsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  clearBtn: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  cartItem: {
    display: 'flex',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
    color: '#1a1a1a',
  },
  restaurantName: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px',
  },
  itemPrice: {
    fontSize: '14px',
    color: '#999',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  quantityBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #667eea',
    backgroundColor: 'white',
    color: '#667eea',
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: '16px',
    fontWeight: 600,
    minWidth: '30px',
    textAlign: 'center' as const,
  },
  itemTotal: {
    textAlign: 'right' as const,
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#667eea',
    marginBottom: '8px',
  },
  removeBtn: {
    padding: '6px 12px',
    backgroundColor: '#fee',
    color: '#c33',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  summarySection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    height: 'fit-content',
    position: 'sticky' as const,
    top: '100px',
  },
  summaryTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#1a1a1a',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#666',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '16px 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '20px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '24px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '16px',
  },
  note: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center' as const,
    margin: 0,
  },
};

export default Cart;
