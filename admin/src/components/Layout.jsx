import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children, page, setPage, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed, showNotif, setShowNotif, navItems, sections, data, notifications, user }) => {
  return (
    <div className="app">
      <Sidebar
        page={page}
        setPage={setPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        navItems={navItems}
        sections={sections}
        data={data}
      />

      <div className={`main${sidebarCollapsed ? ' full' : ''}`}>
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          showNotif={showNotif}
          setShowNotif={setShowNotif}
          setPage={setPage}
          notifications={notifications}
          navItems={navItems}
          user={user}
        />

        <div className="page" onClick={() => showNotif && setShowNotif(false)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
