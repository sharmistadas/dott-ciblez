import React, { useState, useEffect } from "react";
import {
    FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter,
    FaBullhorn, FaPen, FaUsers, FaRocket,
    FaCheckCircle, FaChartLine, FaSearch, FaCompass, FaCode
} from "react-icons/fa";
import "../CSS/SocialMediaMarketing.css";

import image1 from "../assets/iamge1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.png";
import image12 from "../assets/image12.png";
import image13 from "../assets/image13.png";
import image14 from "../assets/image14.png";
import image15 from "../assets/image15.png";
import worldImg from "../assets/world.png";

/* ─── Data ──────────────────────────────────── */
const services = [
    { icon: <FaBullhorn />, title: "Paid Advertising", desc: "Hyper-targeted campaigns across Facebook, Instagram, and LinkedIn to maximise your ROI." },
    { icon: <FaPen />, title: "Content Strategy", desc: "Data-driven content pillars designed to engage your audience and build brand authority." },
    { icon: <FaUsers />, title: "Community Management", desc: "Real-time engagement with your followers to turn them into loyal brand advocates." },
    { icon: <FaRocket />, title: "Growth Hacking", desc: "Innovative tactics to scale your social footprint rapidly and sustainably." },
];

const processSteps = [
    { num: "01", title: "Discovery", desc: "Deep dive into your business goals, target audience and competitors." },
    { num: "02", title: "Strategy", desc: "Crafting a bespoke roadmap focused on ROI and scalable results." },
    { num: "03", title: "Launch", desc: "Execution of campaigns with precision and real-time monitoring." },
    { num: "04", title: "Growth", desc: "Continuous optimisation based on data to scale your success." },
];

const allTools = [
    { img: image4, category: "ADVERTISING" },
    { img: image5, category: "ADVERTISING" },
    { img: image6, category: "ANALYTICS" },
    { img: image7, category: "ANALYTICS" },
    { img: image8, category: "ANALYTICS" },
    { img: image9, category: "AUTOMATION" },
    { img: image10, category: "AUTOMATION" },
    { img: image11, category: "AUTOMATION" },
    { img: image12, category: "CONTENT" },
    { img: image13, category: "CONTENT" },
    { img: image14, category: "CONTENT" },
    { img: image15, category: "CONTENT" },
];

const tabs = ["ALL", "ADVERTISING", "ANALYTICS", "AUTOMATION", "CONTENT"];

const plans = [
    {
        name: "Starter", price: "$999", suffix: "/mo", popular: false,
        features: ["SEO Foundation", "3 Social Posts Weekly", "Basic Monthly Report"],
        cta: "Choose Starter", ctaStyle: "outline",
    },
    {
        name: "Pro", price: "$2,499", suffix: "/mo", popular: true,
        features: ["Advanced SEO & Backlinks", "Daily Social Management", "PPC Campaign Audit", "Dedicated Manager"],
        cta: "Get Pro Plan", ctaStyle: "primary",
    },
    {
        name: "Enterprise", price: "Custom", suffix: "", popular: false,
        features: ["Full Omni-channel Strategy", "Content Production Studio", "24/7 Priority Support"],
        cta: "Contact Sales", ctaStyle: "outline",
    },
];

const stories = [
    { tag: "K-12 Education", title: "EduTech Academy", img: image1 },
    { tag: "Corporate Training", title: "Corporate Learning Hub", img: image2 },
    { tag: "Higher Education", title: "University Online", img: image3 },
];

const orbitIcons = [
    { icon: <FaFacebookF className="facebook-blue-icon" />, start: "270deg" },
    { icon: <FaInstagram className="instagram-pink-icon" />, start: "0deg" },
    { icon: <FaLinkedinIn className="linkedin-blue-icon" />, start: "90deg" },
    { icon: <FaTwitter className="twitter-sky-icon" />, start: "180deg" },
];

/* ─── Component ─────────────────────────────── */
export default function SocialMediaMarketing() {

    /* Counters */
    const [projects, setProjects] = useState(0);
    const [growthCount, setGrowthCount] = useState(0);
    const [reach, setReach] = useState(0);

    useEffect(() => {
        let p = 0, g = 0, r = 0;
        const iv = setInterval(() => {
            if (p < 500) p += 10;
            if (g < 150) g += 3;
            if (r < 12) r += 1;
            setProjects(p); setGrowthCount(g); setReach(r);
            if (p >= 500 && g >= 150 && r >= 12) clearInterval(iv);
        }, 25);
        return () => clearInterval(iv);
    }, []);

    /* Tool filter */
    const [activeTab, setActiveTab] = useState("ALL");
    const filteredTools = activeTab === "ALL"
        ? allTools
        : allTools.filter(t => t.category === activeTab);

    return (
        <div className="landing-page">

            {/* ══════════════ HERO ══════════════ */}
            <section className="smm-hero">
                <div className="smm-hero-glow" />
                <div className="container">
                    <div className="row align-items-center g-5">

                        {/* Left */}
                        <div className="col-lg-6">
                            <div className="smm-eyebrow mb-3">
                                <span className="smm-eyebrow-dot" />
                                Social Media Marketing
                            </div>
                            <h1 className="smm-hero-title mb-4">
                                Social Media Marketing That<br />
                                Drives <span>Real Business Growth</span>
                            </h1>
                            <p className="smm-hero-desc">
                                We blend data-driven strategies with cutting-edge creative to
                                transform your social presence into a powerful revenue engine.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <button className="smm-btn-primary">Start Your Audit</button>
                                <button className="smm-btn-outline">View Case Studies</button>
                            </div>
                        </div>

                        {/* Right — orbit visual */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            <div className="smm-orbit-wrap">
                                <div className="orbit-ring outer" />

                                {/* Globe */}
                                <div className="smm-globe">
                                    <div className="smm-globe-img">
                                        <img src={worldImg} alt="globe" />
                                    </div>
                                    <div className="smm-globe-text">
                                        <span className="globe-label-top">SOCIAL</span>
                                        <span className="globe-main">MEDIA</span>
                                        <span className="globe-label-bot">MARKETING</span>
                                    </div>
                                </div>

                                {/* Orbiting icons */}
                                <div className="smm-orbit-icons">
                                    {orbitIcons.map((o, i) => (
                                        <div
                                            key={i}
                                            className="orbit-item"
                                            style={{ "--start": o.start, "--radius": "220px", "--speed": "40s" }}
                                        >
                                            <div className="orbit-icon-circle">{o.icon}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════ STATS ══════════════ */}
            <section className="smm-stats">
                <div className="container-fluid px-0">
                    <div className="smm-stats-inner">
                        {[
                            { num: `${projects}+`, label: "Global Projects" },
                            { num: `${growthCount}%`, label: "Avg. Growth" },
                            { num: `${reach}M+`, label: "Total Reach" },
                            { num: "24/7", label: "Expert Support" },
                        ].map((s, i) => (
                            <div className="stat-item" key={i}>
                                <span className="stat-number">{s.num}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════ SERVICES ══════════════ */}
            <section className="smm-services">
                <div className="container">
                    <div className="smm-section-header">
                        <div className="smm-eyebrow">
                            <span className="smm-eyebrow-dot" /> What We Offer
                        </div>
                        <h2 className="smm-section-title mt-3">Our <span className="smm-title-accent">Services</span></h2>
                        <div className="smm-underline" />
                    </div>
                    <div className="row g-2">
                        {services.map((s, i) => (
                            <div className="col-sm-6 col-lg-3" key={i}>
                                <div className="service-card">
                                    <div className="service-icon">{s.icon}</div>
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════ PROCESS ══════════════ */}
            <section className="smm-process">
                <div className="container">
                    <div className="smm-section-header">
                        <div className="smm-eyebrow">
                            <span className="smm-eyebrow-dot" /> How We Work
                        </div>
                        <h2 className="smm-section-title mt-3">Our Growth <span className="smm-title-accent">Process</span></h2>
                        <div className="smm-underline" />
                    </div>

                    <div className="smm-timeline-wrap">
                        {/* Desktop connecting line */}
                        <div className="smm-timeline-line d-none d-md-block" />
                        <div className="row g-3 g-md-0">
                            {processSteps.map((step, i) => (
                                <div className="col-12 col-md-3" key={i}>
                                    <div className="timeline-step">
                                        <div className="circle">{step.num}</div>
                                        <div>
                                            <h4>{step.title}</h4>
                                            <p>{step.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ TOOLS ══════════════ */}
            <section className="smm-tools">
                <div className="container">
                    <div className="tools-header smm-section-header">
                        <div className="smm-eyebrow">
                            <span className="smm-eyebrow-dot" /> Integrations
                        </div>
                        <h2 className="mt-3">Marketing Tools</h2>
                        <h3>We Master</h3>
                        <p>
                            Connect and manage your favourite digital marketing platforms
                            seamlessly within our high-performance ecosystem. Built for scale.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="tools-tabs">
                        {tabs.map(t => (
                            <button
                                key={t}
                                className={activeTab === t ? "active" : ""}
                                onClick={() => setActiveTab(t)}
                            >
                                {t === "ALL" ? "All Tools" : t.charAt(0) + t.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="row g-3">
                        {filteredTools.map((tool, i) => (
                            <div className="col-6 col-sm-4 col-md-3" key={i}>
                                <div className="tool-card">
                                    <img src={tool.img} alt="tool logo" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════ PRICING ══════════════ */}
            <section className="smm-pricing">
                <div className="container">
                    <div className="smm-section-header">
                        <div className="smm-eyebrow">
                            <span className="smm-eyebrow-dot" /> Pricing
                        </div>
                        <h2 className="smm-section-title mt-3">Simple, <span className="smm-title-accent">Transparent</span> Pricing</h2>
                        <div className="smm-underline" />
                    </div>

                    <div className="row g-3 justify-content-center align-items-stretch">
                        {plans.map((plan, i) => (
                            <div className="col-12 col-md-6 col-lg-4" key={i}>
                                <div className={`pricing-card${plan.popular ? " popular" : ""}`}>
                                    {plan.popular && <div className="popular-tag">Most Popular</div>}
                                    <p className="plan">{plan.name}</p>
                                    <h3 className={`price${plan.price === "Custom" ? " custom" : ""}`}>
                                        {plan.price}
                                        {plan.suffix && <span>{plan.suffix}</span>}
                                    </h3>
                                    <ul className="pricing-features">
                                        {plan.features.map((f, fi) => (
                                            <li key={fi}>
                                                <FaCheckCircle className="tick-icon" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    {plan.ctaStyle === "primary"
                                        ? <button className="btn-primary">{plan.cta}</button>
                                        : <button className="btn-outline">{plan.cta}</button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════ SUCCESS STORIES ══════════════ */}
            <section className="smm-stories">
                <div className="container">
                    <div className="smm-section-header">
                        <div className="smm-eyebrow">
                            <span className="smm-eyebrow-dot" /> Case Studies
                        </div>
                        <h2 className="smm-section-title mt-3">Our <span className="smm-title-accent">Success Stories</span></h2>
                        <div className="smm-underline" />
                    </div>

                    <div className="row g-3">
                        {stories.map((s, i) => (
                            <div className="col-12 col-md-6 col-lg-4" key={i}>
                                <div className="story-card">
                                    <div className="story-img-wrapper">
                                        <img src={s.img} alt={s.title} />
                                    </div>
                                    <div className="story-content">
                                        <span className="badge-blue">{s.tag}</span>
                                        <h4>{s.title}</h4>
                                        <p>
                                            Scaling personalised learning paths for thousands of students
                                            across multiple districts with AI-driven insights.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}