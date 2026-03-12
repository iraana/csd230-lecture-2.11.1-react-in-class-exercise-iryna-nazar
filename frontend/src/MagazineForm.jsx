import { useState } from 'react';

function MagazineForm({ onMagAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [orderQty, setOrderQty] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMag = {
            title,
            price: parseFloat(price),
            orderQty: parseInt(orderQty),
            copies: 10, // Default seed value
            currentIssue: new Date().toISOString() // Setting current date for new entry
        };

        fetch('/api/magazines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMag),
        })
            .then(response => response.json())
            .then(savedMag => {
                alert("Magazine Saved!");
                onMagAdded(savedMag);
                setTitle('');
                setPrice(0);
                setOrderQty(0);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Magazine</h3>
            <input type="text" placeholder="Magazine Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input type="number" placeholder="Order Quantity" value={orderQty} onChange={(e) => setOrderQty(e.target.value)} required />
            <button type="submit">Save Magazine</button>
        </form>
    );
}

export default MagazineForm;