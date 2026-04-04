import { useState } from 'react';
import api from './api/axiosConfig';

function BookForm({ onAdded }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
            productType: "BookEntity",
            title: title,
            author: author,
            price: parseFloat(price) || 0.0,
            copies: 10
        };

        api.post('/books', newBook)
            .then(res => {
                alert("Book added to library successfully!");
                onAdded(res.data);
                setTitle(''); setAuthor(''); setPrice('');
            })
            .catch(err => console.error("Database error:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="admin-card" style={{ borderLeft: '10px solid #6366f1' }}>
            <h2 style={{ color: '#6366f1', marginTop: 0 }}>Add New Book</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Title Input */}
                <input
                    placeholder="Book Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                {/* Author and Price Row */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        placeholder="Author Name"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        required
                        style={{ flex: 2 }}
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        style={{ flex: 1 }}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" style={{ backgroundColor: '#6366f1', color: 'white', fontSize: '1rem' }}>
                    Add to Inventory
                </button>
            </div>
        </form>
    );
}

export default BookForm;