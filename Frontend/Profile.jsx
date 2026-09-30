import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2 style={{ color: 'var(--text-main)' }}>You are not logged in.</h2>
        <button onClick={() => navigate('/login')} className="btn-primary" style={{ margin: '20px auto' }}>Go to Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px' }} className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Account Settings</h2>
        <button onClick={handleLogout} className="btn-danger" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <LogOut size={16} style={{ marginRight: '5px' }} /> Logout
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <User color="var(--text-muted)" />
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Username</p>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-main)' }}>{user.username}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Mail color="var(--text-muted)" />
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</p>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-main)' }}>{user.email}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Shield color="var(--text-muted)" />
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Account Tier</p>
            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--brand-primary)', fontSize: '1.1rem' }}>{user.tier}</p>
          </div>
        </div>
      </div>
    </div>
  );
}