import React, { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

const NotificationToggle = ({ label, desc, defaultOn }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--black)' }}>{label}</div>
        <div className="text-xs text-muted mt-1">{desc}</div>
      </div>
      <label className="toggle"><input type="checkbox" checked={on} onChange={() => setOn(v => !v)} /><span className="toggle-slider" /></label>
    </div>
  );
};

const Settings = () => {
  const { user, logout, changePassword, authLoading } = useAuth();
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@example.com', role: 'Full Stack Developer', location: 'New York, USA' });
  const [pass, setPass] = useState({ old: '', new: '', confirm: '' });
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState('profile');
  const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') || 'light');
  const [accentColor, setAccentColor] = useState(localStorage.getItem('brandAccent') || '#233dfe');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  React.useEffect(() => {
    document.documentElement.style.setProperty('--blue', accentColor);
    document.documentElement.style.setProperty('--blue-glow', accentColor + '26'); // 15% opacity hex
    localStorage.setItem('brandAccent', accentColor);
  }, [accentColor]);

  React.useEffect(() => {
    if (themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (!user) return;
    setProfile(prev => ({
      ...prev,
      name: user.name || prev.name,
      email: user.email || prev.email,
    }));
  }, [user]);

  const saveProfile = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handlePasswordUpdate = async () => {
    setPassError('');
    setPassSuccess('');

    if (!pass.old || !pass.new) {
      setPassError('Please provide your current and new password.');
      return;
    }
    if (pass.new !== pass.confirm) {
      setPassError('New password and confirmation do not match.');
      return;
    }

    const result = await changePassword(pass.old, pass.new);
    if (!result.success) {
      setPassError(result.error || 'Unable to update password.');
      return;
    }

    setPass({ old: '', new: '', confirm: '' });
    setPassSuccess('Password updated successfully.');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: 'team', desc: 'Manage your personal details' },
    { id: 'security', label: 'Security & Login', icon: 'bookings', desc: 'Secure your account' },
    { id: 'notifications', label: 'Notifications', icon: 'bell', desc: 'Control your email alerts' },
    { id: 'appearance', label: 'Appearance', icon: 'dashboard', desc: 'Customize the UI theme' }
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: 32 }}>
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">â€º</span><span className="current">Settings</span></div>
          <div className="page-title">Account Settings</div>
          <div className="page-subtitle">Manage your account preferences and customize your workspace</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div className="card" style={{ padding: '12px' }}>
            {tabs.map(t => (
              <div 
                key={t.id} 
                onClick={() => setTab(t.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', 
                  borderRadius: 10, cursor: 'pointer', marginBottom: 4, transition: 'all 0.2s',
                  background: tab === t.id ? 'var(--surface2)' : 'transparent',
                  border: tab === t.id ? '1px solid var(--border)' : '1px solid transparent',
                  boxShadow: tab === t.id ? '0 2px 8px rgba(0,0,0,0.02)' : 'none'
                }}
              >
                <div style={{ 
                  width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: tab === t.id ? 'var(--blue)' : 'var(--surface2)',
                  color: tab === t.id ? 'var(--white)' : 'var(--text-muted)',
                  transition: 'all 0.2s'
                }}>
                  <Icon name={t.icon} size={15} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: tab === t.id ? 'var(--blue)' : 'var(--black)' }}>{t.label}</div>
                  <div className="text-xs text-muted" style={{ marginTop: 2 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 320 }}>
          {tab === 'profile' && (
            <div className="flex-col gap-4">
              <div className="card">
                <div style={{ height: 120, background: coverPreview ? `url(${coverPreview}) center/cover` : 'linear-gradient(135deg, var(--blue) 0%, #7c3aed 100%)', position: 'relative' }}>
                  <label className="btn btn-sm btn-ghost" style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="edit" size={12} /> Change Cover
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverChange} />
                  </label>
                </div>
                <div style={{ padding: '0 24px 24px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, marginTop: -40 }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                         {avatarPreview ? (
                           <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                         ) : (
                           <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: 'white' }}>AU</div>
                         )}
                      </div>
                      <label style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--blue)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <Icon name="edit" size={12} />
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                      </label>
                    </div>
                    <button className="btn btn-primary" onClick={saveProfile}>
                      {saved ? <><Icon name="check" size={13} /> Saved</> : 'Save Changes'}
                    </button>
                  </div>
                  
                  <div className="grid grid-2" style={{ gap: 20 }}>
                    <div className="form-group mb-0">
                      <label className="form-label">Full Name</label>
                      <input className="form-control" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label">Email Address</label>
                      <input className="form-control" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label">Job Role</label>
                      <input className="form-control" value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })} />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label">Location</label>
                      <input className="form-control" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><span className="card-title">Profile Visibility</span></div>
                <div className="card-body" style={{ padding: 0 }}>
                  <NotificationToggle label="Public Profile" desc="Make your profile visible to everyone" defaultOn={true} />
                  <NotificationToggle label="Show Email" desc="Allow others to see your email address" defaultOn={false} />
                </div>
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="flex-col gap-4">
              <div className="card">
                <div className="card-header">
                  <div>
                    <span className="card-title">Update Password</span>
                    <div className="text-xs text-muted mt-1">Ensure your account is using a long, random password to stay secure.</div>
                  </div>
                </div>
                <div className="card-body">
                  <div style={{ maxWidth: 400 }}>
                    <div className="form-group">
                      <label className="form-label">Current Password</label>
                      <input type="password" className="form-control" value={pass.old} onChange={e => setPass({ ...pass, old: e.target.value })} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-control" value={pass.new} onChange={e => setPass({ ...pass, new: e.target.value })} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 24 }}>
                      <label className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" value={pass.confirm} onChange={e => setPass({ ...pass, confirm: e.target.value })} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                    </div>
                    {passError && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 12 }}>{passError}</div>}
                    {passSuccess && <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#34d399', marginBottom: 12 }}>{passSuccess}</div>}
                    <button className="btn btn-primary" onClick={handlePasswordUpdate} disabled={authLoading}>
                      {authLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div>
                     <span className="card-title" style={{ color: '#dc2626' }}>Danger Zone</span>
                     <div className="text-xs text-muted mt-1">Irreversible and destructive actions</div>
                  </div>
                </div>
                <div className="card-body flex items-center justify-between">
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--black)' }}>Sign Out</div>
                    <div className="text-xs text-muted mt-1">Log out of this browser session immediately.</div>
                  </div>
                  <button className="btn btn-danger" onClick={logout}><Icon name="logout" size={14} /> Sign Out</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <div>
                  <span className="card-title">Email Notifications</span>
                  <div className="text-xs text-muted mt-1">Choose what updates you want to receive in your inbox.</div>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <NotificationToggle label="New Applications" desc="When a candidate submits a job application" defaultOn={true} />
                <NotificationToggle label="Booking Confirmations" desc="When a new service booking is confirmed" defaultOn={true} />
                <NotificationToggle label="Unread Inquiries" desc="Daily summary of unread contact forms" defaultOn={false} />
                <NotificationToggle label="Newsletter Signups" desc="When a new user subscribes to the newsletter" defaultOn={true} />
                <NotificationToggle label="Team Updates" desc="When a team member changes status or role" defaultOn={false} />
              </div>
            </div>
          )}

          {tab === 'appearance' && (
            <div className="flex-col gap-4">
              <div className="card">
                <div className="card-header"><span className="card-title">Theme Preference</span></div>
                <div className="card-body">
                  <div className="grid grid-3" style={{ gap: 16 }}>
                    {[{ id: 'light', label: 'Light Mode', bg: '#f8f9fc', fg: '#ffffff', b: '#e2e8f0' }, 
                      { id: 'dark', label: 'Dark Mode', bg: '#0f172a', fg: '#1e293b', b: '#334155' }, 
                      { id: 'system', label: 'System Match', bg: 'linear-gradient(135deg, #f8f9fc 50%, #0f172a 50%)', fg: '#cbd5e1', b: '#94a3b8' }].map(m => (
                      <div 
                        key={m.id} 
                        onClick={() => setThemeMode(m.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ 
                          height: 100, borderRadius: 12, background: m.bg, border: `2px solid ${themeMode === m.id ? 'var(--blue)' : 'var(--border)'}`,
                          display: 'flex', flexDirection: 'column', gap: 6, padding: 12, marginBottom: 12,
                          boxShadow: themeMode === m.id ? '0 4px 12px var(--blue-glow)' : 'none', transition: 'all 0.2s'
                        }}>
                          <div style={{ width: '40%', height: 8, borderRadius: 4, background: m.b }} />
                          <div style={{ width: '100%', flex: 1, borderRadius: 6, background: m.fg, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                        </div>
                        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 13, color: themeMode === m.id ? 'var(--blue)' : 'var(--black)' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><span className="card-title">Brand Accent</span></div>
                <div className="card-body">
                  <div className="text-sm text-dim mb-4">Choose your dashboard's primary accent color.</div>
                  <div className="flex gap-4">
                    {['#233dfe', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'].map(c => (
                      <div 
                        key={c} 
                        onClick={() => setAccentColor(c)}
                        style={{ 
                          width: 44, height: 44, borderRadius: '50%', background: c, cursor: 'pointer', 
                          border: accentColor === c ? '3px solid var(--surface)' : '3px solid transparent', 
                          boxShadow: accentColor === c ? `0 0 0 2px var(--border), 0 4px 12px ${c}66` : '0 2px 8px rgba(0,0,0,0.1)', 
                          transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        {accentColor === c && <Icon name="check" size={16} color="white" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
