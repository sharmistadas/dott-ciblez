import React, { useMemo, useState } from 'react';
import Icon from './Icon';

const Topbar = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed, showNotif, setShowNotif, setPage, notifications, navItems, user }) => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const initials = useMemo(() => {
    if (!user?.name) return 'AU';
    const parts = user.name.trim().split(' ').filter(Boolean);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return `${first}${last}`.toUpperCase() || 'AU';
  }, [user]);

  const handleToggle = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const filtered = navItems ? navItems.filter(n => n.label.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div className="topbar" style={{ position: 'relative' }}>
      <button className="topbar-toggle" onClick={handleToggle}>
        <Icon name="menu" size={16} />
      </button>
      <div className="topbar-search" style={{ position: 'relative' }}>
        <span className="search-icon"><Icon name="search" size={13} /></span>
        <input 
          placeholder="Search anything..." 
          value={search}
          onChange={e => { setSearch(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        {showResults && search && (
          <div style={{ position: 'absolute', top: 48, left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)', zIndex: 100, overflow: 'hidden' }}>
             {filtered.length > 0 ? filtered.map(item => (
               <div 
                 key={item.id} 
                 style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderBottom: '1px solid var(--border)', transition: 'background 0.2s', background: 'var(--surface)' }} 
                 onClick={() => { setPage(item.id); setSearch(''); setShowResults(false); }}
                 onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                 onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
               >
                 <div style={{ color: 'var(--blue)' }}><Icon name={item.icon} size={14} /></div>
                 <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--black)' }}>{item.label}</div>
                 <div style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{item.section}</div>
               </div>
             )) : (
               <div style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>No results found.</div>
             )}
          </div>
        )}
      </div>
      <div className="topbar-actions">
        <div className="topbar-btn" onClick={() => setShowNotif(!showNotif)}>
          <Icon name="bell" size={15} />
          <div className="notif-dot" />
        </div>
        <div className="topbar-btn"><Icon name="globe" size={15} /></div>
        <div className="topbar-avatar" onClick={() => setPage('settings')}>{initials}</div>
      </div>
      {showNotif && (
        <div className="notif-panel">
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>Notifications</span>
            <span className="badge badge-blue">{notifications.length} new</span>
          </div>
          {notifications.map((n, i) => (
            <div key={i} className="notif-item">
              <div className="notif-dot-indicator" />
              <div>
                <div className="notif-text">{n.text}</div>
                <div className="notif-time">{n.time}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 16px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12, color: 'var(--blue)', cursor: 'pointer', fontWeight: 600 }}>View all notifications</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
