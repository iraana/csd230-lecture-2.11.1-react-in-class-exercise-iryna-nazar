import { useState } from 'react';

function LaptopForm({ onAdded }) {
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [ram, setRam] = useState(8);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLaptop = {
            productType: "LaptopEntity", // Mandatory for our Java setup
            brand: brand,
            price: parseFloat(price) || 0.0,
            ramSize: parseInt(ram) || 8
        };

        fetch('/api/laptops', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLaptop),
        })
            .then(res => res.json())
            .then(saved => {
                alert("Electronics Catalog Updated!");
                onAdded(saved); // Tells App.jsx to update state and redirect
            })
            .catch(err => console.error("Post error:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="admin-card" style={{ borderLeft: '10px solid #f43f5e' }}>
            <h2 style={{ color: '#f43f5e', marginTop: 0 }}>Add New Laptop</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input placeholder="Manufacturer / Brand (e.g. Apple, Dell)" value={brand} onChange={e => setBrand(e.target.value)} required />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" step="0.01" placeholder="MSRP Price" value={price} onChange={e => setPrice(e.target.value)} required style={{ flex: 1 }} />
                    <input type="number" placeholder="RAM Size (GB)" value={ram} onChange={e => setRam(e.target.value)} required style={{ flex: 1 }} />
                </div>

                <button type="submit" style={{ backgroundColor: '#f43f5e', color: 'white', fontSize: '1rem' }}>
                    Add to Inventory
                </button>
            </div>
        </form>
    );
}

export default LaptopForm;