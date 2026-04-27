import React, { useState, useEffect } from 'react';
import { FiMonitor, FiShoppingCart, FiCloud, FiPenTool, FiSearch, FiTool, FiSend, FiHeadphones } from 'react-icons/fi';
import { BsPlayCircleFill, BsCodeSlash, BsGrid3X3Gap, BsDiamond, BsDatabase, BsArrowRight, BsClipboardCheck, BsPenFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { TbApi } from 'react-icons/tb';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiRedis, SiGo } from 'react-icons/si';
import '../CSS/WebDevelopment.css';
// import Web from "../assets/images/WEB.png"

const WebDevelopment = () => {
    const statsData = [
        { value: '10K+', label: 'Projects Delivered' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '250%', label: 'Average ROI' },
        { value: '24/7', label: 'Expert Support' },
    ];


    const servicesData = [
        {
            icon: <BsCodeSlash />,
            title: 'Custom Web Dev',
            description: 'Tailor-made front-end and back-end architectures built with React, Node, and Python for maximum flexibility.',
        },
        {
            icon: <FiShoppingCart />,
            title: 'E-Commerce Hubs',
            description: 'High-conversion storefronts integrated with headless CMS, inventory management, and secure payment gateways.',
        },
        {
            icon: <FiCloud />,
            title: 'SaaS Platform',
            description: 'Multi-tenant cloud architectures featuring subscription management, analytics, and seamless onboarding flows.',
        },
        {
            icon: <TbApi />,
            title: 'API Intigration',
            description: 'Seamlessly connecting your ecosystem through robust REST/GraphQL APIs and third-party service hooks.',
        },
        {
            icon: <HiOutlineBuildingOffice />,
            title: 'Enterprise Apps',
            description: 'Secure, scalable internal tools and ERP systems designed to optimise complex business workflows.',
        },
        {
            icon: <FiPenTool />,
            title: 'UI /UX Modernization',
            description: 'Revitalising legacy interfaces with modern design systems and intuitive user journeys that drive engagement.',
        },
    ];

    const techStackData = [
        {
            category: 'Frontend',
            categoryIcon: <BsDiamond />,
            techs: [
                { name: 'React & Next.js', desc: 'Dynamic UI & SSR', icon: <FaReact /> },
                { name: 'TypeScript', desc: 'Type-safe development', icon: <SiTypescript /> },
                { name: 'Tailwind CSS', desc: 'Modern utility styling', icon: <SiTailwindcss /> },
            ],
        },
        {
            category: 'Backend',
            categoryIcon: <BsCodeSlash />,
            techs: [
                { name: 'Node.js', desc: 'Scalable event-driven I/O', icon: <FaNodeJs /> },
                { name: 'Python / Django', desc: 'Robust logic & AI ready', icon: <FaPython /> },
                { name: 'Go Lang', desc: 'High-performance systems', icon: <SiGo /> },
            ],
        },
        {
            category: 'Database',
            categoryIcon: <BsDatabase />,
            techs: [
                { name: 'PostgreSQL', desc: 'Relational data integrity', icon: <SiPostgresql /> },
                { name: 'MongoDB', desc: 'Flexible document storage', icon: <SiMongodb /> },
                { name: 'Redis', desc: 'Ultra-fast in-memory cache', icon: <SiRedis /> },
            ],
        },
    ];

    const lifecycleData = [
        {
            title: 'Discovery',
            titleDesc: 'Requirement analysis and stakeholder alignment to define core goals.',
            cardIcon: <FiSearch />,
            cardDesc: 'Defining the technical roadmap and business logic for a solid foundation.',
            titleSide: 'left',
        },
        {
            title: 'Strategy & Planning',
            titleDesc: 'Mapping the technical journey from A to Z.',
            cardIcon: <FiTool />,
            cardDesc: 'Technical architecture and stack selection tailored for scalability.',
            titleSide: 'right',
        },
        {
            title: 'UI/UX Design',
            titleDesc: 'User-centric design focused on conversion and intuitive flow.',
            cardIcon: <BsPenFill />,
            cardDesc: 'High-fidelity prototypes and interactive design systems.',
            titleSide: 'left',
        },
        {
            title: 'Development',
            titleDesc: 'Building the engine with modern engineering standards.',
            cardIcon: <BsCodeSlash />,
            cardDesc: 'Agile development phase with bi-weekly sprints and clean code.',
            titleSide: 'right',
        },
        {
            title: 'Testing & QA',
            titleDesc: 'Rigorous automated and manual testing for bug-free code.',
            cardIcon: <BsClipboardCheck />,
            cardDesc: 'Comprehensive security, performance, and usability audits.',
            titleSide: 'left',
        },
        {
            title: 'Deployment',
            titleDesc: 'Going live with robust infrastructure monitoring.',
            cardIcon: <FiSend />,
            cardDesc: 'Seamless launch with CI/CD pipelines and cloud optimization.',
            titleSide: 'right',
        },
        {
            title: 'Support',
            titleDesc: 'Continuous monitoring, updates, and performance optimization.',
            cardIcon: <FiHeadphones />,
            cardDesc: '24/7 maintenance to ensure your platform stays ahead.',
            titleSide: 'left',
        },
    ];

    const faqData = [
        {
            question: 'How long does a typical development project take?',
            answer: 'Most mid-sized projects typically take between 3 to 6 months. This timeline includes everything from initial discovery through design, development, and rigorous QA testing. We prioritize quality over speed to ensure long-term stability.',
        },
        {
            question: 'What are the average costs for a custom web application?',
            answer: 'Costs vary based on project scope, complexity, and required features. We provide detailed estimates after an initial discovery phase to ensure transparency and alignment with your budget.',
        },
        {
            question: 'Do you provide post-launch maintenance?',
            answer: 'Yes, we offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements to keep your application running smoothly.',
        },
        {
            question: 'What technologies do you specialize in?',
            answer: 'We specialize in modern web technologies including React, Next.js, Node.js, Python/Django, and cloud platforms like AWS and GCP. Our stack is chosen to ensure scalability and performance.',
        },
    ];

    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('webdev-reveal-active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const revealElements = document.querySelectorAll('.webdev-reveal');
        revealElements.forEach((el) => observer.observe(el));

        return () => revealElements.forEach((el) => observer.unobserve(el));
    }, []);

    return (
        <>
            {/* Section 7 - Hero */}
            <section className="webdev-hero-section webdev-reveal">
                <div className="webdev-hero-container">
                    <div className="webdev-hero-left">
                        <div className="webdev-premium-badge">
                            <FiMonitor className="webdev-premium-badge-icon" />
                            <span>Premium Service</span>
                        </div>
                        <h1 className="webdev-hero-heading">
                            Website Development<br />
                            Company in <span className="webdev-hero-highlight">Bhubaneswar</span>
                        </h1>
                        <div className="webdev-hero-buttons">
                            <button className="webdev-btn-get-started">Get Started</button>
                            <button className="webdev-btn-view-demo">
                                <BsPlayCircleFill className="webdev-btn-demo-icon" />
                                View Demo
                            </button>
                        </div>
                    </div>
                    <div className="webdev-hero-right">
                        <div className="webdev-hero-illustration">
                            {/* <img src={Web} alt="Web Development Illustration" className="webdev-hero-main-img" /> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 9 - Stats */}
            <section className="webdev-stats-section webdev-reveal">
                <div className="webdev-stats-container">
                    {statsData.map((stat, index) => (
                        <div key={index} className="webdev-stat-card">
                            <h3 className="webdev-stat-value">{stat.value}</h3>
                            <p className="webdev-stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section className="webdev-services-section webdev-reveal">
                <div className="webdev-services-header">
                    <span className="webdev-services-subtitle">COMPACTIBILITY SERVICES</span>
                    <h2 className="webdev-services-title">Our Service Solutions</h2>
                    <p className="webdev-services-desc">
                        From concept to deployment, we provide end-to-end engineering services designed to<br />
                        solve complex digital problems.
                    </p>
                </div>
                <div className="webdev-services-grid">
                    {servicesData.map((service, index) => (
                        <div key={index} className="webdev-service-card">
                            <div className="webdev-service-icon-box">
                                {service.icon}
                            </div>
                            <h3 className="webdev-service-card-title">{service.title}</h3>
                            <p className="webdev-service-card-desc">{service.description}</p>
                            <a href="#" className="webdev-service-card-link">
                                Learn More <BsArrowRight className="webdev-service-link-arrow" />
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="webdev-techstack-section webdev-reveal">
                <div className="webdev-techstack-header">
                    <span className="webdev-techstack-subtitle">TECH STACK</span>
                    <h2 className="webdev-techstack-title">Our Modern Tech Ecosystem</h2>
                    <p className="webdev-techstack-desc">
                        We leverage the latest and most reliable technologies to build products that are fast,<br />
                        secure, and future-proof.
                    </p>
                </div>
                <div className="webdev-techstack-columns">
                    {techStackData.map((column, colIndex) => (
                        <div key={colIndex} className="webdev-techstack-column">
                            <div className="webdev-techstack-column-header">
                                <span className="webdev-techstack-category-icon">{column.categoryIcon}</span>
                                <h3 className="webdev-techstack-category-title">{column.category}</h3>
                            </div>
                            <div className="webdev-techstack-items">
                                {column.techs.map((tech, techIndex) => (
                                    <div key={techIndex} className="webdev-techstack-item">
                                        <div className="webdev-techstack-item-icon">
                                            {tech.icon}
                                        </div>
                                        <div className="webdev-techstack-item-info">
                                            <span className="webdev-techstack-item-name">{tech.name}</span>
                                            <span className="webdev-techstack-item-desc">{tech.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lifecycle Timeline Section */}
            <section className="webdev-lifecycle-section webdev-reveal">
                <div className="webdev-lifecycle-header">
                    <span className="webdev-lifecycle-badge">OUR WORKFLOW</span>
                    <h2 className="webdev-lifecycle-title">Our Development Lifecycle</h2>
                    <p className="webdev-lifecycle-desc">
                        A transparent 7-step process engineered for precision, from initial discovery to high-<br />
                        performance deployment and beyond.
                    </p>
                </div>
                <div className="webdev-lifecycle-main">
                    <div className="webdev-lifecycle-timeline">
                        {/* Vertical center line */}
                        <div className="webdev-lifecycle-line"></div>
                        {lifecycleData.map((step, index) => (
                            <div key={index} className={`webdev-lifecycle-row ${step.titleSide === 'left' ? 'webdev-lifecycle-row-left' : 'webdev-lifecycle-row-right'}`}>
                                {/* Left side */}
                                <div className="webdev-lifecycle-left">
                                    {step.titleSide === 'left' ? (
                                        <div className="webdev-lifecycle-title-block">
                                            <h3 className="webdev-lifecycle-step-title">{step.title}</h3>
                                            <p className="webdev-lifecycle-step-desc">{step.titleDesc}</p>
                                        </div>
                                    ) : (
                                        <div className="webdev-lifecycle-card">
                                            <div className="webdev-lifecycle-card-icon">{step.cardIcon}</div>
                                            <p className="webdev-lifecycle-card-text">{step.cardDesc}</p>
                                        </div>
                                    )}
                                </div>
                                {/* Center dot */}
                                <div className="webdev-lifecycle-center">
                                    <div className="webdev-lifecycle-dot"></div>
                                </div>
                                {/* Right side */}
                                <div className="webdev-lifecycle-right">
                                    {step.titleSide === 'right' ? (
                                        <div className="webdev-lifecycle-title-block">
                                            <h3 className="webdev-lifecycle-step-title">{step.title}</h3>
                                            <p className="webdev-lifecycle-step-desc">{step.titleDesc}</p>
                                        </div>
                                    ) : (
                                        <div className="webdev-lifecycle-card">
                                            <div className="webdev-lifecycle-card-icon">{step.cardIcon}</div>
                                            <p className="webdev-lifecycle-card-text">{step.cardDesc}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="webdev-faq-section webdev-reveal">
                <div className="webdev-faq-header">
                    <h2 className="webdev-faq-title">Frequently Asked Questions</h2>
                    <p className="webdev-faq-subtitle">Everything you need to know about working with DevAgency.</p>
                </div>
                <div className="webdev-faq-list">
                    {faqData.map((faq, index) => (
                        <div key={index} className={`webdev-faq-item ${activeFaq === index ? 'webdev-faq-item-active' : ''}`}>
                            <button className="webdev-faq-question" onClick={() => toggleFaq(index)}>
                                <span>{faq.question}</span>
                                {activeFaq === index ? (
                                    <BsChevronUp className="webdev-faq-chevron" />
                                ) : (
                                    <BsChevronDown className="webdev-faq-chevron" />
                                )}
                            </button>
                            {activeFaq === index && (
                                <div className="webdev-faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="webdev-cta-section webdev-reveal">
                <div className="webdev-cta-container">
                    <div className="webdev-cta-content">
                        <h2 className="webdev-cta-title">Ready to build your next big idea?</h2>
                        <p className="webdev-cta-desc">Partner with Dott Ciblez to transform your technical vision into a market-ready reality.</p>
                    </div>
                    <div className="webdev-cta-action">
                        <button className="webdev-cta-button">Schedule a Strategy Call</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WebDevelopment;
