const mockData = {
  jobs: [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', status: 'active', applicants: 34, posted: '2025-03-10', salary: '$120k - $150k', description: 'Build scalable web applications using React, Node.js and modern cloud tech.' },
    { id: 2, title: 'Product Designer', department: 'Design', location: 'Dubai', type: 'Full-time', status: 'active', applicants: 21, posted: '2025-03-12', salary: '$90k - $120k', description: 'Lead the UI/UX design process for our core enterprise products.' },
    { id: 3, title: 'Marketing Lead', department: 'Marketing', location: 'Bhubaneswar', type: 'Contract', status: 'active', applicants: 15, posted: '2025-03-14', salary: '$80k - $110k', description: 'Drive growth marketing strategies and user acquisition campaigns.' },
    { id: 4, title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', status: 'inactive', applicants: 8, posted: '2025-02-28', salary: '$110k - $140k', description: 'Automate infrastructure deployment and manage AWS cloud environments.' },
    { id: 5, title: 'Content Strategist', department: 'Marketing', location: 'Austin', type: 'Part-time', status: 'active', applicants: 12, posted: '2025-03-15', salary: '$60k - $80k', description: 'Develop comprehensive content strategies to boost organic reach.' },

    // New IT sector jobs
    { id: 6, title: 'Cloud Architect', department: 'IT Infrastructure', location: 'Remote', type: 'Full-time', status: 'active', applicants: 27, posted: '2025-03-09', salary: '$140k - $180k', description: 'Design and deploy resilient, highly available multi-cloud architectures.' },
    { id: 7, title: 'Data Scientist', department: 'Data Science', location: 'Dubai', type: 'Full-time', status: 'active', applicants: 42, posted: '2025-03-11', salary: '$130k - $160k', description: 'Leverage predictive modeling to extract actionable business insights.' },
    { id: 8, title: 'Security Analyst', department: 'Security', location: 'Bhubaneswar', type: 'Full-time', status: 'active', applicants: 19, posted: '2025-03-13', salary: '$95k - $125k', description: 'Monitor system security and perform regular threat assessments.' },
    { id: 9, title: 'AI/ML Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', status: 'active', applicants: 53, posted: '2025-03-07', salary: '$150k - $190k', description: 'Develop and train LLMs and computer vision models for production.' },
    { id: 10, title: 'Backend Developer (Node.js)', department: 'Engineering', location: 'Bhubaneswar', type: 'Full-time', status: 'active', applicants: 31, posted: '2025-03-08', salary: '$100k - $130k', description: 'Build lightning-fast backend microservices and RESTful APIs.' },
    { id: 11, title: 'Frontend Developer (Vue.js)', department: 'Engineering', location: 'Berlin', type: 'Full-time', status: 'active', applicants: 26, posted: '2025-03-06', salary: '$90k - $120k', description: 'Create dynamic and responsive user interfaces using Vue 3 and Nuxt.' },
    { id: 12, title: 'Full Stack Developer', department: 'Engineering', location: 'New York', type: 'Full-time', status: 'active', applicants: 48, posted: '2025-03-04', salary: '$115k - $145k', description: 'Deliver end-to-end features rapidly using modern TypeScript tech stacks.' },
    { id: 13, title: 'QA Automation Engineer', department: 'Engineering', location: 'Remote', type: 'Contract', status: 'active', applicants: 17, posted: '2025-03-12', salary: '$85k - $115k', description: 'Develop automated comprehensive test suites with Cypress and Selenium.' },
    { id: 14, title: 'IT Project Manager', department: 'IT Infrastructure', location: 'Dubai', type: 'Full-time', status: 'active', applicants: 22, posted: '2025-03-10', salary: '$105k - $135k', description: 'Lead cross-functional agile teams to deliver complex technical products.' },
    { id: 15, title: 'Cybersecurity Specialist', department: 'Security', location: 'Washington DC', type: 'Full-time', status: 'inactive', applicants: 9, posted: '2025-02-25', salary: '$110k - $140k', description: 'Implement uncompromising zero-trust security strategies.' },
    { id: 16, title: 'Database Administrator', department: 'IT Infrastructure', location: 'Dubai', type: 'Full-time', status: 'active', applicants: 14, posted: '2025-03-14', salary: '$95k - $130k', description: 'Optimize complex queries and maintain robust PostgreSQL clusters.' },
    { id: 17, title: 'UX Researcher', department: 'Design', location: 'San Francisco', type: 'Full-time', status: 'active', applicants: 23, posted: '2025-03-11', salary: '$95k - $130k', description: 'Conduct deep user interviews to drive evidence-based design decisions.' },
    { id: 18, title: 'Technical Writer', department: 'Marketing', location: 'Remote', type: 'Part-time', status: 'active', applicants: 11, posted: '2025-03-09', salary: '$70k - $90k', description: 'Draft crystal-clear API documentation and technical blog pieces.' },
    { id: 19, title: 'Salesforce Developer', department: 'Engineering', location: 'Austin', type: 'Full-time', status: 'active', applicants: 18, posted: '2025-03-07', salary: '$100k - $140k', description: 'Customize enterprise Salesforce environments using Apex and LWC.' },
    { id: 20, title: 'Network Engineer', department: 'IT Infrastructure', location: 'Chicago', type: 'Full-time', status: 'inactive', applicants: 7, posted: '2025-02-20', salary: '$90k - $125k', description: 'Maintain critical low-latency fiber network pathways.' }

  ],
  applications: [
    { id: 1, name: 'Alex Morgan', email: 'alex@email.com', job: 'Senior React Developer', status: 'shortlisted', date: '2025-03-16', score: 92 },
    { id: 2, name: 'Jordan Lee', email: 'jordan@email.com', job: 'Product Designer', status: 'reviewed', date: '2025-03-15', score: 78 },
    { id: 3, name: 'Sam Chen', email: 'sam@email.com', job: 'Marketing Lead', status: 'pending', date: '2025-03-17', score: 65 },
    { id: 4, name: 'Riley Park', email: 'riley@email.com', job: 'DevOps Engineer', status: 'rejected', date: '2025-03-14', score: 45 },
    { id: 5, name: 'Casey Williams', email: 'casey@email.com', job: 'Senior React Developer', status: 'pending', date: '2025-03-18', score: 88 },
    { id: 6, name: 'Drew Davis', email: 'drew@email.com', job: 'Content Strategist', status: 'shortlisted', date: '2025-03-16', score: 74 },
  ],
  team: [
    {
      id: 1,
      name: 'Deepak Kumar Mohanty',
      role: 'Chief Executive Officer',
      dept: 'Leadership',
      status: 'active',
      avatar: 'DK',
      color: '#3b82f6',
      image: 'https://randomuser.me/api/portraits/men/32.jpg', // or a placeholder
      category: 'Leadership',
      description: 'Visionary leader with 20+ years of experience in tech innovation. Passionate about building products that change lives.',
      social: {
        linkedin: 'https://linkedin.com/in/deepak',
        twitter: 'https://twitter.com/deepak',
        email: 'deepak@company.com'
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Lead Product Manager',
      dept: 'Product',
      status: 'active',
      avatar: 'SJ',
      color: '#8b5cf6',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      category: 'Product',
      description: 'Data-driven product strategist focused on delivering user-centric solutions. Leads cross-functional teams to launch innovative features.',
      social: {
        linkedin: 'https://linkedin.com/in/sarahj',
        twitter: 'https://twitter.com/sarahj',
        email: 'sarah@company.com'
      }
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Lead Engineer',
      dept: 'Engineering',
      status: 'active',
      avatar: 'MC',
      color: '#10b981',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      category: 'Engineering',
      description: 'Full-stack expert and performance enthusiast. Architects scalable systems and mentors junior developers.',
      social: {
        linkedin: 'https://linkedin.com/in/mikec',
        twitter: 'https://twitter.com/mikec',
        email: 'mike@company.com'
      }
    },
    {
      id: 4,
      name: 'Lisa Park',
      role: 'Lead UX Designer',
      dept: 'Design',
      status: 'active',
      avatar: 'LP',
      color: '#ec4899',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      category: 'Design',
      description: 'Crafting intuitive and beautiful digital experiences that delight users and achieve business outcomes.',
      social: {
        linkedin: 'https://linkedin.com/in/lisap',
        twitter: 'https://twitter.com/lisap',
        email: 'lisa@company.com'
      }
    },
    {
      id: 5,
      name: 'Emma Davis',
      role: 'Marketing Head',
      dept: 'Marketing',
      status: 'active',
      avatar: 'ED',
      color: '#f59e0b',
      image: 'https://randomuser.me/api/portraits/women/29.jpg',
      category: 'Marketing',
      description: 'Creative storyteller driving brand awareness and growth. Expert in digital marketing and community engagement.',
      social: {
        linkedin: 'https://linkedin.com/in/emmad',
        twitter: 'https://twitter.com/emmad',
        email: 'emma@company.com'
      }
    },
    {
      id: 6,
      name: 'James Brown',
      role: 'DevOps Engineer',
      dept: 'Engineering',
      status: 'offline',
      avatar: 'JB',
      color: '#ef4444',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      category: 'Engineering',
      description: 'Automation and infrastructure expert. Ensures 99.99% uptime and smooth CI/CD pipelines.',
      social: {
        linkedin: 'https://linkedin.com/in/jamesb',
        twitter: 'https://twitter.com/jamesb',
        email: 'james@company.com'
      }
    }
  ],
  bookings: [
    { id: 1, customer: 'Acme Corp', service: 'Web Development', date: '2025-03-25', time: '10:00 AM', status: 'confirmed', value: '$4,200' },
    { id: 2, customer: 'TechStart Inc', service: 'UI/UX Audit', date: '2025-03-26', time: '2:00 PM', status: 'pending', value: '$1,800' },
    { id: 3, customer: 'GlobalFirm', service: 'Branding Package', date: '2025-03-28', time: '11:00 AM', status: 'confirmed', value: '$6,500' },
    { id: 4, customer: 'Startup Hub', service: 'SEO Consultation', date: '2025-04-01', time: '3:30 PM', status: 'pending', value: '$900' },
    { id: 5, customer: 'MediaPro', service: 'App Development', date: '2025-04-03', time: '9:00 AM', status: 'cancelled', value: '$12,000' },
  ],
  inquiries: [
    { id: 1, name: 'Chris Evans', email: 'chris@co.com', subject: 'Partnership Opportunity', message: 'Hello, we are interested in exploring a strategic partnership...', date: '2025-03-17', read: false, priority: 'high' },
    { id: 2, name: 'Anna Smith', email: 'anna@co.com', subject: 'Custom Development Quote', message: 'We need a custom e-commerce solution built...', date: '2025-03-16', read: true, priority: 'medium' },
    { id: 3, name: 'Bob Johnson', email: 'bob@co.com', subject: 'Support Request', message: 'We are having issues with our current setup...', date: '2025-03-15', read: false, priority: 'low' },
    { id: 4, name: 'Zara Ahmed', email: 'zara@co.com', subject: 'Press Inquiry', message: 'We are writing an article about top tech agencies...', date: '2025-03-14', read: true, priority: 'medium' },
  ],
  blogPosts : [
    {
      id: 1,
      title: 'The Future of Web Development in 2025',
      category: 'Tech',
      cardCategory: 'WEB DEVELOPMENT',
      status: 'published',
      views: 4821,
      date: '2025-03-10',
      featured: true,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop',
      content: '<p>Exploring the latest trends...</p>',
      description: 'New techniques for reducing bundle sizes and improving First Contentful Paint in emerging market segments through advanced edge computing.'
    },
    {
      id: 2,
      title: 'Building Scalable React Applications',
      category: 'Tutorial',
      cardCategory: 'SOFTWARE DESIGN',
      status: 'published',
      views: 3204,
      date: '2025-03-05',
      featured: false,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
      content: '<p>Learn best practices for React scalability...</p>',
      description: 'Analyzing the cost-benefit ratio of vendor diversification in enterprise architecture for Fortune 500 companies.'
    },
    {
      id: 3,
      title: 'Design Systems: A Complete Guide',
      category: 'Design',
      cardCategory: 'SOFTWARE DESIGN',
      status: 'draft',
      views: 0,
      date: '2025-03-18',
      featured: false,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=240&fit=crop',
      content: '<p>Everything you need to know about design systems...</p>',
      description: 'How to create and maintain scalable design systems for cross-functional teams.'
    },
    {
      id: 4,
      title: 'AI Tools Transforming Development',
      category: 'News',
      cardCategory: 'IT INFRASTRUCTURE',
      status: 'published',
      views: 6102,
      date: '2025-03-01',
      featured: true,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
      content: '<p>How AI is reshaping software development...</p>',
      description: 'Exploring the impact of AI on infrastructure automation and code generation.'
    }
  ],
  subscribers: [
    { id: 1, email: 'user1@example.com', source: 'Blog', date: '2025-03-15' },
    { id: 2, email: 'user2@example.com', source: 'Footer', date: '2025-03-14' },
    { id: 3, email: 'user3@example.com', source: 'Popup', date: '2025-03-13' },
    { id: 4, email: 'user4@example.com', source: 'Blog', date: '2025-03-12' },
    { id: 5, email: 'user5@example.com', source: 'Social', date: '2025-03-11' },
    { id: 6, email: 'user6@example.com', source: 'Referral', date: '2025-03-10' },
  ],
  analytics: { daily: [42,58,37,65,51,78,62], revenue: [4200,5800,3700,6500,5100,7800,6200], labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
};

export default mockData;
