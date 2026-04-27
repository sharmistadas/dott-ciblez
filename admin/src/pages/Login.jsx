import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    const result = await login(email, pass);
    if (!result.success) setErr(result.error || 'Invalid credentials.');
  };

  return (
    <div className="login-page">
      <div className="bg-mesh" />
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[240, 400, 600].map((s, i) => (
          <div key={i} className="login-ring" style={{ width: s, height: s, left: `calc(50% - ${s / 2}px)`, top: `calc(50% - ${s / 2}px)`, opacity: 0.08 + i * 0.03 }} />
        ))}
      </div>
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, background: 'var(--blue)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 28px var(--blue-glow)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>A</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Welcome back</div>
          <div className="text-muted text-sm mt-1">Sign in to your admin panel</div>
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} required />
          </div>
          {err && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 16 }}>{err}</div>}
          <button type="submit" className="btn btn-primary w-full" style={{ height: 44, fontSize: 14, justifyContent: 'center' }} disabled={authLoading}>
            {authLoading ? <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>âŸ³</span> : 'Sign In'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 20, padding: '12px', background: 'var(--surface2)', borderRadius: 10, border: '1px solid var(--border)' }}>
          <div className="text-muted text-xs" style={{ letterSpacing: 0.3 }}>Admin login</div>
          <div className="text-sm mt-1" style={{ fontFamily: 'monospace', color: 'var(--blue)' }}>Use your admin credentials</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
