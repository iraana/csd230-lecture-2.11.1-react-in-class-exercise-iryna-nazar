import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'        // NEW
import MagazineForm from './MagazineForm' // NEW
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]); // NEW
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch both Books and Magazines
        const bookFetch = fetch('/api/books').then(res => res.json());
        const magFetch = fetch('/api/magazines').then(res => res.json());

        Promise.all([bookFetch, magFetch]).then(([bookData, magData]) => {
            setBooks(bookData);
            setMagazines(magData);
            setLoading(false);
        });
    }, []);

    // --- Book Handlers ---
    const handleAddBook = (newBook) => setBooks([...books, newBook]);
    const handleDeleteBook = (id) => {
        if (window.confirm("Delete this book?")) {
            fetch(`/api/books/${id}`, { method: 'DELETE' }).then(res => {
                if (res.ok) setBooks(books.filter(b => b.id !== id));
            });
        }
    };
    const handleUpdateBook = (id, updatedData) => {
        fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        }).then(res => res.json()).then(saved => setBooks(books.map(b => b.id === id ? saved : b)));
    };

    // --- Magazine Handlers (NEW) ---
    const handleAddMag = (newMag) => setMagazines([...magazines, newMag]);
    const handleDeleteMag = (id) => {
        if (window.confirm("Delete this magazine?")) {
            fetch(`/api/magazines/${id}`, { method: 'DELETE' }).then(res => {
                if (res.ok) setMagazines(magazines.filter(m => m.id !== id));
            });
        }
    };
    const handleUpdateMag = (id, updatedData) => {
        fetch(`/api/magazines/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        }).then(res => res.json()).then(saved => setMagazines(magazines.map(m => m.id === id ? saved : m)));
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Book Routes */}
                <Route path="/inventory" element={
                    <div className="book-list">
                        <h1>Book Inventory</h1>
                        {books.map(b => <Book key={b.id} {...b} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />)}
                    </div>
                } />
                <Route path="/add" element={<div><h1>Add Book</h1><BookForm onBookAdded={handleAddBook} /></div>} />

                {/* Magazine Routes (NEW) */}
                <Route path="/magazines" element={
                    <div className="mag-list">
                        <h1>Magazine Inventory</h1>
                        {magazines.map(m => <Magazine key={m.id} {...m} onDelete={handleDeleteMag} onUpdate={handleUpdateMag} />)}
                    </div>
                } />
                <Route path="/add-magazine" element={
                    <div>
                        <h1>Add Magazine</h1>
                        <MagazineForm onMagAdded={handleAddMag} />
                    </div>
                } />
            </Routes>
        </div>
    )
}

export default App;