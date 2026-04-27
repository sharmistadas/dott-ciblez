const STORAGE_KEYS = {
    JOBS: 'admin_jobs',
    APPLICATIONS: 'admin_apps',
    TEAM: 'admin_team',
    BOOKINGS: 'admin_bookings',
    INQUIRIES: 'admin_inquiries',
    BLOG: 'admin_blog',
    SUBSCRIBERS: 'admin_subs',
    PROFILE: 'admin_profile'
};

export const getInitialData = () => {
    const defaultJobs = [
        { id: 1, title: 'Frontend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', requirements: ['React', 'JS'], responsibilities: ['Build UI'], active: true, createdAt: new Date().toISOString() },
        { id: 2, title: 'Backend Engineer', department: 'Engineering', location: 'NYC', type: 'Full-time', requirements: ['Node.js'], responsibilities: ['API'], active: true, createdAt: new Date(Date.now() - 86400000).toISOString() }
    ];
    const defaultApps = [
        { id: 1, jobId: 1, applicantName: 'John Doe', email: 'john@example.com', status: 'pending', appliedAt: new Date().toISOString() },
        { id: 2, jobId: 2, applicantName: 'Jane Smith', email: 'jane@example.com', status: 'reviewed', appliedAt: new Date().toISOString() }
    ];
    const defaultTeam = [
        { id: 1, name: 'Alice Brown', role: 'Frontend Lead', category: 'Development', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', active: true, social: { twitter: '#', linkedin: '#' }, order: 1 },
        { id: 2, name: 'Bob Johnson', role: 'Backend Dev', category: 'Development', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', active: true, social: {}, order: 2 }
    ];
    const defaultBookings = [
        { id: 1, customer: 'Mike Lee', service: 'Consulting', date: '2025-02-10', status: 'pending', read: false },
        { id: 2, customer: 'Sarah Connor', service: 'Workshop', date: '2025-02-15', status: 'confirmed', read: true }
    ];
    const defaultInquiries = [
        { id: 1, name: 'Chris Evans', email: 'chris@example.com', subject: 'Pricing', message: 'Need quote', date: new Date().toISOString(), read: false },
        { id: 2, name: 'Natalie Portman', email: 'natalie@example.com', subject: 'Partnership', message: 'Let’s collaborate', date: new Date().toISOString(), read: true }
    ];
    const defaultBlog = [
        { id: 1, title: 'Welcome to Admin', content: '<p>First blog post</p>', category: 'News', featured: true, trending: false, image: '', createdAt: new Date().toISOString() }
    ];
    const defaultSubscribers = [
        { id: 1, email: 'user1@test.com', source: 'career', subscribedAt: new Date().toISOString() },
        { id: 2, email: 'user2@test.com', source: 'blog', subscribedAt: new Date().toISOString() }
    ];

    const load = (key, def) => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : def;
    };

    return {
        jobs: load(STORAGE_KEYS.JOBS, defaultJobs),
        applications: load(STORAGE_KEYS.APPLICATIONS, defaultApps),
        team: load(STORAGE_KEYS.TEAM, defaultTeam),
        bookings: load(STORAGE_KEYS.BOOKINGS, defaultBookings),
        inquiries: load(STORAGE_KEYS.INQUIRIES, defaultInquiries),
        blogPosts: load(STORAGE_KEYS.BLOG, defaultBlog),
        subscribers: load(STORAGE_KEYS.SUBSCRIBERS, defaultSubscribers),
        profile: load(STORAGE_KEYS.PROFILE, { name: 'Admin User', email: 'admin@example.com' })
    };
};

export const saveToLocal = (key, data) => {
    localStorage.setItem(`admin_${key}`, JSON.stringify(data));
};