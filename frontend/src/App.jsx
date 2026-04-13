import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router'; // Added Navigate
import Navbar from './Navbar';
import Home from './Home';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import Laptop from './Laptop';
import LaptopForm from './LaptopForm';
import Login from './pages/Login'; // Added Login import
import Logout from './pages/Logout'; // Added Logout import
import Cart from './Cart';
import { useAuth } from './provider/authProvider'; // Added useAuth import
import api from './api/axiosConfig'; // Added our custom Axios instance
import './App.css';
import Phone from "./Phone.jsx";
import PhoneForm from "./PhoneForm.jsx";
import Ticket from "./Ticket.jsx";
import TicketForm from "./TicketForm.jsx";

function App() {
    const { token } = useAuth(); // NEW: Get token for route protection
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [phones, setPhones] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const refreshData = async () => {
        // If not logged in, don't attempt to fetch secure data
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            // Using our Axios api instead of raw fetch so JWT is attached!
            const [b, m, l,p,t] = await Promise.all([
                api.get('/books'),
                api.get('/magazines'),
                api.get('/laptops'),
                api.get('/phones'),
                api.get('/tickets')
            ]);
            setBooks(b.data);
            setMagazines(m.data);
            setLaptops(l.data);
            setPhones(p.data || []);
            setTickets(t.data || []);
            setLoading(false);
        } catch (e) {
            console.error("Database offline or auth failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { refreshData(); }, [token]); // Re-fetch when user logs in

    // Master Update Handler using axios instance
    const handleUpdate = async (id, data, path, setter) => {
        try {
            const res = await api.put(`/${path}/${id}`, data);
            setter(prev => prev.map(item => item.id === id ? res.data : item));
            alert("Update Successful!"); // Optional: Add a success message
        } catch (err) {
            // Log the specific error to console so you can see if it's 401, 400, or 500
            console.error("Update Error Details:", err.response?.data || err.message);

            if (err.response?.status === 401) {
                alert("Your session has expired. Please log in again.");
            } else {
                alert("Update Failed: " + (err.response?.data?.message || "Check console for details"));
            }
        }
    };

    if (loading) return <h2 style={{textAlign:'center', marginTop:'20%'}}>Connecting to Admin Services...</h2>;

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* 1. Only show Navbar if logged in */}
            {token && <Navbar />}

            <Routes>
                {/* 2. Public Route */}
                <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />

                {/* 3. Protected Dashboard (If no token, redirect to login) */}
                <Route path="/" element={token ? (
                    <Home
                        bookCount={books.length}
                        magCount={magazines.length}
                        lapCount={laptops.length}
                        phoneCount={phones.length}
                        ticketCount={tickets.length}
                    />
                ) : <Navigate to="/login" />} />
                {/* 4. Protected Inventory Routes (If no token, redirect to login) */}
                <Route path="/inventory" element={token ? (
                    <div><h1>Book Inventory</h1>{books.map(i => <Book key={i.id} {...i} onUpdate={(id, d) => handleUpdate(id, d, 'books', setBooks)} onDelete={refreshData}/>)}</div>
                ) : <Navigate to="/login" />} />

                <Route path="/add" element={token ? <BookForm onAdded={(n) => { setBooks([...books, n]); navigate('/inventory'); }} /> : <Navigate to="/login" />} />

                <Route path="/magazines" element={token ? (
                    <div><h1>Magazine Inventory</h1>{magazines.map(i => <Magazine key={i.id} {...i} onUpdate={(id, d) => handleUpdate(id, d, 'magazines', setMagazines)} onDelete={refreshData}/>)}</div>
                ) : <Navigate to="/login" />} />

                <Route path="/add-magazine" element={token ? <MagazineForm onAdded={(n) => { setMagazines([...magazines, n]); navigate('/magazines'); }} /> : <Navigate to="/login" />} />

                <Route path="/laptops" element={token ? (
                    <div><h1>Laptop Inventory</h1>{laptops.map(i => <Laptop key={i.id} {...i} onUpdate={(id, d) => handleUpdate(id, d, 'laptops', setLaptops)} onDelete={refreshData}/>)}</div>
                ) : <Navigate to="/login" />} />

                <Route path="/add-laptop" element={token ? <LaptopForm onAdded={(n) => { setLaptops([...laptops, n]); navigate('/laptops'); }} /> : <Navigate to="/login" />} />


                <Route path="/phones" element={token ? (
                    <div>
                        <h1>Phone Inventory</h1>
                        {phones.map(i => (
                            <Phone
                                key={i.id}
                                {...i}
                                onUpdate={(id, d) => handleUpdate(id, d, 'phones', setPhones)}
                                onDelete={refreshData}
                            />
                        ))}
                    </div>
                ) : <Navigate to="/login" />} />

                <Route path="/add-phone" element={token ? <PhoneForm onAdded={(n) => { setPhones([...laptops, n]); navigate('/phones'); }} /> : <Navigate to="/login" />} />

                <Route path="/tickets" element={token ? (
                    <div>
                        <h1>Ticket Inventory</h1>
                        {tickets.map(i => (
                            <Ticket
                                key={i.id}
                                {...i}
                                onUpdate={(id, d) => handleUpdate(id, d, 'tickets', setTickets)}
                                onDelete={refreshData}
                            />
                        ))}
                    </div>
                ) : <Navigate to="/login" />} />

                <Route path="/add-ticket" element={token ? <TicketForm onAdded={(n) => { setTickets([...tickets, n]); navigate('/tickets'); }} /> : <Navigate to="/login" />} />


            </Routes>
        </div>
    );
}

export default App;