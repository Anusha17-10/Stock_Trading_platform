import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, User, TrendingUp, LogIn } from 'lucide-react';

export default function Navbar({ user }) {
  const location = useLocation();

  const getStyle = (path) => ({
    display: 'flex', alignItems: 'center', gap: '8px',
    color: location.pathname === path ? 'var(--brand-primary)' : 'var(--text-muted)',
    textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s'
  });

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '15px 30px', 
      backgroundColor: 'var(--bg-panel)', 
      borderBottom: '1px solid var(--border-color)' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
        <TrendingUp color="var(--brand-primary)" />
        <span style={{ color: 'var(--text-main)' }}>TradePro</span>
      </div>
      
      <div style={{ display: 'flex', gap: '25px' }}>
        <Link to="/" style={getStyle('/')}><Home size={18}/> Home</Link>
        
        {user ? (
          <>
            <Link to="/dashboard" style={getStyle('/dashboard')}><LayoutDashboard size={18}/> Dashboard</Link>
            <Link to="/profile" style={getStyle('/profile')}><User size={18}/> {user.username}</Link>
          </>
        ) : (
          <Link to="/login" style={getStyle('/login')}><LogIn size={18}/> Login</Link>
        )}
      </div>
    </nav>
  );
}