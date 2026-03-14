import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import Navbar from './Navbar';
import Home from './Home';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import Laptop from './Laptop';
import LaptopForm from './LaptopForm';

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const refreshData = async () => {
        try {
            const [b, m, l] = await Promise.all([
                fetch('/api/books').then(r => r.json()),
                fetch('/api/magazines').then(r => r.json()),
                fetch('/api/laptops').then(r => r.json())
            ]);
            setBooks(b); setMagazines(m); setLaptops(l);
            setLoading(false);
        } catch (e) { console.error("Database offline"); }
    };

    useEffect(() => { refreshData(); }, []);

    // Master Update Handler
    const handleUpdate = (id, data, path, setter) => {
        fetch(`/api/${path}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok) throw new Error("Sync Error");
            return res.json();
        }).then(saved => {
            setter(prev => prev.map(item => item.id === id ? saved : item));
        }).catch(err => alert(err.message));
    };

    if (loading) return <h2 style={{textAlign:'center', marginTop:'20%'}}>Connecting to Admin Services...</h2>;

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home bookCount={books.length} magCount={magazines.length} lapCount={laptops.length} />} />

                <Route path="/inventory" element={<div><h1>Book Inventory</h1>{books.map(i => <Book key={i.id} {...i} onUpdate={(id, d) => handleUpdate(id, d, 'books', setBooks)} onDelete={refreshData}/>)}</div>} />
                <Route path="/add" element={<BookForm onAdded={(n) => { setBooks([...books, n]); navigate('/inventory'); }} />} />

                <Route path="/magazines" element={<div><h1>Magazine Inventory</h1>{magazines.map(i => <Magazine key={i.id} {...i} onUpdate={(id, d) => handleUpdate(id, d, 'magazines', setMagazines)} onDelete={refreshData}/>)}</div>} />
                <Route path="/add-magazine" element={<MagazineForm onAdded={(n) => { setMagazines([...magazines, n]); navigate('/magazines'); }} />} />

                <Route path="/laptops" element={<div><h1>Laptop Inventory</h1>{laptops.map(i => <Laptop key={i.id} {...i} onUpdate={(id, d) => handleUpdate(id, d, 'laptops', setLaptops)} onDelete={refreshData}/>)}</div>} />
                <Route path="/add-laptop" element={<LaptopForm onAdded={(n) => { setLaptops([...laptops, n]); navigate('/laptops'); }} />} />
            </Routes>
        </div>
    );
}

export default App;