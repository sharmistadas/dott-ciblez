import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/SoftwareDesign.css";

const stats = [
    { label: "Projects Delivered", target: 500, prefix: "", suffix: "+", decimals: 0 },
    { label: "Client Satisfaction", target: 98, prefix: "", suffix: "%", decimals: 0 },
    { label: "Conversion Boost", target: 150, prefix: "", suffix: "%", decimals: 0 },
    { label: "Avg. Delivery Time", target: 4, prefix: "2-", suffix: " wks", decimals: 0 },
];

const services = [
    { title: "UI/UX Design", icon: "bi-layers", desc: "Crafting intuitive interfaces that users love. We transform complex workflows into seamless digital experiences." },
    { title: "Mobile App Design", icon: "bi-phone", desc: "Functional and aesthetically pleasing mobile-specific user interfaces built for iOS and Android." },
    { title: "User Research", icon: "bi-search", desc: "Deep dive into user behaviour through interviews, surveys, and structured usability testing." },
    { title: "Web Design", icon: "bi-window", desc: "Responsive, modern and performance-centred web design engineered for conversions." },
    { title: "Design Systems", icon: "bi-grid-1x2", desc: "A consistent design language with reusable components, colour palettes and type scales." },
    { title: "Prototyping", icon: "bi-lightning-charge", desc: "High-fidelity interactive models that validate user flow before a single line of code is written." },
];

const steps = [
    { id: "01", title: "Discovery", icon: "bi-search", label: "Research Insights", desc: "Deep dive into your business goals, user needs, and market landscape. We define the problem space and set clear KPIs for success.", emoji: "🔍" },
    { id: "02", title: "Wireframing", icon: "bi-grid-1x2", label: "System Architecture", desc: "Architecting the user flow and low-fidelity structures. We focus on usability and core functionality before introducing visual noise.", emoji: "📐" },
    { id: "03", title: "Visual Design", icon: "bi-palette", label: "UI Components", desc: "Bringing the brand to life with high-fidelity UI. We apply colour theory, typography, and motion design to create an immersive experience.", emoji: "🎨" },
    { id: "04", title: "Prototype", icon: "bi-cursor", label: "User Testing", desc: "Building interactive models for user testing and final sign-off. We ensure the product feels as good as it looks before handoff.", emoji: "🖱️" },
];

const tools = [
    { name: "Figma", subtitle: "UI/UX Design", icon: "bi-bezier" },
    { name: "Adobe XD", subtitle: "Prototyping", icon: "bi-layers" },
    { name: "Sketch", subtitle: "Vector Graphics", icon: "bi-pencil-square" },
    { name: "InVision", subtitle: "Collaboration", icon: "bi-people" },
    { name: "Framer", subtitle: "Interactions", icon: "bi-circle-half" },
    { name: "Principle", subtitle: "Motion Design", icon: "bi-magic" },
    { name: "After Effects", subtitle: "Visual FX", icon: "bi-film" },
    { name: "Photoshop", subtitle: "Raster Editing", icon: "bi-camera" },
    { name: "Illustrator", subtitle: "Asset Creation", icon: "bi-vector-pen" },
    { name: "Zeplin", subtitle: "Dev Handoff", icon: "bi-code-square" },
    { name: "Maze", subtitle: "User Testing", icon: "bi-headset" },
    { name: "Webflow", subtitle: "Implementation", icon: "bi-code" },
];

export default function SoftwareDesign() {
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
        <div>
            <section className="sd-hero-section">
                <div className="sd-hero-blur-glow" />
                <div className="sd-hero-blur-glow-2" />

                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 sd-hero-text-col">
                            <div className="sd-section-eyebrow mb-4">
                                <span className="sd-dot-pulse" />
                                Elevate Your Product
                            </div>

                            <h1 className="sd-hero-title mb-4">
                                <span className="sd-software-text">Software</span>
                                <span className="sd-design-title-text">Design</span>
                            </h1>

                            <p className="sd-hero-desc mb-5">
                                Crafting intuitive interfaces that users love. We transform
                                complex workflows into seamless, premium digital experiences
                                through editorial-grade design.
                            </p>

                            <div className="d-flex flex-wrap gap-3">
                                <button className="btn sd-hero-primary-btn">
                                    Start Design Project
                                </button>
                                <button className="btn sd-hero-white-btn">
                                    View Portfolio
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-6 sd-mockup-col">
                            <div className="sd-mockup-container-main">
                                <div className="sd-browser-mockup">
                                    <div className="sd-browser-header">
                                        <span className="sd-browser-dot sd-dot-red" />
                                        <span className="sd-browser-dot sd-dot-yellow" />
                                        <span className="sd-browser-dot sd-dot-green" />
                                        <div className="sd-browser-address" />
                                    </div>
                                    <div className="sd-browser-content">
                                        {[
                                            { icon: "bi-bar-chart-line", color: "#233dfe" },
                                            { icon: "bi-layers", color: "#7c3aed" },
                                            { icon: "bi-stars", color: "#0891b2" },
                                        ].map((m, i) => (
                                            <div className="sd-mockup-card" key={i}>
                                                <div className="sd-mockup-icon-box">
                                                    <i className={`bi ${m.icon}`} style={{ color: m.color }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="sd-browser-footer">
                                        <div className="sd-skeleton-line" style={{ width: "72%" }} />
                                        <div className="sd-skeleton-line" style={{ width: "48%" }} />
                                    </div>
                                </div>

                                <div className="sd-floating-stat-circle">
                                    <i className="bi bi-graph-up-arrow text-primary fs-5 mb-1 d-block text-center" />
                                    <div className="sd-stats-value">+24%</div>
                                    <div className="sd-stats-label">Growth</div>
                                </div>

                                <div className="sd-floating-blue-card rounded-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <i className="bi bi-shield-check text-white fs-5" />
                                        <span className="badge bg-white-transparent text-white" style={{ fontSize: "0.6rem" }}>SECURED</span>
                                    </div>
                                    <div className="sd-client-trust-text">Client Trust</div>
                                    <div className="fw-bold text-white" style={{ fontSize: "0.95rem" }}>Encrypted Design</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sd-stats-section" ref={statsSectionRef}>
                <div className="container-fluid px-0">
                    <div className="sd-stats-grid">
                        {stats.map((s, i) => (
                            <div className="sd-stat-card" key={i}>
                                <p className="sd-stat-label-text mb-2">{s.label}</p>
                                <h2 className="mb-0">{formatStatValue(s, animatedStats[i])}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sd-services-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <div className="sd-section-eyebrow mb-3">
                            <span className="sd-dot-pulse" />
                            What We Offer
                        </div>
                        <h2 className="sd-section-title fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                            Specialised Design Services
                        </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "560px", fontSize: "1rem", lineHeight: "1.7" }}>
                            High-end design solutions tailored to your business needs from
                            initial research to high-fidelity prototypes.
                        </p>
                    </div>

                    <div className="row g-4">
                        {services.map((s, i) => (
                            <div className="col-sm-6 col-lg-4" key={i}>
                                <div className="sd-service-card">
                                    <div className="sd-service-icon-box">
                                        <i className={`bi ${s.icon}`} />
                                    </div>
                                    <h5 className="fw-bold mb-2" style={{ fontSize: "1rem" }}>{s.title}</h5>
                                    <p className="text-muted mb-0" style={{ fontSize: "0.875rem", lineHeight: "1.65" }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sd-methodology-section">
                <div className="container">
                    <div className="text-center mb-0">
                        <div className="sd-section-eyebrow mb-3">
                            <span className="sd-dot-pulse" />
                            Our Methodology
                        </div>
                        <h2 className="sd-section-title fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                            Our Design Process
                        </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "1rem", lineHeight: "1.7" }}>
                            A transparent and iterative approach to building high-end software
                            that scales with your ambition.
                        </p>
                    </div>

                    <div className="sd-process-timeline">
                        {steps.map((step, i) => {
                            const isRight = i % 2 !== 0;
                            return (
                                <div
                                    className={`sd-process-item${isRight ? " sd-right" : ""}`}
                                    key={i}
                                >
                                    <div className="sd-process-text-side">
                                        <span className="sd-process-number-stroke">{step.id}</span>
                                        <h3 className="sd-method-step-title">{step.title}</h3>
                                        <p className="sd-method-step-desc">{step.desc}</p>
                                    </div>

                                    <div className="sd-process-marker-container">
                                        <div className="sd-process-marker-circle">
                                            <i className={`bi ${step.icon}`} />
                                        </div>
                                    </div>

                                    <div className="sd-process-visual-side">
                                        <div className="sd-method-card-container">
                                            <div className="sd-method-main-card">
                                                <div className="sd-method-img-wrapper">
                                                    <div className="sd-img-placeholder">
                                                        <span style={{ fontSize: "3rem" }}>{step.emoji}</span>
                                                    </div>
                                                </div>
                                                <span className="sd-process-tag-label">{step.label}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="sd-tools-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <div className="sd-section-eyebrow mb-3">
                            <span className="sd-dot-pulse" />
                            Our Expertise
                        </div>
                        <h2 className="fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#233dfe" }}>
                            Design Tools We Master
                        </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "560px", fontSize: "1rem", lineHeight: "1.7" }}>
                            Our designers use industry-leading technologies to bring your
                            vision to life with precision and scale.
                        </p>
                    </div>

                    <div className="row g-3 justify-content-center">
                        {tools.map((t, i) => (
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={i}>
                                <div className="sd-tool-card text-center">
                                    <div className="sd-tool-icon-box justify-content-center">
                                        <i className={`bi ${t.icon}`} />
                                    </div>
                                    <p className="sd-tool-name mb-1">{t.name}</p>
                                    <p className="sd-tool-subtitle mb-0">{t.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sd-cta-section">
                <div className="container">
                    <div className="sd-cta-inner">
                        <div className="sd-cta-content">
                            <div className="sd-section-eyebrow mb-4 justify-content-center" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                                <span style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%", display: "inline-block" }} />
                                Let's Build Together
                            </div>
                            <h2 className="fw-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                                Ready to start your next project?
                            </h2>
                            <p className="mb-5 mx-auto" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "560px", fontSize: "1rem", lineHeight: "1.75" }}>
                                Let's build something extraordinary together. Our team is ready
                                to scale your product to the next level using industry-leading
                                design methods.
                            </p>
                            <button className="sd-btn-white-cta btn">
                                Start a Conversation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
