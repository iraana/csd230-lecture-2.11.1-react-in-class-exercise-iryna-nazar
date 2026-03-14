import { useState } from 'react';

function MagazineForm({ onAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Build the object for a Polymorphic backend
        const newMag = {
            productType: "MagazineEntity", // Mandatory for our Java setup
            title: title,
            price: parseFloat(price) || 0.0,
            orderQty: parseInt(qty) || 0,
            copies: 10, // Default seed value
            currentIssue: new Date().toISOString().split('.')[0]
        };

        fetch('/api/magazines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMag),
        })
            .then(res => res.json())
            .then(saved => {
                alert("Magazine Registered!");
                onAdded(saved);
            })
            .catch(err => console.error("Post error:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="admin-card" style={{ borderLeft: '10px solid #10b981' }}>
            <h2 style={{ color: '#10b981', marginTop: 0 }}>Add New Magazine</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input placeholder="Magazine Title (e.g. National Geographic)" value={title} onChange={e => setTitle(e.target.value)} required />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" step="0.01" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required style={{ flex: 1 }} />
                    <input type="number" placeholder="Initial Order Qty" value={qty} onChange={e => setQty(e.target.value)} required style={{ flex: 1 }} />
                </div>

                <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', fontSize: '1rem' }}>
                    Add to Inventory
                </button>
            </div>
        </form>
    );
}

export default MagazineForm;