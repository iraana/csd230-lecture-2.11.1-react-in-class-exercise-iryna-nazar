import { useState } from 'react';
import api from './api/axiosConfig';

function TicketForm({ onAdded }) {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = {
            productType: "TicketEntity",
            description,
            price: parseFloat(price) || 0.0
        };

        api.post('/tickets', newTicket).then(res => {
            alert("New Event Registered!");
            onAdded(res.data);
            setDescription(''); setPrice('');
        }).catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit} className="admin-card" style={{ borderLeft: '10px solid #5c95d4' }}>
            <h2 style={{ color: '#5c95d4', marginTop: 0 }}>Add New Ticket</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    placeholder="Event Description (e.g. Summer Concert)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Ticket Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />

                <button type="submit" style={{ backgroundColor: '#5c95d4', color: 'white', fontSize: '1rem' }}>
                    Add to Inventory
                </button>
            </div>
        </form>
    );
}

export default TicketForm;