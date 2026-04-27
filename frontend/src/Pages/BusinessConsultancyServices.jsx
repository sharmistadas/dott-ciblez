import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/BusinessConsultancyServices.css";
import { FaCheckCircle, FaUsers, FaChartLine, FaGlobe, FaLightbulb, FaRobot, FaProjectDiagram, FaCloud, FaCity, FaCode, FaHospital, FaUniversity, FaShoppingBag, FaArrowRight, FaIndustry, FaRocket, FaShieldAlt, FaRegClock, FaDollarSign, FaChevronDown } from "react-icons/fa";
import { FiTrendingDown, FiTrendingUp, FiMail, FiMapPin } from "react-icons/fi";

const BusinessConsultancyServices = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };
    return (
        <div className="consultancy">

            {/* HERO */}

            <section className="consultancy-hero">

                <div className="hero-left">
                    <h1 >
                        Business Consultancy <span>Services</span>
                    </h1>

                    <p>
                        Unlock your business potential with expert strategy,
                        operational excellence and data-driven insights tailored
                        for modern enterprises.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/contact" className="primary-btn">Get Consultation</Link>
                        <Link to="/blog" className="secondary-btn">Learn More</Link>
                    </div>
                </div>

                <div className="hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                        alt="consulting"
                    />
                </div>

            </section>

            {/* OVERVIEW */}

            <section className="overview">

                <div className="overview-left">

                    <span className="tag">OVERVIEW</span>

                    <h2>
                        Comprehensive solutions for complex challenges
                    </h2>

                    <p>
                        We bridge the gap between where your business is and where
                        it needs to be. Our consultants bring decades of
                        experience across industries to deliver strategies that
                        create measurable growth.
                    </p>

                    <div className="overview-list">
                        <div className="list-item">
                            <FaCheckCircle className="check-icon" />
                            <span>Strategic planning and execution</span>
                        </div>
                        <div className="list-item">
                            <FaCheckCircle className="check-icon" />
                            <span>Digital transformation roadmap</span>
                        </div>
                        <div className="list-item">
                            <FaCheckCircle className="check-icon" />
                            <span>Operational efficiency audits</span>
                        </div>
                    </div>
                </div>

                <div className="overview-right">
                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="percent">84%</span>
                            <div className="progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                            <div className="stat-text">
                                <strong>Growth Margin</strong>
                                <small>Average client increase</small>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" alt="growth illustration" />
                    </div>
                </div>

            </section>

            {/* WHY CHOOSE US */}

            <section className="business-why">

                <h2>Why Partners Choose Us</h2>

                <div className="business-why-grid">

                    <div className="business-why-card">
                        <FaUsers className="business-why-card-icon" />
                        <h4>Expert Consultants</h4>
                        <p>Seasoned professionals with global industry expertise at your service.</p>
                    </div>

                    <div className="business-why-card">
                        <FaChartLine className="business-why-card-icon" />
                        <h4>Data-Driven</h4>
                        <p>Every recommendation is backed by rigorous data analysis and market research.</p>
                    </div>

                    <div className="business-why-card">
                        <FaGlobe className="business-why-card-icon" />
                        <h4>Global Reach</h4>
                        <p>Supporting businesses worldwide with localized market understanding.</p>
                    </div>

                    <div className="business-why-card">
                        <FaLightbulb className="business-why-card-icon" />
                        <h4>Innovation</h4>
                        <p>Cutting-edge strategies designed to solve the problems of tomorrow.</p>
                    </div>

                </div>

            </section>

            {/* TECHNOLOGIES */}

            <section className="tech">

                <div className="tech-header">
                    <span className="tech-label">
                        <FaCheckCircle className="label-check" /> ELITE TECHNICAL EXPERTISE
                    </span>

                    <h2>
                        Technologies & Tools
                    </h2>

                    <p className="tech-desc">
                        We leverage sophisticated, high-end technology stacks to drive innovation and efficiency for our global enterprise clients through proven frameworks.
                    </p>
                </div>

                <div className="tech-grid">

                    <div className="tech-card">
                        <div className="tech-card-body">
                            <div className="tech-icon"><FaChartLine /></div>
                            <h4>Business Analytics</h4>
                            <p>Data-driven decision making with enterprise-grade visualization tools.</p>
                            <div className="tech-tags">
                                <span>Power BI</span>
                                <span>Tableau</span>
                                <span>Looker</span>
                            </div>
                        </div>
                        <img className="tech-img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" alt="analytics" />
                    </div>

                    <div className="tech-card">
                        <div className="tech-card-body">
                            <div className="tech-icon"><FaProjectDiagram /></div>
                            <h4>Project Management</h4>
                            <p>Agile workflows and transparent tracking for complex deliverables.</p>
                            <div className="tech-tags">
                                <span>Jira</span>
                                <span>Trello</span>
                                <span>Asana</span>
                            </div>
                        </div>
                        <img className="tech-img" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" alt="pm" />
                    </div>

                    <div className="tech-card">
                        <div className="tech-card-body">
                            <div className="tech-icon"><FaRobot /></div>
                            <h4>Business Automation</h4>
                            <p>Streamlining repetitive tasks through intelligent RPA and integration.</p>
                            <div className="tech-tags">
                                <span>Zapier</span>
                                <span>UiPath</span>
                                <span>Make</span>
                            </div>
                        </div>
                        <img className="tech-img" src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=900&q=80" alt="automation" />
                    </div>

                    <div className="tech-card">
                        <div className="tech-card-body">
                            <div className="tech-icon"><FaCloud /></div>
                            <h4>Cloud Platforms</h4>
                            <p>Scalable infrastructure solutions for modern enterprise needs.</p>
                            <div className="tech-tags">
                                <span>AWS</span>
                                <span>Azure</span>
                                <span>Google Cloud</span>
                            </div>
                        </div>
                        <img className="tech-img" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80" alt="cloud platforms" />
                    </div>

                    <div className="tech-card">
                        <div className="tech-card-body">
                            <div className="tech-icon"><FaCity /></div>
                            <h4>Enterprise Systems</h4>
                            <p>Comprehensive ERP and CRM implementations for scale.</p>
                            <div className="tech-tags">
                                <span>SAP</span>
                                <span>Salesforce</span>
                                <span>Oracle</span>
                            </div>
                        </div>
                        <img className="tech-img" src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80" alt="enterprise" />
                    </div>

                    <div className="tech-card special-integration">
                        <div className="tech-card-body">
                            <div className="tech-icon blue-bg"><FaCode /></div>
                            <h4>Custom Integration</h4>
                            <p>Need a custom technical architecture tailored to your specifics?</p>
                            <a href="#" className="tech-link">Explore Custom Solutions &rarr;</a>
                        </div>
                    </div>

                </div>

            </section>

            {/* PROCESS */}

            <section className="process">

                <h2 className="process-title">Our Proven Process</h2>
                <p className="process-subtitle">
                    A rigorous, multi-stage methodology designed to ensure consistency and excellence at
                    every touchpoint.
                </p>

                <div className="process-container">
                    {/* SVG WAVE LINE */}
                    <svg className="process-wave" viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 100C150 100 250 180 400 180C550 180 650 20 800 20C950 20 1050 100 1200 100" stroke="#d1d9ff" strokeWidth="2" strokeDasharray="8 8" />
                    </svg>

                    <div className="process-steps">

                        <div className="process-step-item step-1">
                            <div className="step-info">
                                <h4>Discovery</h4>
                                <p>Deep immersion into your operational DNA.</p>
                            </div>
                            <div className="step-number">01</div>
                        </div>

                        <div className="process-step-item step-2">
                            <div className="step-number">02</div>
                            <div className="step-info">
                                <h4>Analysis</h4>
                                <p>Data auditing and market stress testing.</p>
                            </div>
                        </div>

                        <div className="process-step-item step-3 active">
                            <div className="step-number">03</div>
                            <div className="step-info">
                                <h4>Strategy</h4>
                                <p>Bespoke roadmap development.</p>
                            </div>
                        </div>

                        <div className="process-step-item step-4">
                            <div className="step-number">04</div>
                            <div className="step-info">
                                <h4>Rollout</h4>
                                <p>Synchronized implementation phase.</p>
                            </div>
                        </div>

                        <div className="process-step-item step-5">
                            <div className="step-info text-top">
                                <p>Continuous monitoring and scaling.</p>
                                <h4>Evolution</h4>
                            </div>
                            <div className="step-number">05</div>
                        </div>

                    </div>
                </div>

            </section>

            <section className="industries">

                <div className="industries-header">
                    <div className="header-text">
                        <h2>Industries We Serve</h2>
                        <p>Specialized expertise across diverse market segments to ensure relevant and impactful results.</p>
                    </div>
                </div>

                <div className="industry-grid">

                    <div className="industry-card">
                        <FaHospital className="industry-icon" />
                        <span>Healthcare</span>
                    </div>

                    <div className="industry-card">
                        <FaUniversity className="industry-icon" />
                        <span>Finance</span>
                    </div>

                    <div className="industry-card">
                        <FaShoppingBag className="industry-icon" />
                        <span>Retail</span>
                    </div>

                    <div className="industry-card">
                        <FaRobot className="industry-icon" />
                        <span>Manufacturing</span>
                    </div>
                    <a href="#" className="view-all">View all industries <FaArrowRight /></a>

                </div>

            </section>

            <section className="success">
                <h2>Success Stories</h2>

                <div className="success-grid">
                    <div className="success-card">
                        <div className="success-img-wrapper">
                            <img src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80" alt="finance" />
                        </div>
                        <div className="success-content">
                            <span className="success-tag">FINANCE</span>
                            <h4>Global Bank Transformation</h4>
                            <p>Redesigning core legacy systems for a leading international financial institution.</p>
                            <div className="success-divider"></div>
                            <div className="success-footer">
                                <h3>-30% Costs</h3>
                                <FiTrendingDown className="metric-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="success-card">
                        <div className="success-img-wrapper">
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80" alt="retail" />
                        </div>
                        <div className="success-content">
                            <span className="success-tag">RETAIL</span>
                            <h4>Retail Chain Optimization</h4>
                            <p>Optimizing supply chain logistics for a nationwide 200+ store retail chain.</p>
                            <div className="success-divider"></div>
                            <div className="success-footer">
                                <h3>+45% ROI</h3>
                                <FiTrendingUp className="metric-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="success-card">
                        <div className="success-img-wrapper">
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80" alt="technology" />
                        </div>
                        <div className="success-content">
                            <span className="success-tag">TECHNOLOGY</span>
                            <h4>SaaS Scalability Strategy</h4>
                            <p>Preparing a high-growth tech startup for global market expansion and series C.</p>
                            <div className="success-divider"></div>
                            <div className="success-footer">
                                <h3>2.4x Users</h3>
                                <FaRocket className="metric-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ADDITIONAL FEATURES BELOW SUCCESS */}
            <section className="impact-metrics">
                <div className="impact-grid">
                    <div className="impact-item">
                        <div className="impact-icon"><FaRegClock /></div>
                        <h4>Operational Speed</h4>
                        <p>Reduce lead times and eliminate bottlenecks in your primary business processes.</p>
                    </div>

                    <div className="impact-item">
                        <div className="impact-icon"><FaDollarSign /></div>
                        <h4>Increased Profitability</h4>
                        <p>Identify new revenue streams and optimize current margins for maximum yield.</p>
                    </div>

                    <div className="impact-item">
                        <div className="impact-icon"><FaShieldAlt /></div>
                        <h4>Risk Management</h4>
                        <p>Proactive identification of market risks and development of mitigation strategies.</p>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testimonials">
                <h2>What Our Clients Say</h2>

                <div className="testimonial-card">
                    <div className="quote-mark">“</div>
                    <p className="quote-text">
                        "ConsultancyPro transformed our approach to digital logistics. Their data-driven insights allowed us to save millions in overhead while actually increasing our service quality. Truly a partner in every sense of the word."
                    </p>
                    <div className="client-info">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" alt="David Richardson" />
                        <h5>David Richardson</h5>
                        <span>CEO, Global Retail Dynamics</span>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="business-cta">
                <div className="business-cta-container">
                    <div className="business-cta-text">
                        <h2>Ready to Transform Your Business?</h2>
                        <p>Contact us today for a free initial consultation and audit.</p>
                    </div>
                    <button className="business-cta-btn">Schedule Call Now</button>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-container">

                    <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`} onClick={() => toggleFaq(0)}>
                        <div className="faq-question">
                            <h4>How long do typical engagements last?</h4>
                            <FaChevronDown className="faq-icon" />
                        </div>
                        <div className="faq-answer">
                            <p>Engagements vary depending on scope, typically ranging from 3-month focused projects to multi-year strategic partnerships.</p>
                        </div>
                    </div>

                    <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`} onClick={() => toggleFaq(1)}>
                        <div className="faq-question">
                            <h4>What industries do you specialize in?</h4>
                            <FaChevronDown className="faq-icon" />
                        </div>
                        <div className="faq-answer">
                            <p>We work across a broad range of sectors including Healthcare, Finance, Retail, and Manufacturing, providing tailored strategies for each unique market.</p>
                        </div>
                    </div>

                    <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`} onClick={() => toggleFaq(2)}>
                        <div className="faq-question">
                            <h4>How do you measure success?</h4>
                            <FaChevronDown className="faq-icon" />
                        </div>
                        <div className="faq-answer">
                            <p>Success is measured through defined, quantifiable KPIs established at the beginning of our engagement, ensuring transparent and tangible ROI.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* CONTACT */}

            <section className="contact">

                <div className="contact-left">

                    <h2>Let's solve your toughest<br />challenges</h2>

                    <p>
                        Drop us a line and one of our lead partners will get back to you within 24 hours.
                    </p>

                    <div className="contact-info">
                        <div className="info-item">
                            <div className="info-icon"><FiMail /></div>
                            <div className="info-text">
                                <span>EMAIL US</span>
                                <p>contact@consultancyprocom</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon"><FiMapPin /></div>
                            <div className="info-text">
                                <span>OUR OFFICE</span>
                                <p>250 Wall Street, NY 10005</p>
                            </div>
                        </div>
                    </div>

                </div>

                <form className="contact-form-box">

                    <div className="form-row">
                        <div className="input-group">
                            <label>First Name</label>
                            <input placeholder="Jane" />
                        </div>
                        <div className="input-group">
                            <label>Last Name</label>
                            <input placeholder="Doe" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Business Email</label>
                        <input placeholder="jane@company.com" />
                    </div>

                    <div className="input-group">
                        <label>Business Challenge</label>
                        <textarea placeholder="Tell us about your objectives..." rows="4"></textarea>
                    </div>

                    <button className="submit-btn" type="button">Submit Inquiry</button>

                </form>

            </section>
        </div>
    );
};

export default BusinessConsultancyServices;
