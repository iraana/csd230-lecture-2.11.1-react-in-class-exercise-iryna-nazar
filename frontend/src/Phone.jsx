import { useState } from 'react';
import { useAuth } from './provider/authProvider';
import api from './api/axiosConfig';

function Phone({ id, brand, price, storage, onUpdate, onDelete }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tBrand, setTBrand] = useState(brand);
    const [tPrice, setTPrice] = useState(price);

    const save = () => {
        // We only pass id and data.
        // The path ('phones') and setter (setPhones) are already handled in App.jsx
        onUpdate(id, {
            id,
            brand: tBrand,
            price: parseFloat(tPrice) || 0.0,
            storage: storage,
            productType: "PhoneEntity" // Important for Spring Boot Polymorphism
        });
        setIsEditing(false);
    };

    return (
        <div className="admin-card">
            {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{flex: 2}} value={tBrand} onChange={e => setTBrand(e.target.value)} />
                    <input type="number" value={tPrice} onChange={e => setTPrice(e.target.value)} />
                    <button style={{background:'#10b981', color:'white'}} onClick={save}>Save</button>
                    <button style={{background:'#64748b', color:'white'}} onClick={() => setIsEditing(false)}>X</button>

                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{textAlign: 'left'}}>
                        <h3 style={{margin:0}}>📱 {brand}</h3>
                        <p style={{margin:0, color: 'var(--text-muted)'}}>{storage}GB Storage | ${price?.toFixed(2)}</p>
                    </div>
                    <div style={{display:'flex', gap: '8px'}}>
                        <button style={{background: 'var(--primary)', color:'white'}} onClick={() => api.post(`/cart/add/${id}`).then(() => {
                            alert("Phone added to cart!");
                            window.dispatchEvent(new Event('cartUpdated'));
                        })}>🛒 Add to Cart</button>
                        {isAdmin && (
                            <>
                                <button style={{background: '#f59e0b'}} onClick={() => setIsEditing(true)}>Edit</button>
                                <button style={{background: 'var(--accent)', color:'white'}} onClick={() => api.delete(`/phones/${id}`).then(onDelete)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
export default Phone;