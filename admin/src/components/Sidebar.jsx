import React from 'react';
import Icon from './Icon';

const Sidebar = ({ page, setPage, sidebarOpen, setSidebarOpen, sidebarCollapsed, navItems, sections, data }) => {
  return (
    <>
      {/* Sidebar overlay (mobile) */}
      <div className={`sidebar-overlay${sidebarOpen ? ' show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <div className={`sidebar${sidebarOpen ? ' open' : ''}${sidebarCollapsed ? ' collapsed' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">A</div>
          <div className="logo-text">AdminPanel</div>
          <div className="logo-badge">Pro</div>
        </div>
        {sections.map(sec => {
          const items = navItems.filter(n => n.section === sec.id);
          return (
            <div key={sec.id} className="sidebar-section">
              <div className="sidebar-section-label">{sec.label}</div>
              {items.map(item => (
                <div key={item.id} className={`nav-item${page === item.id ? ' active' : ''}`}
                  onClick={() => { setPage(item.id); setSidebarOpen(false); }}>
                  <div className="nav-icon"><Icon name={item.icon} size={15} /></div>
                  {item.label}
                  {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
                </div>
              ))}
            </div>
          );
        })}
        <div className="sidebar-footer">
          <div className="user-card" onClick={() => setPage('settings')}>
            <div className="user-avatar">AU</div>
            <div>
              <div className="user-name">Admin User</div>
              <div className="user-role">Super Admin</div>
            </div>
            <div className="user-dots">⋯</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;