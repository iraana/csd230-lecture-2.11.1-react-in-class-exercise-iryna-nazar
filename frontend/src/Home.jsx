import { useAuth } from './provider/authProvider';

function Home({ bookCount, magCount, lapCount }) {
    const { isAdmin } = useAuth();

    return (
        <div style={{ textAlign: 'center' }}>
            {/* Dynamic Header based on Role */}
            <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
                {isAdmin ? "Store Management" : "Our Collection"}
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '50px' }}>
                {isAdmin
                    ? "Control inventory and monitor product levels across the database."
                    : "Browse our diverse selection of publications and technology."}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                {/* BOOKS CARD */}
                <div style={cardStyle('#6366f1')}>
                    <span style={{fontSize: '3rem'}}>📚</span>
                    <h2 style={{fontSize:'3rem', color:'white', margin:'10px 0'}}>{bookCount}</h2>
                    <p style={{margin:0, opacity:0.8, fontWeight: '800'}}>TITLES AVAILABLE</p>
                </div>

                {/* MAGAZINES CARD */}
                <div style={cardStyle('#10b981')}>
                    <span style={{fontSize: '3rem'}}>📰</span>
                    <h2 style={{fontSize:'3rem', color:'white', margin:'10px 0'}}>{magCount}</h2>
                    <p style={{margin:0, opacity:0.8, fontWeight: '800'}}>MAGAZINE ISSUES</p>
                </div>

                {/* LAPTOPS CARD */}
                <div style={statCard('#f43f5e')}>
                    <span style={{fontSize: '3rem'}}>💻</span>
                    <h2 style={{fontSize:'3rem', color:'white', margin:'10px 0'}}>{lapCount}</h2>
                    <p style={{margin:0, opacity:0.8, fontWeight: '800'}}>ELECTRONIC DEVICES</p>
                </div>
            </div>

            {/* Role-Specific Information Card */}
            <div className="admin-card" style={{ marginTop: '50px', borderTop: '4px solid #475569' }}>
                {isAdmin ? (
                    <>
                        <h3 style={{fontSize: '1.5rem', color: '#6366f1'}}>🛠 Administrative Access</h3>
                        <p style={{color: '#94a3b8'}}>
                            You are logged in with <strong>Full Control</strong>.
                            Changes to pricing or quantities are live on the cloud.
                            Please ensure all data entries meet standard catalog requirements.
                        </p>
                    </>
                ) : (
                    <>
                        <h3 style={{fontSize: '1.5rem', color: '#10b981'}}>🛍 Welcome to our Bookstore</h3>
                        <p style={{color: '#94a3b8'}}>
                            Discover the latest in literature and technology.
                            Add items to your cart to prepare your next purchase.
                            If you need help, please visit the service desk.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

// --- STYLES ---

const cardStyle = (color) => ({
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '24px',
    borderTop: `8px solid ${color}`,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease-in-out'
});

const statCard = (color) => ({
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '24px',
    borderTop: `8px solid ${color}`,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
});

export default Home;