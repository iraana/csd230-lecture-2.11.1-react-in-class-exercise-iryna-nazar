import { useState } from 'react';
import { useAuth } from './provider/authProvider'; // Import Auth Context
import api from './api/axiosConfig';

function Laptop({ id, brand, price, ramSize, onUpdate, onDelete }) {
    const { isAdmin } = useAuth(); // NEW: Check role
    const [isEditing, setIsEditing] = useState(false);
    const [tBrand, setTBrand] = useState(brand);
    const [tPrice, setTPrice] = useState(price);

    const save = () => {
        onUpdate(id, {
            id,
            brand: tBrand,
            price: parseFloat(tPrice) || 0.0,
            ramSize: ramSize
        });
        setIsEditing(false);
    };

    return (
        <div className="admin-card">
            {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{flex: 2}} value={tBrand} onChange={e => setTBrand(e.target.value)} />
                    <input type="number" value={tPrice} onChange={e => setTPrice(e.target.value)} />
                    <button className="btn-save" onClick={save}>Save</button>
                    <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{textAlign: 'left'}}>
                        <h3 style={{margin:0}}>💻 {brand}</h3>
                        <p style={{margin:0, opacity: 0.7}}>RAM: {ramSize}GB | Price: ${price?.toFixed(2)}</p>
                    </div>
                    <div style={{display:'flex', gap: '8px'}}>
                        {/* ROLE PROTECTION */}
                        {/* ADD TO CART - Visible to all */}
                        <button
                            style={{background:'#6366f1', color:'white'}}
                            onClick={() => api.post(`/cart/add/${id}`).then(() => alert("Added to cart!"))}
                        >
                            🛒 Add to Cart
                        </button>
                        {isAdmin && (
                            <>
                                <button style={{background:'#f59e0b', color:'black', marginRight:'8px'}} onClick={() => setIsEditing(true)}>Edit</button>
                                <button style={{background:'#ef4444', color:'white'}}
                                        onClick={() => api.delete(`/laptops/${id}`).then(onDelete)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Laptop;