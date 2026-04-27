import { useEffect, useRef, useState } from "react";
import "../CSS/CyberAuditPage.css";

// ─── ASSET IMPORTS ───────────────────────────────────────────────────
import bgImg from "../assets/images/cyberbanner.png";

import storyImg1 from "../assets/images/finance.jpeg";
import storyImg2 from "../assets/images/health2.jpeg";
import storyImg3 from "../assets/images/ecommerce.jpeg";
import DataSecurityBanner from "../Components/GlobBackground/DataSecurityBanner";
import CyberImg from "../assets/images/cyber-audit.jpg"
// ────────────────────────────────────────────────────────────────────

// ── Stats ─────────────────────────────────────────────────────────────
const IcoShield = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);
const IcoAward = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="6" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
);
const IcoTrend = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);
const IcoCheck = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const STATS = [
    { Icon: IcoShield, target: 1000, prefix: "", suffix: "+", decimals: 0, label: "Audits Completed" },
    { Icon: IcoAward, target: 99.9, prefix: "", suffix: "%", decimals: 1, label: "Threat Detection Rate" },
    { Icon: IcoTrend, target: 500, prefix: "", suffix: "%", decimals: 0, label: "Cost Reduction" },
    { Icon: IcoCheck, target: 24, prefix: "", suffix: "/7", decimals: 0, label: "Security Monitoring" },
];

// ── Services ──────────────────────────────────────────────────────────
const SvcAssess = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <path d="M12 8v3M9.5 17.5L12 11M14.5 17.5L12 11" />
    </svg>
);
const SvcPen = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M9 10l1.5 1.5L14 8" />
    </svg>
);
const SvcCompliance = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
);
const SvcPosture = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);
const SvcRisk = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);
const SvcTraining = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const SERVICES = [
    {
        Icon: SvcAssess,
        name: "Vulnerability Assessment",
        desc: "Comprehensive scanning and analysis of your infrastructure to identify security weaknesses and potential entry points.",
    },
    {
        Icon: SvcPen,
        name: "Penetration Testing",
        desc: "Ethical hacking services simulating real-world attacks to test your defenses and response capabilities.",
    },
    {
        Icon: SvcCompliance,
        name: "Compliance Audits",
        desc: "Ensure adherence to GDPR, ISO 27001, SOC 2, HIPAA, and other regulatory frameworks with detailed assessments.",
    },
    {
        Icon: SvcPosture,
        name: "Security Posture Review",
        desc: "Evaluate your overall security stance including policies, procedures, and incident response plans.",
    },
    {
        Icon: SvcRisk,
        name: "Risk Management",
        desc: "Identify, assess, and prioritize security risks with actionable remediation strategies.",
    },
    {
        Icon: SvcTraining,
        name: "Security Training",
        desc: "Employee awareness programs and security best practices training to build a security-first culture.",
    },
];

// ── Stories ───────────────────────────────────────────────────────────
const STORIES = [
    { tag: "Finance Services", name: "FinTech Corp", img: storyImg1 },
    { tag: "Healthcare", name: "HealthCare Plus", img: storyImg2 },
    { tag: "Retail", name: "E-Commerce Giant", img: "https://media.istockphoto.com/id/1363276548/photo/teacher-giving-computer-science-lecture-to-diverse-multiethnic-group-of-female-and-male.jpg?s=612x612&w=0&k=20&c=HN2VDhQU4i6LdM0pi3zottrc-992rYJQ6FE5daO2XQA=" },
];

// ── COMPONENT ─────────────────────────────────────────────────────────
export default function CyberAuditPage() {
    const statsSectionRef = useRef(null);
    const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0));

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

                setAnimatedStats(STATS.map((stat) => stat.target * easedProgress));

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
        <div className="ca-page">
            {/* <DataSecurityBanner /> */}
            {/* ════════ HERO ════════ */}
            <section className="ca-hero">
                
                <div className="ca-hero-bg" />
                <div className="ca-hero-overlay" />

                <div className="ca-hero-content">
                    {/* Left */}
                    <div className="ca-hero-text">
                        <div className="ca-badge">✦ Premium Service</div>
                        <h1 className="ca-hero-title">
                            Cyber Audit
                            <span className="ca-hero-title-blue">Server</span>
                        </h1>
                        <p className="ca-hero-subtitle">
                            Enterprise IT Infrastructure Management &amp; Support
                        </p>
                        <p className="ca-hero-desc">
                            Protect your digital assets with expert cybersecurity audits,
                            penetration testing, and compliance assessments. Identify
                            vulnerabilities before attackers do.
                        </p>
                        <a href="#contact" className="ca-hero-btn">
                            Get Security Audit
                        </a>
                    </div>

                    {/* Right — hero image fills this side naturally via bg */}
                    <div
                        className="ca-hero-right"
                        style={{ backgroundImage: `url(${bgImg})` }}
                    >
                        {/* Two floating icon circles matching Figma */}
                        {/* <div className="ca-hero-icon ca-hero-icon-top">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div> */}
                        {/* <div className="ca-hero-icon ca-hero-icon-bottom">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
              </svg>
            </div> */}
                    </div>
                </div>
            </section>

            <section className="cyber-section py-5">
                <div className="container">

                    <div className="row align-items-center">

                        {/* Text Content */}
                        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                            <div className="cyber-content-header">
                                <h2 className="cyber-title">Cyber Audit</h2>
                                <p className="cyber-subtitle">
                                    Protect your business with advanced cybersecurity analysis and risk assessment
                                </p>
                            </div>
                            <p>
                                A Cyber Audit is a comprehensive evaluation of an organization’s
                                digital infrastructure, security policies, and data protection
                                practices. It helps identify vulnerabilities, security gaps, and
                                potential cyber threats that could compromise sensitive information
                                or disrupt business operations.
                            </p>

                            <p>
                                In today’s digital world, cyber threats such as hacking, phishing,
                                ransomware, and data breaches are increasing rapidly. A cyber audit
                                ensures that your systems are secure, compliant with industry
                                standards, and capable of defending against modern cyber attacks.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="col-lg-6 col-md-12 text-center">
                            <img src={CyberImg} alt="Cyber Audit" className="img-fluid cyber-img" />
                        </div>

                    </div>

                </div>
            </section>

            {/* ════════ STATS ════════ */}
            <section className="ca-stats" ref={statsSectionRef}>
                <div className="ca-stats-grid">
                    {STATS.map((stat, i) => (
                        <div className="ca-stat-card" key={i}>
                            <div className="ca-stat-icon">
                                <stat.Icon />
                            </div>
                            <div className="ca-stat-value">{formatStatValue(stat, animatedStats[i])}</div>
                            <div className="ca-stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ════════ SERVICES ════════ */}
            <section className="ca-services">
                <div className="ca-section-header">
                    <h2 className="ca-section-title">Security Services</h2>
                    <p className="ca-section-subtitle">
                        Complete IT Infrastructure solution for your business
                    </p>
                </div>
                <div className="ca-services-grid">
                    {SERVICES.map(({ Icon, name, desc }, i) => (
                        <div className="ca-service-card" key={i}>
                            <div className="ca-service-icon">
                                <Icon />
                            </div>
                            <h3 className="ca-service-name">{name}</h3>
                            <p className="ca-service-desc">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ════════ SUCCESS STORIES ════════ */}
            <section className="ca-stories">
                <h2 className="ca-stories-title">Our Success Stories</h2>
                <div className="ca-stories-grid">
                    {STORIES.map((s, i) => (
                        <div className="ca-story-card" key={i}>
                            <div className="ca-story-img-wrap">
                                <img src={s.img} alt={s.name} className="ca-story-img" />
                            </div>
                            <div className="ca-story-body">
                                <div className="ca-story-row">
                                    <span className="ca-story-tag">{s.tag}</span>
                                    <svg
                                        className="ca-story-arrow"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#233DFE"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                        <polyline points="17 6 23 6 23 12" />
                                    </svg>
                                </div>
                                <h3 className="ca-story-name">{s.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ════════ CTA ════════ */}
            <section className="ca-cta">
                <div className="ca-cta-box">
                    <h2 className="ca-cta-title">
                        Ready To Optimize Your IT Infrastrure ?
                    </h2>
                    <p className="ca-cta-desc">
                        Let's build a scalable, secure IT infrastructure that supports your
                        business growth and digital transformation.
                    </p>
                    <a href="#contact" className="ca-cta-btn">
                        Schedule Consultation
                    </a>
                </div>
            </section>
        </div>
    );
}
