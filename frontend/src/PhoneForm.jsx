import { useState } from 'react';
import api from './api/axiosConfig';

function PhoneForm({ onAdded }) {
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [storage, setStorage] = useState(128);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPhone = { productType: "PhoneEntity", brand, price: parseFloat(price), storage: parseInt(storage) };
        api.post('/phones', newPhone).then(res => {
            alert("Phone Added!");
            onAdded(res.data);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-card" style={{ borderLeft: '8px solid #ff703a' }}>
            <h2 style={{ color: '#ff703a', marginTop: 0 }}>Add New Phone</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required style={{flex:1}}/>
                    <input type="number" placeholder="Storage (GB)" value={storage} onChange={e => setStorage(e.target.value)} required style={{flex:1}}/>
                </div>
                <button type="submit" style={{ backgroundColor: '#ff703a', color: 'white', fontSize: '1rem' }}>
                    Add to Inventory
                </button>
            </div>
        </form>
    );
}
export default PhoneForm;