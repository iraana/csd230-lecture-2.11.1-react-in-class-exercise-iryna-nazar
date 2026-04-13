import { useState } from 'react';
import { useAuth } from './provider/authProvider';
import api from './api/axiosConfig';

function Ticket({ id, description, price, onUpdate, onDelete }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tDesc, setTDesc] = useState(description || "");
    const [tPrice, setTPrice] = useState(price || 0);

    const save = () => {
        onUpdate(id, {
            id,
            description: tDesc, // Must be 'description' to match Java
            price: parseFloat(tPrice) || 0.0,
            productType: "TicketEntity"
        }, 'tickets', (data) => { /* App.jsx logic */ });
        setIsEditing(false);
    };


    return (
        <div className="admin-card">
            {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{ flex: 2 }} value={tDesc} onChange={e => setTDesc(e.target.value)} />
                    <input type="number" value={tPrice} onChange={e => setTPrice(e.target.value)} />
                    <button style={{background:'#10b981', color:'white'}} onClick={save}>Save</button>
                    <button style={{background:'#64748b', color:'white'}} onClick={() => setIsEditing(false)}>X</button>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h3 style={{ margin: 0 }}>🎟 {description}</h3>
                        <p style={{ margin: 0, opacity: 0.6 }}>Event Ticket | ${Number(price || 0).toFixed(2)}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            style={{ background: 'var(--primary)', color: 'white' }}
                            // We call a global window function to update the badge (defined in App.jsx later)
                            onClick={() => api.post(`/cart/add/${id}`).then(() => {
                                alert("Ticket added to cart!");
                                window.dispatchEvent(new Event('cartUpdated'));
                            })}
                        >
                            🛒 Add to Cart
                        </button>
                        {isAdmin && (
                            <>
                                <button style={{ background: 'var(--warning)', color: 'black' }} onClick={() => setIsEditing(true)}>Edit</button>
                                <button style={{ background: 'var(--accent)', color: 'white' }} onClick={() => api.delete(`/tickets/${id}`).then(onDelete)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ticket;