import { Link } from 'react-router';
import { useAuth } from './provider/authProvider';
import { useState, useEffect, useCallback } from 'react';
import api from './api/axiosConfig';

function Navbar() {
    const { isAdmin, token } = useAuth();
    const [cartCount, setCartCount] = useState(0);

    const updateCount = useCallback(async () => {
        if (!token) return;
        try {
            const res = await api.get('/cart');
            const count = res.data && res.data.products ? res.data.products.length : 0;
            setCartCount(count);
        } catch (e) { console.error("Badge sync error", e); }
    }, [token]);

    useEffect(() => {
        updateCount();
        const handleCartChange = () => setTimeout(updateCount, 100);
        window.addEventListener('cartUpdated', handleCartChange);
        return () => window.removeEventListener('cartUpdated', handleCartChange);
    }, [token, updateCount]);

    if (!token) return null;

    return (
        <nav style={navContainer}>
            <div style={topSection}>
                <Link to="/" style={logoStyle}>🚀 BOOKSTORE</Link>

                {/* BROWSE GROUP - For Everyone */}
                <div style={linkGroup}>
                    <Link to="/inventory" style={navLink}>Books</Link>
                    <Link to="/magazines" style={navLink}>Magazines</Link>
                    <Link to="/laptops" style={navLink}>Laptops</Link>
                    <Link to="/phones" style={navLink}>Phones</Link>
                    <Link to="/tickets" style={navLink}>Tickets</Link>
                </div>

                <div style={actionGroup}>
                    {/* CART WITH REFINED BADGE */}
                    <Link to="/cart" style={cartButton}>
                        🛒
                        {cartCount > 0 && <span key={cartCount} style={badgeStyle}>{cartCount}</span>}
                    </Link>
                    <Link to="/logout" style={logoutBtn}>Logout</Link>
                </div>
            </div>

            {/* ADMIN TOOLS BAR - Only shows for Admins */}
            {isAdmin && (
                <div style={adminBar}>
                    <span style={adminLabel}>ADMIN TOOLS:</span>
                    <Link to="/add" style={addBtn}>+ Book</Link>
                    <Link to="/add-magazine" style={addBtn}>+ Magazine</Link>
                    <Link to="/add-laptop" style={addBtn}>+ Laptop</Link>
                    <Link to="/add-phone" style={addBtn}>+ Phone</Link>
                    <Link to="/add-ticket" style={addBtn}>+ Ticket</Link>
                </div>
            )}
        </nav>
    );
}

const navContainer = {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

const topSection = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--card)',
    padding: '12px 25px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)'
};

const linkGroup = { display: 'flex', gap: '18px' };

const navLink = {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    transition: 'color 0.2s'
};

const logoStyle = { color: 'white', textDecoration: 'none', fontWeight: '900', fontSize: '1.1rem' };

const actionGroup = { display: 'flex', alignItems: 'center', gap: '15px' };

const cartButton = {
    position: 'relative',
    fontSize: '1.4rem',
    textDecoration: 'none',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '8px',
    borderRadius: '10px'
};

const badgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: 'var(--accent)',
    color: 'white',
    fontSize: '0.7rem',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    boxShadow: '0 0 10px rgba(244, 63, 94, 0.4)'
};

const logoutBtn = {
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '0.85rem'
};

const adminBar = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: '8px 20px',
    borderRadius: '12px',
    border: '1px dashed var(--primary)'
};

const adminLabel = {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: 'var(--primary)', // Added quotes
    marginRight: '10px'
};

const addBtn = {
    backgroundColor: 'var(--primary)', // Added quotes
    color: 'white',
    textDecoration: 'none',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
};

export default Navbar;