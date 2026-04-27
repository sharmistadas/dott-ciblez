import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/ITNetworkServices.css";

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
import ITInfrastructure from "../assets/network-world.png"

export default function ITNetworkServices() {
    return (
        <div className="itns-services-page">
            {/* ================= MODERN HERO SECTION ================= */}
            <section className="itns-hero-section">
                {/* Animated background elements */}
                <div className="itns-hero-particles">
                    <div className="itns-particle itns-particle-1"></div>
                    <div className="itns-particle itns-particle-2"></div>
                    <div className="itns-particle itns-particle-3"></div>
                    <div className="itns-particle itns-particle-4"></div>
                </div>

                {/* Floating orbs */}
                <div className="itns-hero-orbs">
                    <div className="itns-orb itns-orb-1"></div>
                    <div className="itns-orb itns-orb-2"></div>
                    <div className="itns-orb itns-orb-3"></div>
                </div>

                {/* Grid pattern overlay */}
                <div className="itns-grid-overlay"></div>

                <div className="container">
                    <div className="row align-items-center">
                        {/* Left side: Content */}
                        <div className="col-lg-6 ps-lg-2">
                            <div className="itns-premium-badge-wrapper">
                                <div className="itns-premium-badge">
                                    <i className="bi bi-stars me-2"></i>
                                    PREMIUM SERVICE
                                </div>
                            </div>

                            <h1 className="itns-hero-title">
                                Information technology and <span className="itns-gradient-text">network services</span>
                            </h1>

                            <p className="itns-hero-desc">
                                Offer expert guidance to improve technology strategies and
                                digital transformation. Our information technology and network
                                services simplify maintenance, security, and software management.
                            </p>

                            <div className="itns-hero-cta">
                                <button className="itns-btn-primary">
                                    Request Quote
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                                <button className="itns-btn-outline">
                                    <i className="bi bi-play-circle me-2"></i>
                                    Watch Demo
                                </button>
                            </div>

                            {/* Trust indicators */}
                            <div className="itns-trust-indicators">
                                <div className="itns-trust-item">
                                    <i className="bi bi-shield-check"></i>
                                    <span>ISO 27001 Certified</span>
                                </div>
                                <div className="itns-trust-item">
                                    <i className="bi bi-clock-history"></i>
                                    <span>24/7 Support</span>
                                </div>
                                <div className="itns-trust-item">
                                    <i className="bi bi-award"></i>
                                    <span>10+ Years Excellence</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side: Image with animation */}
                        <div className="col-lg-6 text-center itns-hero-image-container">
                            <div className="itns-image-wrapper">
                                <div className="itns-image-glow"></div>
                                <img
                                    src={ITInfrastructure}
                                    alt="IT Infrastructure"
                                    className="itns-hero-main-img"
                                />
                                {/* Floating tech icons */}
                                <div className="itns-float-icon itns-float-icon-1">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                                <div className="itns-float-icon itns-float-icon-2">
                                    <i className="bi bi-cloud-check"></i>
                                </div>
                                <div className="itns-float-icon itns-float-icon-3">
                                    <i className="bi bi-router"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>

            {/* ================= STATS SECTION WITH MODERN CARDS ================= */}
            <section className="itns-stats-section">
                <div className="container">
                    <div className="row g-2">
                        {[
                            { num: 10, suffix: "k+", label: "satisfied customers", icon: "bi-people", color: "#3b5bff" },
                            { num: 99.9, suffix: "%", decimals: 1, label: "uptime support", icon: "bi-check-circle", color: "#10b981" },
                            { value: "24/7", label: "technical support", icon: "bi-headset", color: "#f59e0b" },
                            { num: 48, suffix: "HRS", label: "incident response", icon: "bi-clock-history", color: "#ef4444" },
                        ].map((stat, i) => (
                            <div className="col-md-3 col-6" key={i}>
                                <div className="itns-stat-modern-card">
                                    <div className="itns-stat-icon-wrapper" style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}05)` }}>
                                        <i className={`bi ${stat.icon}`} style={{ color: stat.color }}></i>
                                    </div>
                                    <div className="itns-stat-content">
                                        <h3 className="itns-stat-value">
                                            {stat.num ? (
                                                <Counter value={stat.num} suffix={stat.suffix} decimals={stat.decimals} />
                                            ) : (
                                                stat.value
                                            )}
                                        </h3>
                                        <p className="itns-stat-label">{stat.label}</p>
                                    </div>
                                    <div className="itns-stat-glow" style={{ background: `radial-gradient(circle, ${stat.color}30, transparent 70%)` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= SERVICES SECTION WITH MODERN CARDS ================= */}
            <section className="itns-services-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="itns-section-badge">WHAT WE OFFER</span>
                        <h2 className="itns-section-title">
                            IT & Network <span className="itns-gradient-text">Services</span>
                        </h2>
                        <p className="itns-section-subtitle">
                            Enterprise-grade equipment for every business need. We provide the
                            foundation for your digital success through reliable and secure networking.
                        </p>
                    </div>

                    <div className="row g-2">
                        {[
                            {
                                title: "IT Infrastructure Management",
                                desc: "Help your business build, maintain, and safeguard business-critical software and server infrastructure.",
                                icon: "bi-server",
                                color: "#3b5bff",
                                features: ["24/7 Monitoring", "Auto-scaling", "Backup & Recovery"]
                            },
                            {
                                title: "Network Setup & Configuration",
                                desc: "Design and implement secure networks, cabling, and proper router/switch configuration.",
                                icon: "bi-router",
                                color: "#10b981",
                                features: ["VLAN Setup", "Firewall Config", "Load Balancing"]
                            },
                            {
                                title: "Cybersecurity Services",
                                desc: "Protect optics and data from cyber threats with firesafe, monitoring, and cloud-guards.",
                                icon: "bi-shield-lock",
                                color: "#f59e0b",
                                features: ["Threat Detection", "Pen Testing", "Compliance"]
                            },
                            {
                                title: "Cloud Services",
                                desc: "Flexible cloud storage, backup solutions, and cloud infrastructure for flawless data access.",
                                icon: "bi-cloud-check",
                                color: "#ef4444",
                                features: ["AWS/Azure/GCP", "Hybrid Cloud", "Cost Optimization"]
                            },
                            {
                                title: "Technical Support",
                                desc: "Offer troubleshooting, maintenance, and expert technical assistance for IT-related issues.",
                                icon: "bi-tools",
                                color: "#8b5cf6",
                                features: ["Remote Support", "On-site", "Emergency Response"]
                            },
                            {
                                title: "Network Monitoring",
                                desc: "Maintain healthy performance across the network to optimize operations and improve connectivity.",
                                icon: "bi-graph-up",
                                color: "#ec4899",
                                features: ["Real-time Alerts", "Performance Metrics", "Analytics"]
                            },
                        ].map((service, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="itns-service-modern-card">
                                    <div className="itns-service-card-inner">
                                        <div className="itns-service-header">
                                            <div className="itns-service-icon-box" style={{ background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)` }}>
                                                <i className={`bi ${service.icon}`} style={{ color: service.color }}></i>
                                            </div>
                                            <span className="itns-service-number">0{i + 1}</span>
                                        </div>
                                        <h3 className="itns-service-title">{service.title}</h3>
                                        <p className="itns-service-desc">{service.desc}</p>
                                        <ul className="itns-service-features">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx}>
                                                    <i className="bi bi-check-circle-fill" style={{ color: service.color }}></i>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <a href="#" className="itns-service-link" style={{ color: service.color }}>
                                            Learn More
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                    <div className="itns-card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}30, transparent 70%)` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PROCESS SECTION WITH MODERN TIMELINE ================= */}
            <section className="itns-process-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="itns-section-badge">OUR METHODOLOGY</span>
                        <h2 className="itns-section-title">
                            Implementation <span className="itns-gradient-text">Process</span>
                        </h2>
                        <p className="itns-section-subtitle">
                            Our structured path to digital transformation with proven results
                        </p>
                    </div>

                    <div className="itns-process-modern">
                        {[
                            {
                                id: "01",
                                title: "Analysis",
                                desc: "Understanding current infrastructure and identifying gaps.",
                                icon: "bi-search",
                                color: "#3b5bff"
                            },
                            {
                                id: "02",
                                title: "Planning & Design",
                                desc: "Designing architecture with scalability and security as priority.",
                                icon: "bi-pencil-square",
                                color: "#10b981"
                            },
                            {
                                id: "03",
                                title: "Implementation",
                                desc: "Deploying hardware, software, and secure network configurations.",
                                icon: "bi-gear",
                                color: "#f59e0b"
                            },
                            {
                                id: "04",
                                title: "Support & Maintenance",
                                desc: "Ongoing monitoring, updates, and 24/7 technical assistance.",
                                icon: "bi-headset",
                                color: "#ef4444"
                            },
                        ].map((step, i) => (
                            <div className="itns-process-modern-step" key={i}>
                                <div className="itns-process-step-content ms-2">
                                    <div className="itns-process-icon-wrapper" style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)` }}>
                                        <i className={`bi ${step.icon}`} style={{ color: step.color }}></i>
                                    </div>
                                    <div className="itns-process-number-badge" style={{ background: step.color }}>
                                        {step.id}
                                    </div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                                {i < 3 && <div className="itns-process-arrow">
                                    <i className="bi bi-arrow-right"></i>
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PARTNER SECTION WITH MODERN CARDS ================= */}
            <section className="itns-partners-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="itns-section-badge">TRUSTED PARTNERS</span>
                        <h2 className="itns-section-title">
                            Partner <span className="itns-gradient-text">Brands</span>
                        </h2>
                        <p className="itns-section-subtitle">
                            A high-end curated selection of our cloud technology stack designed
                            for enterprise-grade scalability and performance.
                        </p>
                    </div>

                    <div className="itns-partners-grid">
                        {[
                            { name: "Dell", logo: "https://platform.softwareone.com/files/vendor-logos/VND-9034-7317/b08e83a62ab7d165fb7e1cb8b8643e0f7b3074432608f762515b6853c263d1a7.webp" },
                            { name: "HPE", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/4/46/Hewlett_Packard_Enterprise_logo.svg&w=400&output=webp" },
                            { name: "Lenovo", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg&w=400&output=webp" },
                            { name: "Cisco", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg&w=400&output=webp" },
                            { name: "VMware", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg&w=400&output=webp" },
                            { name: "Kubernetes", logo: "https://miro.medium.com/v2/resize:fit:600/1*Xyrmr3lIfdwwH638Iv0LzQ.png" },
                            { name: "Fortinet", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/6/62/Fortinet_logo.svg&w=400&output=webp" },
                            { name: "NetApp", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlDoAVxqZ71xGMWqINiZYypGSbzqZkcxEqTQ&s" },
                            { name: "IBM", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg&w=400&output=webp" },
                            { name: "Intel", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnI3Ykn1PYb156YNKibSvKDsrTNcOJWQLew&s" },
                            { name: "Microsoft", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg&w=400&output=webp" },
                            { name: "Nvidia", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg&w=400&output=webp" },
                        ].map((brand, i) => (
                            <div className="itns-partner-grid-item" key={i}>
                                <div className="itns-partner-modern-card">
                                    <div className="itns-partner-logo-wrapper">
                                        <img src={brand.logo} alt={brand.name} />
                                    </div>
                                    <div className="itns-partner-hover">
                                        <span>{brand.name}</span>
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= DEPLOYMENTS SECTION WITH MODERN CARDS ================= */}
            <section className="itns-deployments-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="itns-section-badge">CASE STUDIES</span>
                        <h2 className="itns-section-title">
                            Client <span className="itns-gradient-text">Deployments</span>
                        </h2>
                        <p className="itns-section-subtitle">
                            Real-world solutions delivering measurable results
                        </p>
                    </div>

                    <div className="row g-2">
                        {[
                            {
                                title: "Corporate HQ",
                                category: "ENTERPRISE",
                                badgeClass: "itns-enterprise-badge",
                                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
                                description: "500 workstations deployed with full network infrastructure",
                                stats: ["99.9% Uptime", "40% Cost Reduction", "500+ Users"]
                            },
                            {
                                title: "DataPro Inc",
                                category: "TECHNOLOGY",
                                badgeClass: "itns-tech-badge",
                                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
                                description: "100TB storage solution with hybrid cloud architecture",
                                stats: ["100TB Storage", "60% Faster Access", "Cloud Hybrid"]
                            },
                            {
                                title: "CallCenter Plus",
                                category: "BPO",
                                badgeClass: "itns-bpo-badge",
                                img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
                                description: "VoIP infrastructure for 1000+ concurrent agents",
                                stats: ["1000+ Agents", "99.99% Uptime", "VoIP Solution"]
                            },
                        ].map((proj, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="itns-deployment-modern-card">
                                    <div className="itns-deployment-image-wrapper">
                                        <img src={proj.img} alt={proj.title} />
                                        <span className={`itns-deployment-badge ${proj.badgeClass}`}>
                                            {proj.category}
                                        </span>
                                    </div>
                                    <div className="itns-deployment-content">
                                        <h3>{proj.title}</h3>
                                        <p>{proj.description}</p>
                                        <div className="itns-deployment-stats">
                                            {proj.stats.map((stat, idx) => (
                                                <div className="itns-deployment-stat" key={idx}>
                                                    <i className="bi bi-check-circle-fill"></i>
                                                    <span>{stat}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="#" className="itns-deployment-link">
                                            View Case Study
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FINAL CTA WITH MODERN DESIGN ================= */}
            <section className="itns-final-cta">
                <div className="container">
                    <div className="itns-cta-modern-card">
                        <div className="itns-cta-content">
                            <span className="itns-cta-badge">GET STARTED TODAY</span>
                            <h2>
                                Ready to Optimize Your <span className="itns-gradient-text">IT Infrastructure?</span>
                            </h2>
                            <p>
                                Let's build a scalable, secure IT infrastructure that supports your
                                business growth and digital transformation.
                            </p>
                            <div className="itns-cta-buttons">
                                <button className="itns-btn-primary itns-btn-large">
                                    Schedule Consultation
                                    <i className="bi bi-calendar-check ms-2"></i>
                                </button>
                                <button className="itns-btn-outline itns-btn-light">
                                    <i className="bi bi-telephone me-2"></i>
                                    Call Us Now
                                </button>
                            </div>
                        </div>
                        <div className="itns-cta-pattern"></div>
                        <div className="itns-cta-glow"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}