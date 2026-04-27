import React, { useMemo, useState, useEffect } from 'react';
import './styles/admin.css';
import mockData from './utils/mockData';
import { apiRequest } from './utils/api';
import { mapJobFromApi } from './utils/jobMapper';
import { mapApplicationFromApi } from './utils/applicationMapper';
import { mapBookingFromApi } from './utils/bookingMapper';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import Team from './pages/Team';
import Bookings from './pages/Bookings';
import Inquiries from './pages/Inquiries';
import Blog from './pages/Blog';
import Newsletter from './pages/Newsletter';
import Settings from './pages/Settings';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [data, setData] = useState(mockData);
  const [dashboard, setDashboard] = useState({
    stats: null,
    recentApplications: [],
    recentInquiries: [],
    recentBookings: [],
  });
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState('');
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState('');
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState('');
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      if (!user) return;
      setDashboardLoading(true);
      setDashboardError('');
      try {
        const response = await apiRequest('/api/dashboard', { method: 'GET' });
        const payload = response?.data || {};
        if (!ignore) {
          setDashboard({
            stats: payload.stats || null,
            recentApplications: payload.recentApplications || [],
            recentInquiries: payload.recentInquiries || [],
            recentBookings: payload.recentBookings || [],
          });
        }
      } catch (err) {
        if (!ignore) {
          setDashboardError(err?.message || 'Unable to load dashboard.');
        }
      } finally {
        if (!ignore) {
          setDashboardLoading(false);
        }
      }
    };

    loadDashboard();
    return () => {
      ignore = true;
    };
  }, [user]);

  useEffect(() => {
    let ignore = false;

    const loadJobs = async () => {
      if (!user) return;
      setJobsLoading(true);
      setJobsError('');
      try {
        const response = await apiRequest('/api/jobs?limit=200', { method: 'GET' });
        const jobs = (response?.data?.jobs || []).map(mapJobFromApi);
        if (!ignore) {
          setData((prev) => ({ ...prev, jobs }));
        }
      } catch (err) {
        if (!ignore) {
          setJobsError(err?.message || 'Unable to load jobs.');
        }
      } finally {
        if (!ignore) {
          setJobsLoading(false);
        }
      }
    };

    loadJobs();
    return () => {
      ignore = true;
    };
  }, [user]);

  useEffect(() => {
    let ignore = false;

    const loadBookings = async () => {
      if (!user) return;
      setBookingsLoading(true);
      setBookingsError('');
      try {
        const response = await apiRequest('/api/bookings?limit=200', { method: 'GET' });
        const bookings = (response?.data?.bookings || []).map(mapBookingFromApi);
        if (!ignore) {
          setData((prev) => ({ ...prev, bookings }));
        }
      } catch (err) {
        if (!ignore) {
          setBookingsError(err?.message || 'Unable to load bookings.');
        }
      } finally {
        if (!ignore) {
          setBookingsLoading(false);
        }
      }
    };

    loadBookings();
    return () => {
      ignore = true;
    };
  }, [user]);

  useEffect(() => {
    let ignore = false;

    const loadApplications = async () => {
      if (!user) return;
      setApplicationsLoading(true);
      setApplicationsError('');
      try {
        const response = await apiRequest('/api/applications?limit=200', { method: 'GET' });
        const applications = (response?.data?.applications || []).map(mapApplicationFromApi);
        if (!ignore) {
          setData((prev) => ({ ...prev, applications }));
        }
      } catch (err) {
        if (!ignore) {
          setApplicationsError(err?.message || 'Unable to load applications.');
        }
      } finally {
        if (!ignore) {
          setApplicationsLoading(false);
        }
      }
    };

    loadApplications();
    return () => {
      ignore = true;
    };
  }, [user]);

  const notifications = [
    { text: 'Casey Williams applied for Senior React Developer', time: '2m ago' },
    { text: 'New inquiry from Chris Evans: Partnership Opportunity', time: '18m ago' },
    { text: 'GlobalFirm booking confirmed for Mar 28', time: '1h ago' },
    { text: 'Blog post reached 6,000 views', time: '3h ago' },
  ];

  const navItems = useMemo(() => ([
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', section: 'main' },
    { id: 'jobs', icon: 'jobs', label: 'Jobs', badge: data.jobs.filter(j => j.status === 'active').length, section: 'main' },
    { id: 'applications', icon: 'applications', label: 'Applications', badge: data.applications.filter(a => a.status === 'pending').length, section: 'main' },
    { id: 'team', icon: 'team', label: 'Team', section: 'main' },
    { id: 'bookings', icon: 'bookings', label: 'Bookings', badge: data.bookings.filter(b => b.status === 'pending').length, section: 'manage' },
    { id: 'inquiries', icon: 'inquiries', label: 'Inquiries', badge: data.inquiries.filter(i => !i.read).length, section: 'manage' },
    { id: 'blog', icon: 'blog', label: 'Blog', section: 'content' },
    { id: 'newsletter', icon: 'newsletter', label: 'Newsletter', section: 'content' },
    { id: 'settings', icon: 'settings', label: 'Settings', section: 'account' },
  ]), [data]);

  const sections = useMemo(() => ([
    { id: 'main', label: 'Main' },
    { id: 'manage', label: 'Manage' },
    { id: 'content', label: 'Content' },
    { id: 'account', label: 'Account' },
  ]), []);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            data={data}
            dashboard={dashboard}
            dashboardLoading={dashboardLoading}
            dashboardError={dashboardError}
          />
        );
      case 'jobs': return <Jobs data={data} setData={setData} jobsLoading={jobsLoading} jobsError={jobsError} />;
      case 'applications': return (
        <Applications
          data={data}
          setData={setData}
          applicationsLoading={applicationsLoading}
          applicationsError={applicationsError}
        />
      );
      case 'team': return <Team data={data} setData={setData} />;
      case 'bookings':
        return (
          <Bookings
            data={data}
            setData={setData}
            bookingsLoading={bookingsLoading}
            bookingsError={bookingsError}
          />
        );
      case 'inquiries': return <Inquiries data={data} setData={setData} />;
      case 'blog': return <Blog data={data} setData={setData} />;
      case 'newsletter': return <Newsletter data={data} setData={setData} />;
      case 'settings': return <Settings />;
      default:
        return (
          <Dashboard
            data={data}
            dashboard={dashboard}
            dashboardLoading={dashboardLoading}
            dashboardError={dashboardError}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="login-page">
        <div className="bg-mesh" />
        <div className="login-card" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>Loading admin console...</div>
          <div className="text-muted text-sm mt-2">Checking your session</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="bg-mesh" />
        <Login />
      </>
    );
  }

  return (
    <>
      <div className="bg-mesh" />
      <Layout
        page={page}
        setPage={setPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        showNotif={showNotif}
        setShowNotif={setShowNotif}
        navItems={navItems}
        sections={sections}
        data={data}
        notifications={notifications}
        user={user}
      >
        {renderPage()}
      </Layout>
    </>
  );
}

export default App;
