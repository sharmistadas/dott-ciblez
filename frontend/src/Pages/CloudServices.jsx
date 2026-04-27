import React, { useEffect, useState, useRef } from 'react';
import { 
    FiCloud, FiServer, FiRepeat, FiSettings, FiLayers, FiDatabase, 
    FiShield, FiUsers, FiActivity, FiHeadphones, FiList, FiTrendingUp 
} from 'react-icons/fi';
import { 
    IoCloudSharp, IoServerSharp, IoListSharp, IoShieldCheckmarkSharp, 
    IoGlobeSharp, IoSyncSharp 
} from 'react-icons/io5';
import { motion, useInView } from "framer-motion";
import '../CSS/CloudServices.css';

const Counter = ({ value, suffix, decimals = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let startTime;
            let requestId;
            const duration = 2000; // 2 seconds

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                
                // Ease out expo
                const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                const current = (easedProgress * value).toFixed(decimals);
                setCount(current);
                
                if (progress < 1) {
                    requestId = requestAnimationFrame(step);
                }
            };
            requestId = requestAnimationFrame(step);
            return () => cancelAnimationFrame(requestId);
        }
    }, [isInView, value, decimals]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const CloudServices = () => {
    const statsData = [
        { icon: <FiUsers />, num: 1000, suffix: '+', label: 'ENTERPRISE CLIENTS' },
        { icon: <FiActivity />, num: 99.99, suffix: '%', decimals: 2, label: 'UPTIME SLA' },
        { icon: <FiList />, num: 50, suffix: 'GB+', label: 'DATA MANAGED' },
        { icon: <FiHeadphones />, value: '24/7', label: 'EXPERT SUPPORT' },
    ];

    const orbitItems = [
        { icon: <FiServer />, label: 'INFRASTRUCTURE', className: 'item-1' },
        { icon: <FiSettings />, label: 'MANAGED', className: 'item-2' },
        { icon: <FiDatabase />, label: 'STORAGE', className: 'item-3' },
        { icon: <FiShield />, label: 'SECURITY', className: 'item-4' },
        { icon: <FiLayers />, label: 'HYBRID', className: 'item-5' },
        { icon: <FiRepeat />, label: 'MIGRATION', className: 'item-6' },
    ];

    const ecoProviders = [
        { icon: <FiCloud />, title: 'AWS Global', desc: 'Optimized edge computing across 25+ global regions.', status: 'NODE ACTIVE' },
        { icon: <FiDatabase />, title: 'Azure Cloud', desc: 'Seamless enterprise integration for mission-critical apps.', status: 'SYNCED' },
        { icon: <FiLayers />, title: 'Google Cloud', desc: 'High-performance AI/ML datasets and Kubernetes clusters.', status: 'HEALTHY' },
        { icon: <FiServer />, title: 'VMware vSphere', desc: 'Hybrid virtualization management for legacy systems.', status: 'OPERATIONAL' },
    ];

    const solutionsData = [
        { id: '01', icon: <IoCloudSharp />, title: 'Cloud Infrastructure', desc: 'Scalable cloud computing with IaaS, PaaS, and SaaS solutions on AWS, Azure, and Google Cloud.' },
        { id: '02', icon: <IoServerSharp />, title: 'Managed Services', desc: 'End-to-end cloud management including monitoring, optimization, security, and compliance.' },
        { id: '03', icon: <IoListSharp />, title: 'Storage & Backup', desc: 'Secure cloud storage solutions with automated backups, disaster recovery, and data replication.' },
        { id: '04', icon: <IoShieldCheckmarkSharp />, title: 'Cloud Security', desc: 'Advanced security features including encryption, firewalls, DDoS protection, and compliance.' },
        { id: '05', icon: <IoGlobeSharp />, title: 'Hybrid Solutions', desc: 'Seamless integration between on-premises infrastructure and public cloud for optimal flexibility.' },
        { id: '06', icon: <IoSyncSharp />, title: 'Cloud Migration', desc: 'Smooth migration from legacy systems to cloud with minimal downtime and data integrity.' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('cloud-reveal-active');
            });
        }, { threshold: 0.1 });
        const revealElements = document.querySelectorAll('.cloud-reveal');
        revealElements.forEach((el) => observer.observe(el));
        return () => revealElements.forEach((el) => observer.unobserve(el));
    }, []);

    return (
        <div className="cloud-page">
            <section className="cloud-hero-container cloud-reveal">
                <div className="cloud-hero-visual">
                    <div className="cloud-central-hub">
                        <FiCloud className="cloud-core-icon" />
                        <h2 className="cloud-core-title">Core Services</h2>
                        <span className="cloud-core-subtitle">INTERACTIVE HUB</span>
                    </div>
                    <div className="cloud-orbit-container">
                        {orbitItems.map((item, index) => (
                            <div key={index} className={`cloud-orbit-item ${item.className}`}>
                                <div className="cloud-orbit-inner">
                                    {item.icon}
                                    <span className="cloud-orbit-label">{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cloud-hero-content">
                    <span className="cloud-badge">ENTERPRISE CLOUD</span>
                    <h1 className="cloud-title">Cloud Service & Data Center Providers</h1>
                    <p className="cloud-subtitle">Enterprise Cloud Infrastructure & Managed Services</p>
                    <p className="cloud-desc">
                        Scale your business with enterprise-grade cloud infrastructure. From public cloud to hybrid solutions, we deliver secure, reliable, and high-performance cloud services.
                    </p>
                    <button className="cloud-btn-primary">Get Started</button>
                </div>
            </section>

            <section className="cloud-stats-section cloud-reveal">
                {statsData.map((stat, index) => (
                    <div key={index} className="cloud-stat-card">
                        <div className="cloud-stat-icon">{stat.icon}</div>
                        <h3 className="cloud-stat-value">
                            {stat.num ? (
                                <Counter value={stat.num} suffix={stat.suffix} decimals={stat.decimals} />
                            ) : (
                                stat.value
                            )}
                        </h3>
                        <p className="cloud-stat-label">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Tech Ecosystem Section */}
            <section className="cloud-eco-section cloud-reveal">
                <div className="cloud-eco-header">
                    <span className="eco-badge">UNIFIED INFRASTRUCTURE</span>
                    <h2 className="eco-title">Tech Ecosystem <br /> & Success Feed</h2>
                    <p className="eco-desc">
                        Monitor your entire multi-cloud stack in real-time. Our intelligent orchestration layer connects distributed nodes while delivering measurable enterprise business impact.
                    </p>
                </div>

                <div className="eco-divider-wrap">
                    <div className="eco-vertical-line"></div>
                    <div className="eco-node-label">
                        <div className="node-line"></div>
                        <span className="node-text">INTERACTIVE CLOUD NODES</span>
                    </div>
                </div>

                <div className="cloud-eco-grid">
                    {ecoProviders.map((eco, index) => (
                        <div key={index} className="cloud-eco-card">
                            <div className="cloud-eco-icon-box">{eco.icon}</div>
                            <h4 className="cloud-eco-card-title">{eco.title}</h4>
                            <p className="cloud-eco-card-desc">{eco.desc}</p>
                            <div className="cloud-eco-status">
                                <span className="status-dot"></span>
                                <span className="status-text">{eco.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Solutions Section */}
            <section className="cloud-solutions-section cloud-reveal">
                <div className="cloud-sol-title-wrap">
                    <h2 className="cloud-sol-title">Cloud Solutions</h2>
                    <p className="cloud-sol-subtitle">
                        Enterprise cloud infrastructure that scales with your business. Premium, secure, and ready for global deployment.
                    </p>
                </div>

                <div className="cloud-sol-grid">
                    {solutionsData.map((sol, index) => (
                        <div key={index} className="cloud-sol-card">
                            <span className="cloud-sol-number">{sol.id}</span>
                            <div className="cloud-sol-icon-box">{sol.icon}</div>
                            <h4 className="cloud-sol-card-title">{sol.title}</h4>
                            <p className="cloud-sol-card-desc">{sol.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="cloud-sol-cta-wrap">
                    <button className="cloud-btn-secondary">Consult Our Experts</button>
                </div>
            </section>

            {/* Cloud Journey Section */}
            <section className="cloud-journey-section cloud-reveal">
                <div className="cloud-journey-header">
                    <span className="journey-badge">• THE LIFECYCLE FRAMEWORK</span>
                    <h2 className="journey-title">Our Proven Cloud Journey</h2>
                    <p className="journey-desc">
                        A comprehensive, four-stage methodology designed to ensure your enterprise migration is seamless, secure, and built for long-term scalability.
                    </p>
                </div>

                <div className="journey-timeline-container">
                    <div className="journey-vertical-line"></div>

                    {/* Phase 01 */}
                    <div className="journey-row row-left">
                        <div className="journey-content-side text-side">
                            <h3 className="phase-title">Assessment & Planning</h3>
                            <p className="phase-text">
                                We conduct a rigorous audit of your legacy ecosystem, identifying dependencies, security risks, and performance bottlenecks to build a bulletproof migration roadmap.
                            </p>
                            <div className="phase-tags">
                                <span>Readiness Audit</span>
                                <span>TCO Analysis</span>
                                <span>Risk Mitigation</span>
                            </div>
                        </div>
                        <div className="journey-number-box">01</div>
                        <div className="journey-content-side card-side">
                            <div className="journey-phase-card">
                                <div className="phase-card-icon"><FiList /></div>
                                <div className="phase-card-info">
                                    <span className="phase-label">PHASE ALPHA</span>
                                    <h4 className="phase-card-title">Infrastructure Discovery</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 02 */}
                    <div className="journey-row row-right">
                        <div className="journey-content-side card-side">
                            <div className="journey-phase-card">
                                <div className="phase-card-info">
                                    <span className="phase-label">PHASE BETA</span>
                                    <h4 className="phase-card-title">Cloud Native Blueprint</h4>
                                </div>
                                <div className="phase-card-icon"><FiLayers /></div>
                            </div>
                        </div>
                        <div className="journey-number-box">02</div>
                        <div className="journey-content-side text-side">
                            <h3 className="phase-title">Architecture Design</h3>
                            <p className="phase-text">
                                Engineers architect a custom landing zone using cloud-native patterns, ensuring high availability, multi-region redundancy, and auto-scaling capabilities.
                            </p>
                            <div className="phase-tags">
                                <span>Landing Zone Setup</span>
                                <span>Microservices</span>
                                <span>IaC Scripts</span>
                            </div>
                        </div>
                    </div>

                    {/* Phase 03 */}
                    <div className="journey-row row-left">
                        <div className="journey-content-side text-side">
                            <h3 className="phase-title">Migration & Deployment</h3>
                            <p className="phase-text">
                                Execute the transition with surgical precision. We utilize zero-downtime cutover techniques and real-time data synchronization to ensure business continuity.
                            </p>
                            <div className="phase-tags">
                                <span>Data Sync</span>
                                <span>Cutover Mgmt</span>
                                <span>Live Validation</span>
                            </div>
                        </div>
                        <div className="journey-number-box">03</div>
                        <div className="journey-content-side card-side">
                            <div className="journey-phase-card">
                                <div className="phase-card-icon"><FiActivity /></div>
                                <div className="phase-card-info">
                                    <span className="phase-label">PHASE GAMMA</span>
                                    <h4 className="phase-card-title">Active Transition</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 04 */}
                    <div className="journey-row row-right">
                        <div className="journey-content-side card-side">
                            <div className="journey-phase-card">
                                <div className="phase-card-info">
                                    <span className="phase-label">PHASE OMEGA</span>
                                    <h4 className="phase-card-title">Continuous Evolution</h4>
                                </div>
                                <div className="phase-card-icon"><FiTrendingUp /></div>
                            </div>
                        </div>
                        <div className="journey-number-box">04</div>
                        <div className="journey-content-side text-side">
                            <h3 className="phase-title">Management & Optimization</h3>
                            <p className="phase-text">
                                Post-migration monitoring focuses on cost governance, security hardening, and performance tuning to maximize your cloud investment ROI.
                            </p>
                            <div className="phase-tags">
                                <span>FinOps Control</span>
                                <span>24/7 Monitoring</span>
                                <span>Threat Hunting</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="cloud-tech-section cloud-reveal">
                <div className="cloud-tech-header">
                    <h2 className="tech-main-title">Technologies</h2>
                    <p className="tech-main-desc">
                        A high-end curated selection of our cloud technology stack designed for enterprise-grade scalability and performance.
                    </p>
                </div>

                <div className="tech-categories-container">
                    {/* Cloud Platforms */}
                    <div className="tech-category-group">
                        <div className="tech-divider">
                            <span className="tech-divider-label">CLOUD PLATFORMS</span>
                        </div>
                        <div className="tech-logo-grid">
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png" alt="AWS" className="tech-logo-img aws" />
                                <span className="tech-logo-subtitle">Public Cloud Leader</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/1024px-Microsoft_Azure_Logo.svg.png" alt="Azure" className="tech-logo-img azure" />
                                <span className="tech-logo-subtitle">Enterprise Cloud Solutions</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1024px-Google_Cloud_logo.svg.png" alt="GCP" className="tech-logo-img gcp" />
                                <span className="tech-logo-subtitle">Data & AI Specialized</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/1024px-Vmware.svg.png" alt="VMware" className="tech-logo-img vmware" />
                                <span className="tech-logo-subtitle">Hybrid Infrastructure</span>
                            </div>
                        </div>
                    </div>

                    {/* Orchestration & Infrastructure */}
                    <div className="tech-category-group">
                        <div className="tech-divider">
                            <span className="tech-divider-label">ORCHESTRATION & INFRASTRUCTURE</span>
                        </div>
                        <div className="tech-logo-grid">
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1024px-Kubernetes_logo_without_workmark.svg.png" alt="Kubernetes" className="tech-logo-img kubernetes" />
                                <span className="tech-logo-subtitle">Container Orchestration</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1024px-Docker_%28container_engine%29_logo.svg.png" alt="Docker" className="tech-logo-img docker" />
                                <span className="tech-logo-subtitle">Containerization Engine</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Terraform_Logo.svg/1024px-Terraform_Logo.svg.png" alt="Terraform" className="tech-logo-img terraform" />
                                <span className="tech-logo-subtitle">Infrastructure as Code</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://tse4.mm.bing.net/th/id/OIP.ib0UR0o45D_MHZJCIIT_SAHaEK?w=738&h=415&rs=1&pid=ImgDetMain&o=7&rm=3" alt="OpenStack" className="tech-logo-img openstack" />
                                <span className="tech-logo-subtitle">Open Infrastructure</span>
                            </div>
                        </div>
                    </div>

                    {/* Observability & Automation */}
                    <div className="tech-category-group">
                        <div className="tech-divider">
                            <span className="tech-divider-label">OBSERVABILITY & AUTOMATION</span>
                        </div>
                        <div className="tech-logo-grid">
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ansible_logo.svg/1024px-Ansible_logo.svg.png" alt="Ansible" className="tech-logo-img ansible" />
                                <span className="tech-logo-subtitle">Configuration Management</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Prometheus_software_logo.svg/1024px-Prometheus_software_logo.svg.png" alt="Prometheus" className="tech-logo-img prometheus" />
                                <span className="tech-logo-subtitle">Monitoring & Alerting</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Grafana_logo.svg/1024px-Grafana_logo.svg.png" alt="Grafana" className="tech-logo-img grafana" />
                                <span className="tech-logo-subtitle">Visualization & Dashboards</span>
                            </div>
                            <div className="tech-logo-card">
                                <img src="https://tse4.mm.bing.net/th/id/OIP.TkODDs-qgoD51NAlNBRKQAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3https://gqadir.com/wp-content/uploads/2021/01/what-is-cloudformation.png" alt="CloudFormation" className="tech-logo-img cloudformation" />
                                <span className="tech-logo-subtitle">AWS Resource Provisioning</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Don't see your stack */}
                <div className="tech-cta-box">
                    <h3 className="tech-cta-title">Don't see your stack?</h3>
                    <p className="tech-cta-desc">
                        Our integration platform supports over 200+ different technologies. Browse<br />our full documentation to learn more.
                    </p>
                    <div className="tech-cta-buttons">
                        <button className="tech-btn-primary">View All Integration</button>
                        <button className="tech-btn-secondary">Talk to Sales</button>
                    </div>
                </div>
            </section>

            {/* Enterprise Success Feed Section */}
            <section className="cloud-success-feed cloud-reveal">
                <div className="success-feed-header">
                    <div className="success-feed-line"></div>
                    <span className="success-feed-badge">ENTERPRISE SUCCESS FEED</span>
                </div>

                <div className="success-feed-grid">
                    {/* Success Item 1 */}
                    <div className="success-item">
                        <div className="success-media-wrap">
                            <div className="success-logo-box">
                                <img src="https://cdn-icons-png.flaticon.com/512/5833/5833878.png" alt="Fintech" className="success-logo" />
                            </div>
                            <div className="success-category-tag">FINANCE</div>
                        </div>
                        <div className="success-content">
                            <h3 className="success-item-title">Fintech Solutions Inc.</h3>
                            <p className="success-quote">
                                "The transition to a unified cloud node structure enabled us to scale during peak trading volumes without a single millisecond of downtime."
                            </p>
                            <div className="success-stats-row">
                                <div className="success-stat">
                                    <span className="success-stat-val">70%</span>
                                    <span className="success-stat-lbl">COST REDUCTION</span>
                                </div>
                                <div className="success-stat">
                                    <span className="success-stat-val">4.2x</span>
                                    <span className="success-stat-lbl">DEPLOY SPEED</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Success Item 2 */}
                    <div className="success-item">
                        <div className="success-media-wrap">
                            <div className="success-logo-box">
                                <img src="https://cdn-icons-png.flaticon.com/512/2859/2859871.png" alt="Logistics" className="success-logo" />
                            </div>
                            <div className="success-category-tag">LOGISTICS</div>
                        </div>
                        <div className="success-content">
                            <h3 className="success-item-title">Global Logistix</h3>
                            <p className="success-quote">
                                "Mapping our global supply chain across the interactive node ecosystem provided visibility we never thought possible in real-time."
                            </p>
                            <div className="success-stats-row">
                                <div className="success-stat">
                                    <span className="success-stat-val">99.9%</span>
                                    <span className="success-stat-lbl">UPTIME METRIC</span>
                                </div>
                                <div className="success-stat">
                                    <span className="success-stat-val">24ms</span>
                                    <span className="success-stat-lbl">LATENCY DROP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CloudServices;
