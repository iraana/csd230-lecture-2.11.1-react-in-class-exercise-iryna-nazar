import { Link } from 'react-router';

function Navbar() {
    return (
        <nav style={{
            padding: '1rem 2rem',
            backgroundColor: '#1e293b',
            borderBottom: '1px solid #334155',
            borderRadius: '12px',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
        }}>
            {/* Logo / Home */}
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '800', fontSize: '1.2rem' }}>
                🚀 ADMIN CENTER
            </Link>

            {/* Navigation Groups */}
            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>

                {/* Books Group */}
                <div style={navGroupStyle}>
                    <Link to="/inventory" style={linkStyle}>BOOKS</Link>
                    <Link to="/add" style={{...addBtnStyle, backgroundColor: '#6366f1'}}>+ ADD</Link>
                </div>

                {/* Magazines Group */}
                <div style={navGroupStyle}>
                    <Link to="/magazines" style={linkStyle}>MAGAZINES</Link>
                    <Link to="/add-magazine" style={{...addBtnStyle, backgroundColor: '#10b981'}}>+ ADD</Link>
                </div>

                {/* Laptops Group */}
                <div style={navGroupStyle}>
                    <Link to="/laptops" style={linkStyle}>LAPTOPS</Link>
                    <Link to="/add-laptop" style={{...addBtnStyle, backgroundColor: '#f43f5e'}}>+ ADD</Link>
                </div>

            </div>
        </nav>
    );
}

// Styling Constants
const navGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderLeft: '1px solid #334155',
    paddingLeft: '20px'
};

const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.85rem',
    letterSpacing: '1px',
    transition: 'color 0.2s'
};

const addBtnStyle = {
    color: 'white',
    padding: '5px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.75rem',
    fontWeight: '800'
};

export default Navbar;