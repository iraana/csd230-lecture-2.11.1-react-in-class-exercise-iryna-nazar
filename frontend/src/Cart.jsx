import { useState, useEffect } from 'react';
import api from './api/axiosConfig';

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart');
            setCart(res.data);
        } catch (err) {
            console.error("Failed to fetch cart", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/cart/remove/${productId}`);
            fetchCart(); // Refresh list
        } catch (err) {
            alert("Failed to remove item.");
        }
    };

    if (loading) return <h2 style={{ textAlign: 'center' }}>Loading Cart...</h2>;

    const items = cart?.products || [];
    const total = items.reduce((acc, item) => acc + (item.price || 0), 0);

    return (
        <div style={{ textAlign: 'left' }}>
            <h1>🛒 Shopping Cart</h1>
            {items.length === 0 ? (
                <div className="admin-card">
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <>
                    {items.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: 0 }}>{item.title || item.brand}</h3>
                                <p style={{ margin: 0, opacity: 0.7 }}>Price: ${item.price?.toFixed(2)}</p>
                            </div>
                            <button
                                style={{ background: '#ef4444', color: 'white' }}
                                onClick={() => handleRemove(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="admin-card" style={{ borderTop: '4px solid #6366f1', textAlign: 'right' }}>
                        <h2 style={{ margin: 0 }}>Total: ${total.toFixed(2)}</h2>
                        <button style={{ background: '#6366f1', color: 'white', marginTop: '20px', padding: '12px 24px' }}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;