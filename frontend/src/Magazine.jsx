import { useState } from 'react';

function Magazine({ id, title, price, orderQty, currentIssue, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempOrderQty, setTempOrderQty] = useState(orderQty);

    const handleSave = () => {
        const updatedMag = {
            id,
            title: tempTitle,
            price: parseFloat(tempPrice),
            orderQty: parseInt(tempOrderQty),
            copies: 1, // Defaulting copies to 1 for logic consistency
            currentIssue: currentIssue // Keeping the original issue date
        };

        onUpdate(id, updatedMag);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="magazine-row editing" style={{ border: '2px solid #4444ff', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', gap: '10px', backgroundColor: '#eef' }}>
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} style={{ flex: 2 }} />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '100px' }} />
                <input type="number" value={tempOrderQty} onChange={(e) => setTempOrderQty(e.target.value)} style={{ width: '80px' }} />
                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="magazine-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="mag-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Price:</strong> ${price.toFixed(2)} | <strong>Order Qty:</strong> {orderQty} | <strong>Issue:</strong> {new Date(currentIssue).toLocaleDateString()}
                </p>
            </div>
            <div className="mag-actions">
                <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107', marginRight: '5px' }}>Edit</button>
                <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
            </div>
        </div>
    );
}

export default Magazine;