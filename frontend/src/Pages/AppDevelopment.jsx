import React, { useEffect, useState } from "react";
import {
    FaHeart, FaCommentDots, FaShareAlt,
    FaLayerGroup, FaServer, FaDatabase, FaReact, FaNodeJs,
    FaCubes, FaProjectDiagram, FaLaptopCode, FaShieldAlt,
    FaLock, FaCheckSquare, FaUserShield, FaSyncAlt,
    FaKey, FaFingerprint,
    FaSearch, FaCompass, FaCode, FaVial, FaRocket, FaLifeRing,
    FaChartLine, FaCheckCircle, FaBolt
} from "react-icons/fa";
import {
    SiTypescript, SiTailwindcss, SiPostgresql,
    SiMongodb, SiRedis, SiDjango, SiGo
} from "react-icons/si";

import "../CSS/AppDevelopment.css";
import robot from "../assets/robot.png";
import CTA from "../Components/AppDevlopment/CTA";

/* ─── Data ──────────────────────────────────────── */
const capCards = [
    {
        icon: <FaLayerGroup />, title: "Custom Web Applications", dark: false,
        desc: "Scalable frontend architectures built with React and Next.js, optimized for complex data management and user interactivity."
    },
    {
        icon: <FaCubes />, title: "SaaS Development", dark: true,
        desc: "End-to-end multi-tenant platform engineering including billing integration, user permissions, and elastic cloud infrastructure."
    },
    {
        icon: <FaProjectDiagram />, title: "API Integration", dark: false,
        desc: "Building robust middleware and microservices that unify your tech stack through secure REST and GraphQL APIs."
    },
    {
        icon: <FaLaptopCode />, title: "Legacy Modernization", dark: true,
        desc: "Strategic migration of monolith systems to modern micro-frontend architectures without interrupting business continuity."
    },
    {
        icon: <FaDatabase />, title: "Big Data Solutions", dark: false,
        desc: "Custom visualization engines and data processing pipelines designed to turn vast datasets into actionable business intelligence."
    },
    {
        icon: <FaShieldAlt />, title: "Enterprise Security", dark: true,
        desc: "Bank-grade security protocols, OAuth implementation, and regular penetration testing to protect your intellectual property."
    },
];

const techStack = [
    {
        col: "Frontend", colIcon: <FaLayerGroup />, items: [
            { icon: <FaReact />, name: "React & Next.js", sub: "Dynamic UI & SSR" },
            { icon: <SiTypescript />, name: "TypeScript", sub: "Type-safe development" },
            { icon: <SiTailwindcss />, name: "Tailwind CSS", sub: "Modern utility styling" },
        ]
    },
    {
        col: "Backend", colIcon: <FaServer />, items: [
            { icon: <FaNodeJs />, name: "Node.js", sub: "Scalable event-driven I/O" },
            { icon: <SiDjango />, name: "Python / Django", sub: "Robust logic & AI ready" },
            { icon: <SiGo />, name: "Go Lang", sub: "High-performance systems" },
        ]
    },
    {
        col: "Database", colIcon: <FaDatabase />, items: [
            { icon: <SiPostgresql />, name: "PostgreSQL", sub: "Relational data integrity" },
            { icon: <SiMongodb />, name: "MongoDB", sub: "Flexible document storage" },
            { icon: <SiRedis />, name: "Redis", sub: "Ultra-fast in-memory cache" },
        ]
    },
];

const secItems = [
    { icon: <FaLock />, title: "End-to-End Encryption", desc: "AES-256 data-at-rest and TLS 1.3 in-transit encryption standard across all endpoints." },
    { icon: <FaCheckSquare />, title: "Compliance Readiness", desc: "SOC2 Type II, HIPAA, and GDPR compliant infrastructure as code (IaC) templates." },
    { icon: <FaUserShield />, title: "Zero-Trust IAM", desc: "Multi-factor authentication and role-based access control with least-privilege principles." },
    { icon: <FaSyncAlt />, title: "Auto-Patching", desc: "Autonomous vulnerability scanning and automated security patching pipelines." },
];

const processNodes = [
    { icon: <FaSearch />, label: "DISCOVERY" },
    { icon: <FaCompass />, label: "PLANNING" },
    { icon: <FaCode />, label: "BUILD" },
    { icon: <FaVial />, label: "QA & TEST" },
    { icon: <FaRocket />, label: "DEPLOY" },
    { icon: <FaLifeRing />, label: "SUPPORT" },
];

const whyCards = [
    {
        icon: <FaCommentDots />, title: "Transparent Communication",
        desc: "Real-time project dashboards and direct Slack access to lead engineers. No middlemen, no surprises."
    },
    {
        icon: <FaChartLine />, title: "Scalable Infrastructure",
        desc: "We build with 10x growth in mind. Our architectures handle millions of requests without breaking a sweat."
    },
    {
        icon: <FaShieldAlt />, title: "Expert Engineering",
        desc: "Our team consists of former Big Tech architects who specialise in secure, high-availability systems."
    },
];

const faqData = [
    {
        question: "What is your typical project timeline?",
        answer: "Most projects range between 4–12 weeks depending on scope, complexity, and integrations required."
    },
    {
        question: "How do you handle post-launch support?",
        answer: "We offer ongoing maintenance packages including monitoring, bug fixes, performance optimisation and feature upgrades."
    },
    {
        question: "Can you integrate with our existing stack?",
        answer: "Yes. We specialise in integrating with modern and legacy systems including REST APIs, GraphQL and cloud services."
    },
    {
        question: "What industries do you specialise in?",
        answer: "We work across SaaS, FinTech, HealthTech, eCommerce, Enterprise Platforms and high-scale startups."
    },
];

/* ─── Component ─────────────────────────────────── */
export default function AppDevelopment() {
    /* Counters */
    const [users, setUsers] = useState(0);
    const [retention, setRetention] = useState(0);
    const [growth, setGrowth] = useState(0);

    useEffect(() => {
        let u = 0, r = 0, g = 0;
        const iv = setInterval(() => {
            if (u < 50) u++; if (r < 95) r++; if (g < 10) g++;
            setUsers(u); setRetention(r); setGrowth(g);
            if (u === 50 && r === 95 && g === 10) clearInterval(iv);
        }, 40);
        return () => clearInterval(iv);
    }, []);

    /* FAQ */
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleFAQ = (i) => setActiveIndex(activeIndex === i ? null : i);

    return (
        <div className="apd-appdev-wrapper">

            {/* ══════════ HERO ══════════ */}
            <section className="apd-hero-section">
                <div className="apd-hero-glow" />
                <div className="container">
                    <div className="row align-items-center g-5">

                        {/* Left */}
                        <div className="col-lg-6">
                            <div className="apd-premium-badge mb-4">✦ Premium Service</div>
                            <h1 className="apd-hero-title mb-4">
                                Social Media <br />
                                <span>App Development</span>
                            </h1>
                            <p className="apd-hero-desc mb-5">
                                Build, Launch, and Scale. We craft avant-garde social platforms
                                with high-end, futuristic aesthetics for the next generation.
                            </p>
                            <div className="d-flex flex-wrap gap-3 mb-5">
                                <button className="apd-primary-btn">Start Project</button>
                                <button className="apd-secondary-btn">View Portfolio</button>
                            </div>
                            <div className="apd-hero-stats">
                                <div className="apd-stat-box">
                                    <span className="apd-stat-title">Active Users</span>
                                    <h3>{users}M+</h3>
                                    <p className="apd-stat-green"><FaChartLine className="apd-stat-icon" /> +15% Growth</p>
                                </div>
                                <div className="apd-stat-box">
                                    <span className="apd-stat-title">Retention</span>
                                    <h3>{retention}%</h3>
                                    <p className="apd-stat-green"><FaCheckCircle className="apd-stat-icon" /> Top Tier</p>
                                </div>
                                <div className="apd-stat-box">
                                    <span className="apd-stat-title">Growth</span>
                                    <h3>{growth}x</h3>
                                    <p className="apd-stat-green "><FaBolt className="apd-stat-icon" /> Accelerated</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — phone mockup */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            <div className="apd-phone-wrapper">
                                <div className="apd-orbit apd-orbit1" />
                                <div className="apd-orbit apd-orbit2" />
                                <div className="apd-phone">
                                    <h4>App Development</h4>
                                    <img src={robot} alt="App visual" />
                                    <div className="apd-phone-card" />
                                </div>
                                <div className="apd-floating-icon apd-icon1"><FaHeart /></div>
                                <div className="apd-floating-icon apd-icon2"><FaCommentDots /></div>
                                <div className="apd-floating-icon apd-icon3"><FaShareAlt /></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════ CAPABILITIES ══════════ */}
            <section className="apd-capabilities">
                <div className="container">
                    {/* Top row */}
                    <div className="row align-items-end mb-0 pb-0 g-4">
                        <div className="col-lg-6">
                            <span className="apd-cap-label">Our Capabilities</span>
                            <h2 className="apd-cap-heading">
                                Engineering the Future<br />of Social Engagement
                            </h2>
                        </div>
                        <div className="col-lg-5">
                            <p className="apd-cap-desc mb-0">
                                Our boutique agency blends cutting-edge technology with disruptive
                                design for modern digital products.
                            </p>
                        </div>
                    </div>

                    <div className="apd-cap-divider" />

                    {/* Grid — 3 cols desktop, 2 tablet, 1 mobile */}
                    <div className="row g-0 apd-cap-grid p-0">
                        {capCards.map((c, i) => (
                            <div className="col-12 col-md-6 col-lg-4" key={i}>
                                <div className={`apd-cap-card h-100${c.dark ? " apd-dark" : ""}`}>
                                    <div className="apd-cap-icon">{c.icon}</div>
                                    <h4>{c.title}</h4>
                                    <p>{c.desc}</p>
                                    <div className="apd-card-line" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ TECH STACK ══════════ */}
            <section className="apd-tech-stack">
                <div className="container">
                    <div className="apd-tech-header">
                        <span className="apd-tech-label">Tech Stack</span>
                        <h2>Our Modern Tech Ecosystem</h2>
                        <p>
                            We leverage the latest and most reliable technologies to build products
                            that are fast, secure, and future-proof.
                        </p>
                    </div>
                    <div className="row g-3 justify-content-center">
                        {techStack.map((col, ci) => (
                            <div className="col-12 col-md-6 col-lg-4" key={ci}>
                                <div className="apd-tech-column">
                                    <div className="apd-tech-column-title">
                                        <span className="apd-tech-main-icon">{col.colIcon}</span>
                                        <span>{col.col}</span>
                                    </div>
                                    {col.items.map((item, ii) => (
                                        <div className="apd-tech-item" key={ii}>
                                            <span className="apd-tech-item-icon">{item.icon}</span>
                                            <div>
                                                <strong>{item.name}</strong>
                                                <small>{item.sub}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ SECURITY CORE ══════════ */}
            <section className="apd-security-core">
                <div className="container">
                    <div className="apd-security-inner">
                        <div className="row align-items-center g-5 position-relative" style={{ zIndex: 1 }}>

                            {/* Left */}
                            <div className="col-lg-6">
                                <span className="apd-security-label">
                                    <FaShieldAlt className="apd-label-icon" /> Security Core
                                </span>
                                <h2 className="apd-security-left">Hardened Architecture for Critical Data</h2>
                                <div className="apd-security-grid">
                                    {secItems.map((s, i) => (
                                        <div className="apd-security-item" key={i}>
                                            <span className="apd-security-icon">{s.icon}</span>
                                            <div>
                                                <h4>{s.title}</h4>
                                                <p>{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right — animation */}
                            <div className="col-lg-6 apd-security-right">
                                <div className="apd-security-animation-container">
                                    <div className="apd-security-ring apd-ring-outer" />
                                    <div className="apd-security-ring apd-ring-middle" />
                                    <div className="apd-security-ring apd-ring-inner" />
                                    <div className="apd-security-center">
                                        <div className="apd-shield-glow" />
                                        <FaShieldAlt className="apd-center-shield-icon" />
                                        <span className="apd-secure-text">SECURE</span>
                                    </div>
                                    <div className="apd-security-orbit">
                                        <div className="apd-orbit-item apd-item-1"><div className="apd-orbit-box"><FaKey /></div></div>
                                        <div className="apd-orbit-item apd-item-2"><div className="apd-orbit-box"><FaFingerprint /></div></div>
                                        <div className="apd-orbit-item apd-item-3"><div className="apd-orbit-box"><FaShieldAlt /></div></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ DEVELOPMENT PROCESS ══════════ */}
            <section className="apd-process-section">
                <div className="container">
                    <div className="row align-items-center g-5">

                        {/* Left — dial */}
                        <div className="col-lg-6 apd-process-left">
                            <div className="apd-process-circle-wrapper">
                                <div className="apd-process-ring apd-ring1" />
                                <div className="apd-process-ring apd-ring2" />
                                <div className="apd-process-center">
                                    <h3>PHASE DIAL</h3>
                                    <p>Proprietary agile lifecycle optimised for high-risk enterprise scale.</p>
                                </div>
                                <div className="apd-orbit-wrapper">
                                    {processNodes.map((n, i) => (
                                        <div className={`apd-process-node apd-node${i + 1}`} key={i}>
                                            {n.icon}<span>{n.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right — text */}
                        <div className="col-lg-6 apd-process-right">
                            <span className="apd-process-label">Our Process</span>
                            <h2>Our Development Process</h2>
                            <p className="apd-process-description">
                                We combine the speed of startups with the stability of established
                                institutions through our proprietary Phase-Dial lifecycle management.
                            </p>
                            <div className="apd-process-cards">
                                <div className="apd-process-card">
                                    <h4>Requirement Analysis</h4>
                                    <p>Every sprint starts with a deep dive into functional and non-functional requirements.</p>
                                </div>
                                <div className="apd-process-card">
                                    <h4>Agile Sprints</h4>
                                    <p>2-week development cycles with continuous integration and stakeholder feedback.</p>
                                </div>
                            </div>
                            <button className="apd-process-btn">View Process Documentation →</button>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════ WHY CHOOSE US ══════════ */}
            <section className="apd-why-section">
                <div className="container">
                    <div className="row mb-5 align-items-end g-4">
                        <div className="col-lg-6">
                            <h2 className="apd-why-heading mb-2">Why Choose Us</h2>
                            <p className="apd-why-sub mb-0">
                                We don't just build software — we engineer growth engines designed
                                for scale, security, and sustained performance.
                            </p>
                        </div>
                    </div>
                    <div className="row g-3">
                        {whyCards.map((c, i) => (
                            <div className="col-12 col-md-4" key={i}>
                                <div className="apd-why-card">
                                    <div className="apd-why-icon">{c.icon}</div>
                                    <h3>{c.title}</h3>
                                    <p>{c.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ FAQ ══════════ */}
            <section className="apd-faq-section">
                <div className="container">
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-lg-7">
                            <h2 className="apd-faq-title mb-3">Frequently Asked Questions</h2>
                            <p className="apd-faq-subtitle mb-0">
                                Everything you need to know about our partnership model.
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="d-flex flex-column gap-3">
                                {faqData.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`apd-faq-item${activeIndex === i ? " apd-active" : ""}`}
                                        onClick={() => toggleFAQ(i)}
                                    >
                                        <div className="apd-faq-question">
                                            <span>{item.question}</span>
                                            <span className="apd-faq-icon">
                                                {activeIndex === i ? "−" : "⌄"}
                                            </span>
                                        </div>
                                        {activeIndex === i && (
                                            <div className="apd-faq-answer">{item.answer}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <CTA />
            </section>

        </div>
    );
}