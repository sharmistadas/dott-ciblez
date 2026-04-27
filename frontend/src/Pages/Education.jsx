import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/education.css";

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

export default function Education() {
    return (
        <div className="education-wrapper">
            {/* ================= HERO SECTION ================= */}
            <section className="se-hero-section container py-5">
                <div className="row align-items-center">
                    {/* LEFT SIDE */}
                    <div className="col-lg-6">
                        <div className="premium-badge mb-3">
                            <i className="bi bi-stars me-2"></i>
                            PREMIUM SERVICE
                        </div>

                        <h1 className="hero-title">
                            Next Education <br />
                            <span className="text-primary-color">Software</span>
                        </h1>

                        <h2 className="hero-subtitle mt-3">
                            Innovative E-Learning Platforms for Modern Education
                        </h2>

                        <p className="hero-description mt-3">
                            Transform education with cutting-edge learning management systems,
                            virtual classrooms, and interactive content delivery platforms.
                            Built for schools, universities, and corporate training.
                        </p>

                        <button className="btn hero-btn mt-4 shadow-sm">
                            Start Building <i className="bi bi-arrow-right-short ms-1"></i>
                        </button>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-lg-6 position-relative mt-5 mt-lg-0 text-center">
                        <div className="hero-img-container">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                                alt="students"
                                className="hero-img img-fluid shadow-lg"
                            />

                            {/* Floating Cards */}
                            <div className="floating-card students-card shadow animate-float">
                                <div className="icon-circle-white">
                                    <div className="circle-inner pink-bg">
                                        <i className="bi bi-people"></i>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <small className="text-muted text-uppercase fw-bold">
                                        Students
                                    </small>
                                    <h6 className="mb-0 fw-bold">
                                        <Counter value={2} suffix="M+" />
                                    </h6>
                                </div>
                            </div>

                            <div className="floating-card engagement-card shadow animate-float-reverse">
                                <div className="icon-circle-white text-primary">
                                    <div className="circle-inner purple-bg">
                                        <i className="bi bi-graph-up-arrow"></i>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <small className="text-muted text-uppercase fw-bold">
                                        ENGAGEMENT
                                    </small>
                                    <h6 className="mb-0 fw-bold">
                                        <Counter value={85} suffix="%" />
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= STATS ================= */}
            <section className="container py-5">
                <div className="row g-3">
                    {[
                        { label: "Active Students", num: 2, suffix: "M+", trend: "+15% YoY" },
                        { label: "Uptime", num: 99.5, suffix: "%", decimals: 1, trend: "Reliable" },
                        { label: "Engagement", num: 85, suffix: "%", trend: "+12% Monthly" },
                        { label: "Access", value: "24/7", trend: "Full Support" },
                    ].map((item, i) => (
                        <div className="col-md-6 col-lg-3" key={i}>
                            <div className="stats-card text-center p-4">
                                <small className="text-uppercase fw-bold text-muted d-block mb-2">
                                    {item.label}
                                </small>
                                <h3 className="fw-bold mb-2 trend-value">
                                    {item.num ? (
                                        <Counter value={item.num} suffix={item.suffix} decimals={item.decimals} />
                                    ) : (
                                        item.value
                                    )}
                                </h3>
                                <span className="trend-text">{item.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="container py-5 text-center">
                <h5 className="Platform-text fw-bold mb-2">Platform Features</h5>
                <h2 className="platform-title fw-bold">
                    Everything you need to manage a world-class educational institution in
                    one place.
                </h2>

                <div className="row g-3 mt-4">
                    {[
                        {
                            title: "Learning Management System",
                            icon: "bi-layout-text-window",
                            color: "#6366f1",
                        },
                        {
                            title: "Virtual Classroom",
                            icon: "bi-camera-video",
                            color: "#ec4899",
                        },
                        {
                            title: "Content Management",
                            icon: "bi-file-earmark-text",
                            color: "#f59e0b",
                        },
                        {
                            title: "Analytics & Reporting",
                            icon: "bi-bar-chart-line",
                            color: "#10b981",
                        },
                        { title: "Gamification", icon: "bi-controller", color: "#8b5cf6" },
                        { title: "Parent Portal", icon: "bi-people", color: "#3b82f6" },
                    ].map((feature, i) => (
                        <div className="col-md-6 col-lg-4" key={i}>
                            <div className="feature-card text-start p-4">
                                <div
                                    className="feature-icon-wrapper mb-4"
                                    style={{
                                        backgroundColor: `${feature.color}15`,
                                        color: feature.color,
                                    }}
                                >
                                    <i className={`bi ${feature.icon}`}></i>
                                </div>
                                <h5 className="fw-bold mb-3">{feature.title}</h5>
                                <p className="text-muted small">
                                    Complete solution with cross-platform support, management,
                                    assessments, planning and program tracking.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= DEPLOYMENT ================= */}
            <section className="deployment-section py-5">
                <div className="container ">
                    <div className="text-center">
                        <h2 className="Platform-text  text-dark fw-bolder mb-2">Our Deployment Process</h2>
                        <p className="text-secondary ">Our structured path to digital transformation.</p>
                  </div>

                    <div className="process-container position-relative mt-5">
                        <div className="process-line-horizontal d-none d-lg-block"></div>
                        <div className="row g-2 justify-content-center">
                            {[
                                {
                                    num: "01",
                                    title: "Discovery & Planning",
                                    desc: "Understanding educational goals and platform requirements for success.",
                                },
                                {
                                    num: "02",
                                    title: "Design & Prototyping",
                                    desc: "Creating intuitive interfaces for students, teachers and administrators.",
                                },
                                {
                                    num: "03",
                                    title: "Development & Integration",
                                    desc: "Building robust platforms with modern architecture and performance.",
                                },
                                {
                                    num: "04",
                                    title: "Launch & Support",
                                    desc: "Deploying platforms with comprehensive support and continuous improvements.",
                                },
                            ].map((step, i) => (
                                <div className="col-lg-3 col-md-6" key={i}>
                                    <div className="process-step-item">
                                        <div className="step-circle mb-4 mx-auto">{step.num}</div>
                                        <h5 className="fw-bold mb-3">{step.title}</h5>
                                        <p className="text-muted small px-3">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TECHNOLOGIES ================= */}
            <section className="container py-5 text-center">
                <h2 className="tech-title mb-3">Technologies</h2>
                <p className="text-muted mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                    A high-end comprehensive list of our cloud technology stack designed
                    for enterprise-grade scalability and performance.
                </p>

                <div className="row g-3 mt-4">
                    {[
                        {
                            name: "React",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
                        },
                        {
                            name: "Node.js",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
                        },
                        {
                            name: "MongoDB",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
                        },
                        {
                            name: "WebRTC",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/WebRTC_logo.svg",
                        },
                        {
                            name: "AWS",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
                        },
                        {
                            name: "Zoom",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Zoom_Video_Communications_logo.svg",
                        },
                        {
                            name: "Stripe",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
                        },
                        {
                            name: "Firebase",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg",
                        },
                        {
                            name: "TensorFlow",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
                        },
                        {
                            name: "Redis",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Logo-redis.svg",
                        },
                        {
                            name: "PostgreSQL",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
                        },
                        {
                            name: "Docker",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
                        },
                    ].map((tech, i) => (
                        <div className="col-6 col-md-3" key={i}>
                            <div className="tech-card p-4 d-flex flex-column align-items-center justify-content-center">
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="img-fluid mb-3"
                                    style={{ height: "50px", objectFit: "contain" }}
                                />
                                {/* <span className="small fw-bold text-muted">{tech.name}</span> */}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= SUCCESS STORIES ================= */}
            <section className="container py-5 text-center">
                <h2 className="section-title fw-bold">Our Success Stories</h2>

                <div className="row g-3 mt-4">
                    {[
                        {
                            tag: "K-12 Education",
                            title: "EduTech Academy",
                            img: "https://plus.unsplash.com/premium_photo-1661320934473-c0c39ec03ba2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8",
                        },
                        {
                            tag: "Corporate Training",
                            title: "Corporate Learning Hub",
                            img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        },
                        {
                            tag: "Higher Education",
                            title: "University Online",
                            img: "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kaW5nfGVufDB8fDB8fHww",
                        },
                    ].map((story, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="story-card text-start h-100">
                                <div className="story-img-wrapper">
                                    <img
                                        src={story.img}
                                        alt={story.title}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="story-content p-4">
                                    <span className="badge-blue mb-3 d-inline-block">
                                        {story.tag}
                                    </span>
                                    <h4 className="fw-bold mb-3">{story.title}</h4>
                                    <p className="text-muted small">
                                        Scaling personalized learning paths for thousands of
                                        students and profiles with AI-driven insights.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="container py-5">
                <div className="cta-box text-center p-5 shadow-lg position-relative overflow-hidden">
                    <div className="cta-shapes"></div>
                    <h2 className="fw-bold mb-3">Ready To Transform Education ?</h2>
                    <p
                        className="mb-4 text-light-gray mx-auto"
                        style={{ maxWidth: "600px", opacity: 0.9 }}
                    >
                        Let's build an innovative e-learning platform that empowers
                        educators and engages students worldwide.
                    </p>
                    <a
                        href="https://yourlink.com"
                        className="btn cta-btn mt-2 px-5 py-3 fw-bold"
                    >
                        Start Your Platform
                    </a>
                </div>
            </section>
        </div>
    );
}
