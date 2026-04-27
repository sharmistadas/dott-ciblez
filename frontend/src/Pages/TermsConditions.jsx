import React, { useState, useEffect } from 'react';
import { FiShield, FiCode, FiCpu, FiUserCheck, FiCreditCard, FiAlertTriangle, FiLogOut, FiGlobe, FiFileText, FiChevronRight } from 'react-icons/fi';
import '../CSS/TermsConditions.css';

const TermsConditions = () => {
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

        const sections = document.querySelectorAll('.terms-section');
        sections.forEach((section) => observer.observe(section));

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('terms-reveal-active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const revealElements = document.querySelectorAll('.terms-reveal');
        revealElements.forEach((el) => revealObserver.observe(el));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
            revealElements.forEach((el) => revealObserver.unobserve(el));
        };
    }, []);

    const scrollToSection = (index) => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
            const yOffset = -40; // Adjust for sticky header space
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: <FiShield />,
            content: (
                <>
                    <p className="terms-paragraph">
                        Welcome to <span className="terms-highlight">Dott Ciblez</span>. By accessing or using our websites, software services, cloud solutions, or any other digital products provided by us, you agree to comply with and be bound by these Terms and Conditions.
                    </p>
                    <p className="terms-paragraph">
                        If you do not agree with any part of these terms, you must not use our services. These terms apply to all visitors, users, and clients who access or use our Service.
                    </p>
                </>
            )
        },
        {
            title: "2. Services Provided",
            icon: <FiCode />,
            content: (
                <>
                    <p className="terms-paragraph">
                        Dott Ciblez specializes in premium software development, cloud infrastructure, and digital transformation services. Our offerings include but are not limited to:
                    </p>
                    <ul className="terms-list">
                        <li className="terms-list-item">Custom Web and Mobile Application Development</li>
                        <li className="terms-list-item">Enterprise Cloud Solutions and Managed Services</li>
                        <li className="terms-list-item">UI/UX Design and Product Prototyping</li>
                        <li className="terms-list-item">Technical Consulting and Maintenance</li>
                    </ul>
                </>
            )
        },
        {
            title: "3. Intellectual Property Rights",
            icon: <FiCpu />,
            content: (
                <>
                    <p className="terms-paragraph">
                        All software, code, designs, graphics, and content produced by Dott Ciblez are the intellectual property of Dott Ciblez unless otherwise specified in a separate written agreement.
                    </p>
                    <p className="terms-paragraph">
                        Upon full payment of all fees for a specific project, the client is granted a license or ownership rights as defined in the specific service contract. Unauthorized reproduction or redistribution of our intellectual property is strictly prohibited.
                    </p>
                </>
            )
        },
        {
            title: "4. Client Responsibilities",
            icon: <FiUserCheck />,
            content: (
                <>
                    <p className="terms-paragraph">
                        To ensure the success of our projects, clients agree to:
                    </p>
                    <ul className="terms-list">
                        <li className="terms-list-item">Provide accurate and complete requirements and specifications.</li>
                        <li className="terms-list-item">Offer timely feedback during the designated review periods.</li>
                        <li className="terms-list-item">Grant necessary access to existing systems or data as required for project execution.</li>
                        <li className="terms-list-item">Ensure all provided materials do not infringe on third-party rights.</li>
                    </ul>
                </>
            )
        },
        {
            title: "5. Payment Terms",
            icon: <FiCreditCard />,
            content: (
                <>
                    <p className="terms-paragraph">
                        Services are billed according to the project-specific pricing agreed upon in the Service Agreement. Standard terms include:
                    </p>
                    <ul className="terms-list">
                        <li className="terms-list-item">A non-refundable deposit is required before project commencement.</li>
                        <li className="terms-list-item">Invoices are due within 14 days of issue unless otherwise specified.</li>
                        <li className="terms-list-item">Late payments may result in suspension of services or additional interest charges.</li>
                    </ul>
                </>
            )
        },
        {
            title: "6. Limitation of Liability",
            icon: <FiAlertTriangle />,
            content: (
                <>
                    <p className="terms-paragraph">
                        In no event shall Dott Ciblez, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses resulting from:
                    </p>
                    <ul className="terms-list">
                        <li className="terms-list-item">Your access to or use of the service.</li>
                        <li className="terms-list-item">Any conduct or content of any third party on the service.</li>
                        <li className="terms-list-item">Any content obtained from the service.</li>
                        <li className="terms-list-item">Unauthorized access, use, or alteration of your transmissions or content.</li>
                    </ul>
                </>
            )
        },
        {
            title: "7. Termination",
            icon: <FiLogOut />,
            content: (
                <>
                    <p className="terms-paragraph">
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                    <p className="terms-paragraph">
                        All provisions of the Terms which by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                    </p>
                </>
            )
        },
        {
            title: "8. Governing Law",
            icon: <FiGlobe />,
            content: (
                <>
                    <p className="terms-paragraph">
                        These Terms shall be governed and construed in accordance with the laws of Odisha, India, without regard to its conflict of law provisions.
                    </p>
                    <p className="terms-paragraph">
                        Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                    </p>
                </>
            )
        }
    ];

    return (
        <div className="terms-page">
            {/* Banner Section */}
            <section className="terms-banner terms-reveal">
                <div className="terms-banner-content">
                    <span className="terms-badge">Legal Documentation</span>
                    <h1 className="terms-title">Terms & Conditions</h1>
                    <p className="terms-subtitle">
                        Please read these terms carefully before using our software ecosystem and cloud services.
                    </p>
                </div>
            </section>

            {/* Layout Wrapper */}
            <div className="terms-wrapper">
                {/* Sidebar Navigation */}
                <aside className="terms-sidebar terms-reveal">
                    <div className="terms-nav-card">
                        <h3 className="terms-nav-title">Categories</h3>
                        <nav className="terms-nav-list">
                            {sections.map((section, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToSection(index)}
                                    className={`terms-nav-link ${activeSection === index ? 'active' : ''}`}
                                >
                                    <span className="terms-nav-dot"></span>
                                    {section.title.split('. ')[1]}
                                    {activeSection === index && <FiChevronRight className="terms-active-chevron" />}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content Section */}
                <div className="terms-content-card terms-reveal">
                    <div className="terms-card-header">
                        <div className="terms-header-left">
                            <FiFileText className="terms-header-icon" />
                            <span className="terms-last-updated">Last Updated: March 06, 2025</span>
                        </div>
                        <button className="terms-print-btn" onClick={() => window.print()}>
                            <FiGlobe />
                            <span>Export PDF</span>
                        </button>
                    </div>

                    <div className="terms-scroll-view">
                        {sections.map((section, index) => (
                            <section
                                key={index}
                                id={`section-${index}`}
                                className={`terms-section ${activeSection === index ? 'active-view' : ''}`}
                            >
                                <div className="terms-section-header">
                                    <span className="terms-section-icon">{section.icon}</span>
                                    <div className="terms-section-info">
                                        <h2 className="terms-section-title">{section.title}</h2>
                                        <div className="terms-section-body">
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="terms-contact-box">
                        <h3 className="terms-contact-title">Still have questions?</h3>
                        <p className="terms-contact-desc">
                            Reach out to our compliance department for deeper clarifications.
                        </p>
                        <button className="terms-contact-btn">Speak to Legal</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
