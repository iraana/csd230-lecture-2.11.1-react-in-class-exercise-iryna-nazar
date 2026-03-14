function Home({ bookCount, magCount, lapCount }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>System Overview</h1>
            <p style={{ color: '#94a3b8', marginBottom: '50px' }}>Current database snapshot.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                <div style={cardStyle('#6366f1')}>
                    <span style={{fontSize: '3rem'}}>📚</span>
                    <h2 style={{fontSize:'3rem', color:'white', margin:'10px 0'}}>{bookCount}</h2>
                    <p style={{margin:0, opacity:0.8, fontWeight: '800'}}>BOOKS</p>
                </div>

                <div style={cardStyle('#10b981')}>
                    <span style={{fontSize: '3rem'}}>📰</span>
                    <h2 style={{fontSize:'3rem', color:'white', margin:'10px 0'}}>{magCount}</h2>
                    <p style={{margin:0, opacity:0.8, fontWeight: '800'}}>MAGAZINES</p>
                </div>

                <div style={statCard('#f43f5e')}>
                    <span style={{fontSize: '3rem'}}>💻</span>
                    <h2 style={{fontSize:'3rem', color:'white', margin:'10px 0'}}>{lapCount}</h2>
                    <p style={{margin:0, opacity:0.8, fontWeight: '800'}}>LAPTOPS</p>
                </div>
            </div>

            <div className="admin-card" style={{ marginTop: '50px', borderTop: '4px solid #475569' }}>
                <h3 style={{fontSize: '1.5rem'}}>Administrative Access</h3>
                <p style={{color: '#94a3b8'}}>All changes are persisted to the H2 Cloud Database. Ensure price and quantity values are non-negative.</p>
            </div>
        </div>
    );
}

const cardStyle = (color) => ({
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '24px',
    borderTop: `8px solid ${color}`,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
});

const statCard = (color) => ({
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '24px',
    borderTop: `8px solid ${color}`,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
});

export default Home;