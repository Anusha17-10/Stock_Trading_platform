import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-deep)' }}>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile user={user} onLogout={() => setUser(null)} />} />
        </Routes>
      </div>
    </Router>
  );
}