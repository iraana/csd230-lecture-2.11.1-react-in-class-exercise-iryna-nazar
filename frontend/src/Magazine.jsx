import { useState } from 'react';
import { useAuth } from './provider/authProvider'; // 1. Import Auth Context
import api from './api/axiosConfig'; // 2. Import custom Axios api

function Magazine({ id, title, price, orderQty, currentIssue, onUpdate, onDelete }) {
    const { isAdmin } = useAuth(); // 3. Get admin status
    const[isEditing, setIsEditing] = useState(false);
    const [tTitle, setTTitle] = useState(title);
    const [tPrice, setTPrice] = useState(price);

    const save = () => {
        let dateStr = currentIssue;
        if (dateStr.includes('.')) dateStr = dateStr.split('.')[0];
        if (dateStr.includes('Z')) dateStr = dateStr.replace('Z', '');

        onUpdate(id, {
            id,
            title: tTitle,
            price: parseFloat(tPrice) || 0.0,
            orderQty: orderQty,
            copies: 10, // Added default copies
            currentIssue: dateStr
        });
        setIsEditing(false);
    };

    return (
        <div className="admin-card">
            {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{flex: 2}} value={tTitle} onChange={e => setTTitle(e.target.value)} />
                    <input type="number" style={{width: '100px'}} value={tPrice} onChange={e => setTPrice(e.target.value)} />
                    <button style={{background:'#10b981', color:'white'}} onClick={save}>Save</button>
                    <button style={{background:'#64748b', color:'white'}} onClick={() => setIsEditing(false)}>X</button>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{textAlign: 'left'}}>
                        <h3 style={{margin:0, color: '#f1f5f9'}}>📰 {title}</h3>
                        <p style={{margin:'5px 0 0 0', opacity: 0.7, color: '#94a3b8'}}>Price: ${price?.toFixed(2)} | Qty: {orderQty}</p>
                    </div>
                    <div style={{display:'flex', gap: '8px'}}>
                        {/* ADD TO CART - Visible to all */}
                        <button
                            style={{background:'#6366f1', color:'white'}}
                            onClick={() => api.post(`/cart/add/${id}`).then(() => alert("Added to cart!"))}
                        >
                            🛒 Add to Cart
                        </button>
                        {/* 4. PROTECT BUTTONS WITH isAdmin */}
                        {isAdmin && (
                            <>
                                <button style={{background:'#f59e0b', color:'black', marginRight:'8px'}} onClick={() => setIsEditing(true)}>Edit</button>
                                {/* 5. Use api.delete instead of fetch */}
                                <button style={{background:'#ef4444', color:'white'}} onClick={() => api.delete(`/magazines/${id}`).then(onDelete)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Magazine;