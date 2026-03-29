import { useState } from 'react';
import { useAuth } from './provider/authProvider';
import api from './api/axiosConfig';

function Book({ id, title, author, price, onUpdate, onDelete }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tTitle, setTTitle] = useState(title);
    const[tAuthor, setTAuthor] = useState(author);
    const [tPrice, setTPrice] = useState(price);

    const save = () => {
        onUpdate(id, {
            id,
            title: tTitle,
            author: tAuthor,
            price: parseFloat(tPrice) || 0.0,
            copies: 10
        });
        setIsEditing(false);
    };

    return (
        <div className="admin-card">
            {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{flex: 2}} value={tTitle} onChange={e => setTTitle(e.target.value)} />
                    <input style={{flex: 1}} value={tAuthor} onChange={e => setTAuthor(e.target.value)} />
                    <input type="number" style={{width: '80px'}} value={tPrice} onChange={e => setTPrice(e.target.value)} />
                    <button style={{background:'#10b981', color:'white'}} onClick={save}>Save</button>
                    <button style={{background:'#64748b', color:'white'}} onClick={() => setIsEditing(false)}>X</button>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{textAlign: 'left'}}>
                        <h3 style={{margin:0, color: '#f1f5f9'}}>📚 {title}</h3>
                        <p style={{margin:'5px 0 0 0', color: '#94a3b8'}}>Author: {author} | Price: ${price?.toFixed(2)}</p>
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

                                <button style={{background:'#ef4444', color:'white'}} onClick={() => api.delete(`/books/${id}`).then(onDelete)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Book;