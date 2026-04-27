import React, { useEffect, useMemo, useState } from 'react';
import Icon from '../components/Icon';
import MiniChart from '../components/MiniChart';
import { apiRequest } from '../utils/api';

const formatSource = (source) => {
  if (!source) return 'Other';
  const key = String(source).trim().toLowerCase();
  const map = {
    blog: 'Blog',
    career: 'Career',
    other: 'Other',
    footer: 'Footer',
    popup: 'Popup',
    social: 'Social',
    referral: 'Referral',
  };
  if (map[key]) return map[key];
  return source.charAt(0).toUpperCase() + source.slice(1);
};

const mapSubscriber = (subscriber) => {
  const createdAt = subscriber.createdAt || subscriber.date || '';
  const date = createdAt ? new Date(createdAt).toISOString().slice(0, 10) : '';
  return {
    id: subscriber._id || subscriber.id,
    email: subscriber.email || '',
    source: formatSource(subscriber.source),
    date,
    createdAt: createdAt || null,
  };
};

const buildWeekCounts = (subscribers) => {
  const counts = Array(7).fill(0);
  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - day);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 7);

  subscribers.forEach((sub) => {
    if (!sub.createdAt && !sub.date) return;
    const d = new Date(sub.createdAt || sub.date);
    if (Number.isNaN(d.getTime())) return;
    if (d >= monday && d < sunday) {
      const idx = Math.floor((d - monday) / (24 * 60 * 60 * 1000));
      if (idx >= 0 && idx < 7) counts[idx] += 1;
    }
  });

  return counts;
};

const Newsletter = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weekCounts, setWeekCounts] = useState(Array(7).fill(0));

  const bySource = useMemo(() => {
    const list = data.subscribers || [];
    return list.reduce((acc, s) => { acc[s.source] = (acc[s.source] || 0) + 1; return acc; }, {});
  }, [data.subscribers]);

  const export_csv = () => {
    const list = data.subscribers || [];
    const csv = ['Email,Source,Date', ...list.map(s => `${s.email},${s.source},${s.date}`)].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'subscribers.csv';
    a.click();
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiRequest('/api/newsletter?limit=500', { method: 'GET' });
      const subs = (response?.data?.subscribers || []).map(mapSubscriber);
      setData((d) => ({ ...d, subscribers: subs }));
      setWeekCounts(buildWeekCounts(subs));
    } catch (err) {
      setError(err.message || 'Failed to load subscribers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    setWeekCounts(buildWeekCounts(data.subscribers || []));
  }, [data.subscribers]);

  const totalSubscribers = (data.subscribers || []).length;
  const weekTotal = weekCounts.reduce((sum, val) => sum + val, 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">â€º</span><span className="current">Newsletter</span></div>
          <div className="page-title">Subscribers</div>
          <div className="page-subtitle">{totalSubscribers} total subscribers</div>
        </div>
        <button className="btn btn-primary" onClick={export_csv}><Icon name="download" size={13} /> Export CSV</button>
      </div>
      {loading && (
        <div className="alert" style={{ marginBottom: 16, background: 'rgba(59,130,246,0.12)', color: '#93c5fd', padding: '10px 14px', borderRadius: 10 }}>
          Loading subscribers...
        </div>
      )}
      {error && (
        <div className="alert" style={{ marginBottom: 16, background: 'rgba(239,68,68,0.12)', color: '#f87171', padding: '10px 14px', borderRadius: 10 }}>
          {error}
        </div>
      )}
      <div className="grid grid-2" style={{ gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div className="card-header"><span className="card-title">By Source</span></div>
          <div className="card-body">
            {Object.entries(bySource).map(([src, count]) => (
              <div key={src} style={{ marginBottom: 12 }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{src}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {count} Â· {totalSubscribers ? Math.round((count / totalSubscribers) * 100) : 0}%
                  </span>
                </div>
                <div className="progress"><div className="progress-bar" style={{ width: `${totalSubscribers ? (count / totalSubscribers) * 100 : 0}%` }} /></div>
              </div>
            ))}
            {totalSubscribers === 0 && (
              <div className="text-muted text-sm">No subscribers yet.</div>
            )}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Growth (This Week)</span></div>
          <div className="card-body">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, letterSpacing: -2 }}>+{weekTotal}</div>
            <div className="text-muted text-sm mb-4">new subscribers this week</div>
            <MiniChart data={weekCounts} active={Math.max(0, weekCounts.length - 1)} />
            <div className="flex justify-between mt-2">
              {['M','T','W','T','F','S','S'].map((d, i) => <span key={i} className="text-xs text-muted">{d}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">All Subscribers</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Email</th><th>Source</th><th>Subscribed Date</th></tr></thead>
            <tbody>
              {(data.subscribers || []).map(s => (
                <tr key={s.id}>
                  <td><span style={{ fontWeight: 500 }}>{s.email}</span></td>
                  <td><span className="badge badge-blue">{s.source}</span></td>
                  <td><span className="text-muted text-sm">{s.date}</span></td>
                </tr>
              ))}
              {totalSubscribers === 0 && (
                <tr>
                  <td colSpan="3">
                    <div className="text-muted text-sm" style={{ padding: '12px 0' }}>No subscribers found.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
