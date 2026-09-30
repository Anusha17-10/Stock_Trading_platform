import { useState, useEffect } from 'react';
import { DollarSign, Activity, List, Clock } from 'lucide-react';
import LiveChart from '../LiveChart';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState({ cashBalance: 10000, holdings: [] });
  const [shares, setShares] = useState(1);
  
  const watchlist = [
    { ticker: 'AAPL', price: 150.25, change: '+1.2%' },
    { ticker: 'TSLA', price: 202.10, change: '-0.5%' },
    { ticker: 'MSFT', price: 330.50, change: '+0.8%' },
    { ticker: 'AMZN', price: 125.00, change: '+2.1%' }
  ];

  useEffect(() => {
    fetch('http://localhost:4000/api/portfolio')
      .then(res => res.json())
      .then(data => setPortfolio(data))
      .catch(err => console.error(err));
  }, []);

  const handleTrade = async (type) => {
    try {
      const res = await fetch('http://localhost:4000/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: 'AAPL', shares: Number(shares), type: type })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Trade failed");
      setPortfolio(data.portfolio);
    } catch (err) {
      alert("Network error.");
    }
  };

  const totalHoldingsValue = portfolio.holdings.reduce((acc, h) => acc + (h.shares * 150), 0);
  const totalValue = portfolio.cashBalance + totalHoldingsValue;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: 'calc(100vh - 60px)' }}>
      
      {/* LEFT SIDEBAR */}
      <div style={{ borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--bg-panel)', padding: '20px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '20px', textTransform: 'uppercase' }}>
          <List size={18} /> Watchlist
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {watchlist.map((stock, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontWeight: 'bold', display: 'block', color: 'var(--text-main)' }}>{stock.ticker}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>NYSE</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontWeight: '500', color: 'var(--text-main)' }}>${stock.price.toFixed(2)}</span>
                <span style={{ fontSize: '0.85rem', color: stock.change.startsWith('+') ? 'var(--profit-green)' : 'var(--loss-red)' }}>
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}><DollarSign size={16}/> Total Value</p>
            <h2 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-main)' }}>${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Activity size={16}/> Available Margin</p>
            <h2 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--brand-primary)' }}>${portfolio.cashBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16}/> Market Status</p>
            <h2 style={{ margin: '5px 0 0 0', fontSize: '1.4rem', color: 'var(--profit-green)' }}>OPEN</h2>
          </div>
        </div>

        {/* CHART */}
        <div className="card" style={{ padding: '20px' }}>
          <LiveChart />
        </div>

        {/* ORDER & HOLDINGS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', color: 'var(--text-main)' }}>Execute Trade</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Ticker Symbol</label>
              <input type="text" value="AAPL" disabled className="input-field" style={{ opacity: 0.7 }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Quantity (Shares)</label>
              <input type="number" value={shares} onChange={(e) => setShares(e.target.value)} min="1" className="input-field" />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleTrade('BUY')} className="btn-success" style={{ flex: 1 }}>BUY</button>
              <button onClick={() => handleTrade('SELL')} className="btn-danger" style={{ flex: 1 }}>SELL</button>
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', color: 'var(--text-main)' }}>Current Positions</h3>
            {portfolio.holdings.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>No active positions.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ paddingBottom: '10px' }}>Asset</th>
                    <th style={{ paddingBottom: '10px' }}>Shares</th>
                    <th style={{ paddingBottom: '10px' }}>Avg Cost</th>
                    <th style={{ paddingBottom: '10px' }}>Current Value</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.holdings.map((h, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '15px 0', fontWeight: 'bold', color: 'var(--text-main)' }}>{h.ticker}</td>
                      <td style={{ padding: '15px 0', color: 'var(--text-main)' }}>{h.shares}</td>
                      <td style={{ padding: '15px 0', color: 'var(--text-main)' }}>$150.00</td>
                      <td style={{ padding: '15px 0', color: 'var(--profit-green)', fontWeight: '500' }}>${(h.shares * 150).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}