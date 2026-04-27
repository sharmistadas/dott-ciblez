import React, { useState, useEffect } from 'react';
import {
    FiShield, FiLock, FiEye, FiUser, FiShare2, FiDatabase,
    FiSettings, FiMail, FiFileText, FiChevronRight, FiCheckCircle
} from 'react-icons/fi';
import '../CSS/PrivacyPolicy.css';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id) {
                        const index = parseInt(id.split('-')[1]);
                        setActiveSection(index);
                    }
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.privacy-section');
        sections.forEach((section) => observer.observe(section));

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('privacy-reveal-active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const revealElements = document.querySelectorAll('.privacy-reveal');
        revealElements.forEach((el) => revealObserver.observe(el));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
            revealElements.forEach((el) => revealObserver.unobserve(el));
        };
    }, []);

    const scrollToSection = (index) => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
            const yOffset = -40;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const sections = [
        {
            title: "1. Introduction",
            icon: <FiEye />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        At <span className="privacy-highlight">Dott Ciblez</span>, your privacy is a cornerstone of our relationship. This Privacy Policy describes how we collect, use, and protect your personal data when you interact with our software engineering services, cloud infrastructure, and websites.
                    </p>
                    <p className="privacy-paragraph">
                        We are committed to processing data in accordance with international standards, including GDPR and local data protection regulations, ensuring your information remains confidential and secure.
                    </p>
                </>
            )
        },
        {
            title: "2. Information We Collect",
            icon: <FiUser />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        We collect information necessary to provide ultra-secure software solutions and seamless user experiences:
                    </p>
                    <ul className="privacy-list">
                        <li className="privacy-list-item"><span className="privacy-highlight">Professional Data:</span> Full name, company affiliation, job title, and professional email.</li>
                        <li className="privacy-list-item"><span className="privacy-highlight">Technical Metadata:</span> IP addresses, browser types, device identifiers, and system logs.</li>
                        <li className="privacy-list-item"><span className="privacy-highlight">Project Data:</span> Specifications, repository access (where granted), and communication history.</li>
                        <li className="privacy-list-item"><span className="privacy-highlight">Usage Data:</span> Interactions with our cloud portals and platform analytics.</li>
                    </ul>
                </>
            )
        },
        {
            title: "3. Usage of Information",
            icon: <FiSettings />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        Your data is used exclusively to fuel the innovation we deliver to your business:
                    </p>
                    <ul className="privacy-list">
                        <li className="privacy-list-item">Deployment and maintenance of custom software and cloud apps.</li>
                        <li className="privacy-list-item">Advanced security monitoring and threat detection for hosted services.</li>
                        <li className="privacy-list-item">Personalized technical support and system performance optimization.</li>
                        <li className="privacy-list-item">Compliance with legal obligations and enterprise-level auditing.</li>
                    </ul>
                </>
            )
        },
        {
            title: "4. Data Sharing & Disclosure",
            icon: <FiShare2 />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        Dott Ciblez does not sell your information to third-party advertisers. We only share data with trusted partners under strict confidentiality:
                    </p>
                    <ul className="privacy-list">
                        <li className="privacy-list-item"><span className="privacy-highlight">Cloud Providers:</span> Secure infrastructure partners like AWS, Azure, or GCP.</li>
                        <li className="privacy-list-item"><span className="privacy-highlight">DevOps Tools:</span> Essential internal tools used for CI/CD and deployment monitoring.</li>
                        <li className="privacy-list-item"><span className="privacy-highlight">Legal Mandates:</span> Only when required by law to protect our rights or public safety.</li>
                    </ul>
                </>
            )
        },
        {
            title: "5. Data Security",
            icon: <FiLock />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        Security is not a feature; it's our foundation. We implement military-grade protection for your data:
                    </p>
                    <ul className="privacy-list">
                        <li className="privacy-list-item">End-to-end encryption (AES-256) for all sensitive data at rest and in transit.</li>
                        <li className="privacy-list-item">Strict Identity and Access Management (IAM) for all internal systems.</li>
                        <li className="privacy-list-item">Regular penetration testing and automated security audits.</li>
                        <li className="privacy-list-item">Secure SOC-2 compliant data centers for cloud deployments.</li>
                    </ul>
                </>
            )
        },
        {
            title: "6. Your Rights",
            icon: <FiCheckCircle />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        You maintain full sovereignty over your information. You have the right to:
                    </p>
                    <ul className="privacy-list">
                        <li className="privacy-list-item">Request a full export of all personal data we hold.</li>
                        <li className="privacy-list-item">Correct inaccuracies or out-of-date information instantly.</li>
                        <li className="privacy-list-item">Request "Right to be Forgotten" (deletion of data where applicable).</li>
                        <li className="privacy-list-item">Restrict or object to specific processing activities.</li>
                    </ul>
                </>
            )
        },
        {
            title: "7. Cookies & Tracking",
            icon: <FiDatabase />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        We use minimal cookies designed to enhance performance and remember your preferences within our platforms. We do not use intrusive tracking or behavioral profiling cookies.
                    </p>
                    <p className="privacy-paragraph">
                        You can manage your cookie preferences through your browser settings at any time.
                    </p>
                </>
            )
        },
        {
            title: "8. Contact Information",
            icon: <FiMail />,
            content: (
                <>
                    <p className="privacy-paragraph">
                        If you have questions about this policy or our data handling practices, please contact our Data Protection Office:
                    </p>
                    <div className="privacy-paragraph">
                        Email: <span className="privacy-highlight">privacy@dottciblez.com</span><br />
                        Address: Tech Hub Hub, Bhubaneswar, Odisha, India
                    </div>
                </>
            )
        }
    ];

    return (
        <div className="privacy-page">
            {/* Banner Section */}
            <section className="privacy-banner privacy-reveal">
                <div className="privacy-banner-content">
                    <span className="privacy-badge">Security & Trust</span>
                    <h1 className="privacy-title">Privacy Policy</h1>
                    <p className="privacy-subtitle">
                        Your trust is our most valuable asset. Learn how we engineer data protection into every line of code we write.
                    </p>
                </div>
            </section>

            {/* Layout Wrapper */}
            <div className="privacy-wrapper">
                {/* Sidebar Navigation */}
                <aside className="privacy-sidebar privacy-reveal">
                    <div className="privacy-nav-card">
                        <h3 className="privacy-nav-title">Policy Sections</h3>
                        <nav className="privacy-nav-list">
                            {sections.map((section, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToSection(index)}
                                    className={`privacy-nav-link ${activeSection === index ? 'active' : ''}`}
                                >
                                    <span className="privacy-nav-dot"></span>
                                    {section.title.split('. ')[1]}
                                    {activeSection === index && <FiChevronRight className="privacy-active-chevron" />}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content Section */}
                <div className="privacy-content-card privacy-reveal">
                    <div className="privacy-card-header">
                        <div className="privacy-header-left">
                            <FiShield className="privacy-header-icon" />
                            <span className="privacy-last-updated">Last Updated: March 06, 2025</span>
                        </div>
                        <div className="privacy-last-updated">V 2.1 Enterprise</div>
                    </div>

                    <div className="privacy-scroll-view">
                        {sections.map((section, index) => (
                            <section
                                key={index}
                                id={`section-${index}`}
                                className={`privacy-section ${activeSection === index ? 'active-view' : ''}`}
                            >
                                <div className="privacy-section-header">
                                    <span className="privacy-section-icon">{section.icon}</span>
                                    <div className="privacy-section-info">
                                        <h2 className="privacy-section-title">{section.title}</h2>
                                        <div className="privacy-section-body">
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="privacy-contact-box">
                        <h3 className="privacy-contact-title">Privacy is a Fundamental Right</h3>
                        <p className="privacy-contact-desc">
                            Our team is dedicated to maintaining the highest standards of data security and transparency.
                        </p>
                        <button className="privacy-contact-btn">Access Privacy Center</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
