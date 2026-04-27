import { useEffect, useRef, useState } from "react";
import "../CSS/ComputerSystemsPage.css";
import Computer from "../assets/Computer.png"

const stats = [
    { label: "SYSTEM DEPLOYED", target: 10, prefix: "", suffix: "k+", decimals: 0 },
    { label: "HARDWARE UPTIME", target: 99.9, prefix: "", suffix: "%", decimals: 1 },
    { label: "TECHNICAL SUPPORTS", target: 24, prefix: "", suffix: "/7", decimals: 0 },
    { label: "WARRANTY RESPONSE", target: 48, prefix: "", suffix: "HRS", decimals: 0 },
];

export default function ComputerSystemsPage() {
    const statsSectionRef = useRef(null);
    const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

    useEffect(() => {
        const section = statsSectionRef.current;

        if (!section) {
            return undefined;
        }

        let frameId = null;

        const animateStats = () => {
            const duration = 1600;
            const startTime = performance.now();

            const tick = (currentTime) => {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                setAnimatedStats(stats.map((stat) => stat.target * easedProgress));

                if (progress < 1) {
                    frameId = window.requestAnimationFrame(tick);
                }
            };

            frameId = window.requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.disconnect();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, []);

    const formatStatValue = (stat, value) => {
        const roundedValue = stat.decimals > 0
            ? value.toFixed(stat.decimals)
            : Math.round(value).toString();

        return `${stat.prefix}${roundedValue}${stat.suffix}`;
    };

    return (
        <div className="csy-page-wrapper">
            {/* HERO / BANNER SECTION */}
            <section className="csy-hero-section">
                <div className="csy-hero-content">
                    <div className="csy-hero-left">
                        {/* PREMIUM SERVICE BADGE */}
                        <div className="csy-hero-badge">
                            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                                <path
                                    d="M8 1l1.5 3.5L13 5l-2.5 2.5.5 3.5L8 9.5 5 11l.5-3.5L3 5l3.5-.5z"
                                    stroke="#fff"
                                    strokeWidth="1.2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            PREMIUM SERVICE
                        </div>

                        <h1 className="csy-hero-title">
                            Computer Systems &{" "}
                            <span className="csy-hero-title-blue">Communication Equipment</span>
                        </h1>
                        <p className="csy-hero-subtitle">
                            Enterprise Hardware Solutions &amp; Communication Infrastructure
                        </p>
                        <p className="csy-hero-desc">
                            Premium enterprise-grade computer systems, networking equipment,
                            and communication solutions. From workstations to data center
                            infrastructure, we deliver performance and reliability.
                        </p>
                        <button className="csy-btn-primary">Request Quote</button>
                    </div>

                    <div className="csy-hero-right">
                        <div className="csy-hero-image-wrapper">
                           <img src={Computer} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="csy-stats-section" ref={statsSectionRef}>
                <div className="csy-stats-grid">
                    {/* Card 1 – System Deployed */}
                    <div className="csy-stat-card">
                        <div className="csy-stat-icon-box">
                            <svg
                                viewBox="0 0 36 36"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <ellipse cx="18" cy="10" rx="10" ry="4" />
                                <path d="M8 10v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5" />
                                <path d="M8 15v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5" />
                                <path d="M8 20v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5" />
                            </svg>
                        </div>
                        <div className="csy-stat-value">{formatStatValue(stats[0], animatedStats[0])}</div>
                        <div className="csy-stat-label">{stats[0].label}</div>
                    </div>

                    {/* Card 2 – Hardware Uptime */}
                    <div className="csy-stat-card">
                        <div className="csy-stat-icon-box">
                            <svg
                                viewBox="0 0 36 36"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="18" cy="21" r="11" />
                                <path d="M13 7l-2-3M23 7l2-3M18 5V2" />
                                <path d="M18,14 L19.8,17.8 L24,18.4 L21,21.3 L21.7,25.5 L18,23.5 L14.3,25.5 L15,21.3 L12,18.4 L16.2,17.8 Z" />
                            </svg>
                        </div>
                        <div className="csy-stat-value">{formatStatValue(stats[1], animatedStats[1])}</div>
                        <div className="csy-stat-label">{stats[1].label}</div>
                    </div>

                    {/* Card 3 – Technical Supports */}
                    <div className="csy-stat-card">
                        <div className="csy-stat-icon-box">
                            <svg
                                viewBox="0 0 36 36"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="4" y="6" width="28" height="20" rx="3" />
                                <path d="M12 30h12M18 26v4" />
                                <polyline points="9,21 14,15 18,19 23,12 27,16" />
                            </svg>
                        </div>
                        <div className="csy-stat-value">{formatStatValue(stats[2], animatedStats[2])}</div>
                        <div className="csy-stat-label">{stats[2].label}</div>
                    </div>

                    {/* Card 4 – Warranty Response */}
                    <div className="csy-stat-card">
                        <div className="csy-stat-icon-box">
                            <svg
                                viewBox="0 0 36 36"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="18" cy="20" r="12" />
                                <polyline points="18,13 18,20 23,23" />
                                <line x1="12" y1="4" x2="24" y2="4" />
                                <line x1="18" y1="4" x2="18" y2="8" />
                            </svg>
                        </div>
                        <div className="csy-stat-value">{formatStatValue(stats[3], animatedStats[3])}</div>
                        <div className="csy-stat-label">{stats[3].label}</div>
                    </div>
                </div>
            </section>

            {/* HARDWARE SOLUTIONS */}
            <section className="csy-solutions-section">
                <h2 className="csy-section-title">Hardware Solutions</h2>
                <p className="csy-section-subtitle">
                    Enterprise-grade equipment for every business need
                </p>
                <div className="csy-solutions-grid">
                    {[
                        {
                            icon: (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#3d52d5"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                                </svg>
                            ),
                            title: "Workstations & PCs",
                            desc: "High-performance desktops, workstations, and all-in-one PCs configured for business, creative, and engineering workloads.",
                        },
                        {
                            icon: (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#3d52d5"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <path d="M8 21h8M12 17v4" />
                                    <path d="M7 8h2M7 11h2M11 8h6M11 11h6" />
                                </svg>
                            ),
                            title: "Server Infrastructure",
                            desc: "Rack servers, tower servers, and blade systems with redundant power, storage, and networking capabilities.",
                        },
                        {
                            icon: (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#3d52d5"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                    <circle cx="16" cy="14" r="2" />
                                    <path d="M16 12v-1M16 18v-1M14 14H13M19 14h-1M14.5 12.5l-.7-.7M18.2 16.2l-.7-.7M14.5 15.5l-.7.7M18.2 11.8l-.7.7" />
                                </svg>
                            ),
                            title: "Storage Solutions",
                            desc: "Enterprise NAS, SAN, and DAS storage systems with RAID configurations, backup solutions, and data protection.",
                        },
                        {
                            icon: (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#3d52d5"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="14" width="4" height="7" />
                                    <rect x="9" y="9" width="4" height="12" />
                                    <rect x="16" y="4" width="4" height="17" />
                                </svg>
                            ),
                            title: "Network Equipment",
                            desc: "Enterprise switches, routers, firewalls, access points, and wireless controllers from leading manufacturers.",
                        },
                        {
                            icon: (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#3d52d5"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="6" y="2" width="12" height="20" rx="2" />
                                    <path d="M10 6h4M12 18h.01" />
                                    <path d="M9 10c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.3-.8 2.4-2 2.8V15h-2v-2.2C9.8 12.4 9 11.3 9 10z" />
                                </svg>
                            ),
                            title: "Communication Devices",
                            desc: "Business phones, VoIP systems, video conferencing equipment, and unified communication solutions.",
                        },
                        {
                            icon: (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#3d52d5"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            ),
                            title: "Custom Configurations",
                            desc: "Tailored hardware specifications, OEM partnerships, bulk procurement, and white-glove installation services.",
                        },
                    ].map((item, i) => (
                        <div className="csy-solution-card" key={i}>
                            <div className="csy-solution-icon-box">{item.icon}</div>
                            <h3 className="csy-solution-title">{item.title}</h3>
                            <p className="csy-solution-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* IMPLEMENTATION PROCESS */}
            <section className="csy-process-section">
                <h2 className="csy-section-title csy-dark">Our Implementation Process</h2>
                <p className="csy-section-subtitle csy-dark">
                    Our structured path to digital transformation.
                </p>
                <div className="csy-process-timeline">
                    <div className="csy-process-line" />
                    {[
                        {
                            num: "01",
                            title: "Requirements Analysis",
                            desc: "Assess business needs, workload requirements, budget constraints, and growth projections for optimal hardware selection.",
                        },
                        {
                            num: "02",
                            title: "Solution Design",
                            desc: "Design infrastructure with scalability, redundancy, and compatibility considerations for seamless integration.",
                        },
                        {
                            num: "03",
                            title: "Procurement & Setup",
                            desc: "Source equipment from authorized vendors, configure systems, and execute professional installation and testing.",
                        },
                        {
                            num: "04",
                            title: "Support & Maintenance",
                            desc: "Provide warranty management, spare parts inventory, preventive maintenance, and 24/7 technical support.",
                        },
                    ].map((step, i) => (
                        <div className="csy-process-step" key={i}>
                            <div className="csy-process-circle">{step.num}</div>
                            <h3 className="csy-process-title">{step.title}</h3>
                            <p className="csy-process-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PARTNER BRANDS */}
            <section className="csy-partners-section">
                <div className="csy-partners-header">
                    <h2 className="csy-partners-heading">Partner Brand</h2>
                    <p className="csy-partners-sub">
                        A high-end curated selection of our cloud technology stack designed
                        for enterprise-grade scalability and performance.
                    </p>
                </div>
                <div className="csy-partners-grid">
                    {[
                        {
                            name: "IBM",
                            logo: new URL("../assets/images/Ibm.png", import.meta.url).href,
                        },
                        {
                            name: "NVIDIA",
                            logo: new URL("../assets/images/Nvidia.png", import.meta.url)
                                .href,
                        },
                        {
                            name: "AWS",
                            logo: new URL("../assets/images/aws.png", import.meta.url).href,
                        },
                        {
                            name: "Microsoft Azure",
                            logo: new URL("../assets/images/ms.png", import.meta.url).href,
                        },
                        {
                            name: "Cisco",
                            logo: new URL("../assets/images/cisco.png", import.meta.url).href,
                        },
                        {
                            name: "Lenovo",
                            logo: new URL("../assets/images/lenovo.png", import.meta.url)
                                .href,
                        },
                        {
                            name: "Palo Alto",
                            logo: new URL("../assets/images/palo.png", import.meta.url).href,
                        },
                        {
                            name: "Fortinet",
                            logo: new URL("../assets/images/fort.png", import.meta.url).href,
                        },
                        {
                            name: "Terraform",
                            logo: new URL("../assets/images/terra.png", import.meta.url).href,
                        },
                        {
                            name: "Dell EMC",
                            logo: new URL("../assets/images/dell.png", import.meta.url).href,
                        },
                        {
                            name: "Kubernetes",
                            logo: new URL("../assets/images/kuber.png", import.meta.url).href,
                        },
                        {
                            name: "NetApp",
                            logo: new URL("../assets/images/net.png", import.meta.url).href,
                        },
                    ].map((brand, i) => (
                        <div className="csy-partner-card" key={i}>
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="csy-partner-logo"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "block";
                                }}
                            />
                            <span
                                className="csy-partner-fallback"
                                style={{ display: "none", color: "#333", fontWeight: 700 }}
                            >
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CLIENT DEPLOYMENTS */}
            <section className="csy-deployments-section">
                <h2 className="csy-section-title">Client Deployments</h2>
                <div className="csy-deployments-grid">
                    {[
                        {
                            tag: "ENTERPRISE",
                            title: "Corporate HQ",
                            metric: "500 workstations deployed",
                            img: new URL("../assets/images/Enterp.png", import.meta.url).href,
                        },
                        {
                            tag: "TECHNOLOGY",
                            title: "DataPro Inc",
                            metric: "100TB storage solution",
                            img: new URL("../assets/images/tech.png", import.meta.url)
                                .href,
                        },
                        {
                            tag: "BPO",
                            title: "CallCenter Plus",
                            metric: "VoIP for 1000 agents",
                            img: new URL("../assets/images/ecommerce.png", import.meta.url)
                                .href,
                        },
                    ].map((d, i) => (
                        <div className="csy-deployment-card" key={i}>
                            <div className="csy-deployment-img-wrap">
                                <img src={d.img} alt={d.title} className="csy-deployment-img" />
                            </div>
                            <div className="csy-deployment-info">
                                <span className="csy-deployment-tag">{d.tag}</span>
                                <h3 className="csy-deployment-title">{d.title}</h3>
                                <p className="csy-deployment-metric">
                                    <svg
                                        className="csy-trend-icon"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="#233DFE"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="1,14 7,8 11,12 19,4" />
                                        <polyline points="14,4 19,4 19,9" />
                                    </svg>
                                    {d.metric}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="csy-cta-section">
                <div className="csy-cta-card">
                    <h2 className="csy-cta-title">
                        Ready to Optimize Your IT Infrastructure?
                    </h2>
                    <p className="csy-cta-desc">
                        Let's build a scalable, secure IT infrastructure that supports your
                        business growth and digital transformation.
                    </p>
                    <button className="csy-btn-cta">Schedule Consultation</button>
                </div>
            </section>
        </div>
    );
}
