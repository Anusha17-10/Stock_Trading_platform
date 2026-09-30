import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <div style={{ 
            display: 'inline-block', padding: '8px 16px', backgroundColor: 'rgba(56, 189, 248, 0.1)', 
            color: 'var(--brand-primary)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '20px' 
          }}>
            🚀 Trading Simulator v1.0
          </div>
          
          <h1 style={{ fontSize: '4.5rem', margin: '0 0 20px 0', lineHeight: '1.1', color: 'var(--text-main)' }}>
            Master the Markets. <br />
            <span className="text-gradient">Zero Risk.</span>
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Practice stock trading with real-time simulations and a $10,000 paper trading account. 
            Test your strategies before you risk real money.
          </p>
          
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', margin: '0 auto' }}>
              Get Started <ArrowRight size={20} />
            </button>
          </Link>
        </motion.div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '20px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '0 20px' }}>
        {[
          { icon: <Zap color="var(--brand-primary)" size={24} />, title: 'Real-Time Data', desc: 'Experience live price fluctuations and execute trades instantly with our WebSocket-powered engine.' },
          { icon: <BarChart2 color="var(--profit-green)" size={24} />, title: 'Portfolio Analytics', desc: 'Track your active positions, available margin, and total net worth in a clean, professional interface.' },
          { icon: <Shield color="var(--loss-red)" size={24} />, title: 'Risk-Free Environment', desc: 'Start with a $10,000 mock balance. Make mistakes, learn the market mechanics, and grow your skills safely.' }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            className="card"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--bg-hover)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              {feature.icon}
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>{feature.title}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.5' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}