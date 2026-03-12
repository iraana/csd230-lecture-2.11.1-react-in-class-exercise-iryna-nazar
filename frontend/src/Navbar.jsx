import { Link } from 'react-router';

function Navbar() {
    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#222',
            color: 'white',
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            borderRadius: '8px'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Home</Link>
            <Link to="/inventory" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>📚 Books</Link>
            <Link to="/add" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>➕ Add Book</Link>
            <span style={{color: '#444'}}>|</span>
            <Link to="/magazines" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>📰 Magazines</Link>
            <Link to="/add-magazine" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>➕ Add Magazine</Link>
        </nav>
    );
}

export default Navbar;