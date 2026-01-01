import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BookingPage } from './pages/BookingPage';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { PaymentFailure } from './pages/PaymentFailure';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:courtId" element={<BookingPage />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;