import { Link } from 'react-router';
import { useAuth } from './provider/authProvider';

function Navbar() {
    const { isAdmin, token } = useAuth();

    if (!token) return null; // Don't show navbar if not logged in

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>🚀 DASHBOARD</Link>

            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>

                {/* BOOKS GROUP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link to="/inventory" style={linkStyle}>BOOKS</Link>
                    {isAdmin && (
                        <Link to="/add" style={{ ...baseAddStyle, backgroundColor: '#6366f1' }}>
                            + Add
                        </Link>
                    )}
                </div>

                {/* MAGAZINES GROUP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link to="/magazines" style={linkStyle}>MAGAZINES</Link>
                    {isAdmin && (
                        <Link to="/add-magazine" style={{ ...baseAddStyle, backgroundColor: '#10b981' }}>
                            + Add
                        </Link>
                    )}
                </div>

                {/* LAPTOPS GROUP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link to="/laptops" style={linkStyle}>LAPTOPS</Link>
                    {isAdmin && (
                        <Link to="/add-laptop" style={{ ...baseAddStyle, backgroundColor: '#f43f5e' }}>
                            + Add
                        </Link>
                    )}
                </div>

                <Link to="/cart" style={{ ...linkStyle, color: '#f59e0b' }}>🛒 CART</Link>

            </div>

            <Link to="/logout" style={{ color: '#ef4444', textDecoration: 'none', fontWeight:'bold' }}>Logout</Link>
        </nav>
    );
}

// --- STYLES ---

const navStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '800'
};

const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 'bold'
};

// Base style for the Add buttons to look like actual "buttons" instead of text links
const baseAddStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'filter 0.2s',
};

export default Navbar;