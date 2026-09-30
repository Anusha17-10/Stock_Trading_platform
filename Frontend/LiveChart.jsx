import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const socket = io('http://localhost:4000');

export default function LiveChart() {
  const [priceHistory, setPriceHistory] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(150.00);

  useEffect(() => {
    socket.on('stock_tick', (data) => {
      setCurrentPrice(data.price);
      setPriceHistory((prev) => {
        const newHistory = [...prev, data];
        if (newHistory.length > 20) newHistory.shift(); 
        return newHistory;
      });
    });
    return () => socket.off('stock_tick');
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--text-main)', margin: '0 0 20px 0' }}>
        AAPL Live Price: <span style={{ color: 'var(--brand-primary)' }}>${currentPrice.toFixed(2)}</span>
      </h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={priceHistory}>
            <XAxis dataKey="time" stroke="var(--text-muted)" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="var(--text-muted)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} 
              itemStyle={{ color: 'var(--brand-primary)' }}
            />
            <Line type="monotone" dataKey="price" stroke="var(--brand-primary)" strokeWidth={2} isAnimationActive={false} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}