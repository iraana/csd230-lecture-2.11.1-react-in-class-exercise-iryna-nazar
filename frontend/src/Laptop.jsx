import { useState } from 'react';

function Laptop({ id, brand, price, ramSize, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tBrand, setTBrand] = useState(brand);
    const [tPrice, setTPrice] = useState(price);

    const save = () => {
        onUpdate(id, {
            id,
            productType: "LaptopEntity",
            brand: tBrand,
            price: parseFloat(tPrice) || 0.0,
            ramSize
        });
        setIsEditing(false);
    };

    return (
        <div className="admin-card">
            {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{flex: 2}} value={tBrand} onChange={e => setTBrand(e.target.value)} />
                    <input type="number" style={{width: '100px'}} value={tPrice} onChange={e => setTPrice(e.target.value)} />
                    <button style={{background:'#10b981', color:'white'}} onClick={save}>Save</button>
                    <button style={{background:'#64748b', color:'white'}} onClick={() => setIsEditing(false)}>X</button>
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{textAlign: 'left'}}>
                        <h3 style={{margin:0, color: '#f1f5f9'}}>💻 {brand}</h3>
                        <p style={{margin:'5px 0 0 0', opacity: 0.7, color: '#94a3b8'}}>RAM: {ramSize}GB | Price: ${price?.toFixed(2)}</p>
                    </div>
                    <div>
                        <button style={{background:'#f59e0b', color:'black', marginRight:'8px'}} onClick={() => setIsEditing(true)}>Edit</button>
                        <button style={{background:'#ef4444', color:'white'}} onClick={() => fetch(`/api/laptops/${id}`, {method:'DELETE'}).then(onDelete)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Laptop;