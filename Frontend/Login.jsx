import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = {
      username: email.split('@')[0] || 'student_trader',
      email: email,
      tier: 'Developer Account'
    };
    onLogin(mockUser);
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 60px)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--text-main)' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>Sign in to your trading simulator</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input type="email" required placeholder="trader@alliance.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ paddingLeft: '40px' }} />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input type="password" required placeholder="••••••••" className="input-field" style={{ paddingLeft: '40px' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
            Login <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}