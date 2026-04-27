import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AboutUs.css";
import Logo from "../assets/Logo/logo.png";
import { Link } from "react-router-dom";
import {
    FiShield, FiHexagon, FiSun, FiHeart, FiTarget, FiStar,
    FiArrowRight, FiCheck, FiLinkedin, FiInstagram, FiMail,
    FiGlobe, FiSmile, FiCode, FiDatabase, FiCloud, FiCpu,
    FiAward, FiZap
} from "react-icons/fi";

const techStackData = [
    { category: "Frontend", technologies: ["React", "Vue.js", "Angular", "Next.js", "TypeScript"], icon: <FiCode size={24} />, color: "#61DAFB", bgGradient: "linear-gradient(135deg,#61DAFB20,#61DAFB40)", borderColor: "#61DAFB" },
    { category: "Backend", technologies: ["Node.js", "Python", "Java", "PHP", ".NET Core"], icon: <FiDatabase size={24} />, color: "#68A063", bgGradient: "linear-gradient(135deg,#68A06320,#68A06340)", borderColor: "#68A063" },
    { category: "Cloud & DevOps", technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Jenkins"], icon: <FiCloud size={24} />, color: "#FF9900", bgGradient: "linear-gradient(135deg,#FF990020,#FF990040)", borderColor: "#FF9900" },
    { category: "Database", technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch"], icon: <FiDatabase size={24} />, color: "#47A248", bgGradient: "linear-gradient(135deg,#47A24820,#47A24840)", borderColor: "#47A248" },
    { category: "Mobile", technologies: ["React Native", "Flutter", "iOS", "Android", "Xamarin"], icon: <FiCpu size={24} />, color: "#9747FF", bgGradient: "linear-gradient(135deg,#9747FF20,#9747FF40)", borderColor: "#9747FF" },
    { category: "AI & ML", technologies: ["TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision"], icon: <FiZap size={24} />, color: "#FF6F00", bgGradient: "linear-gradient(135deg,#FF6F0020,#FF6F0040)", borderColor: "#FF6F00" },
    { category: "Cybersecurity", technologies: ["Network Security", "Encryption", "Pen Testing", "IAM", "Compliance"], icon: <FiShield size={24} />, color: "#DC2626", bgGradient: "linear-gradient(135deg,#DC262620,#DC262640)", borderColor: "#DC2626" },
    { category: "Testing & QA", technologies: ["Jest", "Selenium", "Cypress", "JUnit", "TestRail"], icon: <FiCheck size={24} />, color: "#10B981", bgGradient: "linear-gradient(135deg,#10B98120,#10B98140)", borderColor: "#10B981" },
    { category: "Architecture", technologies: ["Microservices", "Serverless", "Event-Driven", "DDD", "Clean Arch"], icon: <FiHexagon size={24} />, color: "#8B5CF6", bgGradient: "linear-gradient(135deg,#8B5CF620,#8B5CF640)", borderColor: "#8B5CF6" },
];

const Counter = ({ value, suffix }) => {
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
                
                setCount(Math.floor(easedProgress * value));
                if (progress < 1) {
                    requestId = requestAnimationFrame(step);
                }
            };
            requestId = requestAnimationFrame(step);
            return () => cancelAnimationFrame(requestId);
        }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: d } }),
};
const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function AboutUs() {
    return (
        <>
            {/* ══════════════════════════════════════════
            HERO  — Banner bg effects, no slider
        ══════════════════════════════════════════ */}
            <section className="abt-hero-section">

                {/* BG photo */}
                <div className="abt-bg-photo" />

                {/* Colour overlay */}
                <div className="abt-bg-overlay" />

                {/* Vignette */}
                <div className="abt-bg-vignette" />

                {/* Perspective grid */}
                <div className="abt-bg-grid" />

                {/* Scan lines */}
                <div className="abt-bg-scanlines" />

                {/* Animated orbs */}
                <div className="abt-hero-orb abt-orb-1" />
                <div className="abt-hero-orb abt-orb-2" />
                <div className="abt-hero-orb abt-orb-3" />

                {/* Light streak */}
                <div className="abt-bg-streak" />

                {/* Bottom fade */}
                <div className="abt-bg-bottom-fade" />

                {/* Floating particles */}
                <div className="abt-particles">
                    {[...Array(6)].map((_, i) => <div key={i} className={`abt-particle abt-particle-${i + 1}`} />)}
                </div>

                {/* ── CONTENT ── */}
                <div className="abt-hero-inner container-fluid">
                    <div className="row align-items-center abt-hero-row">

                        {/* Left */}
                        <div className="col-lg-6 abt-hero-left">

                            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                                <div className="abt-badge-custom">
                                    <span className="abt-badge-dot" />
                                    Who We Are 
                                </div>
                            </motion.div>

                            <motion.h1 className="abt-hero-h1" variants={fadeUp} initial="hidden" animate="visible" custom={0.08}>
                                Transforming<br />
                                <span className="abt-headline-accent">Digital Futures</span>
                            </motion.h1>

                            <motion.p className="abt-hero-bold" variants={fadeUp} initial="hidden" animate="visible" custom={0.16}>
                                <span>Dott Ciblez Technologies</span> stands as a beacon of innovation and excellence,
                                pioneering digital transformation solutions that empower businesses to achieve
                                unprecedented growth and operational excellence.
                            </motion.p>

                            <motion.p className="abt-hero-body" variants={fadeUp} initial="hidden" animate="visible" custom={0.22}>
                                As one of the UAE's most trusted technology partners, we combine technical mastery with
                                strategic insight to deliver enterprise-grade solutions that drive measurable business
                                impact across global markets.
                            </motion.p>

                            <motion.div className="abt-hero-cta-row" variants={fadeUp} initial="hidden" animate="visible" custom={0.28}>
                                <button className="abt-cta-primary">Get Started <FiArrowRight size={16} /></button>
                                <button className="abt-cta-ghost">Our Work</button>
                            </motion.div>
                        </div>

                        {/* Right — logo card */}
                        <div className="col-lg-6 d-flex justify-content-center abt-hero-right">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                                className="abt-logo-card-wrap"
                            >
                                <div className="abt-card-orbit" />
                                <div className="abt-card-orbit abt-card-orbit-2" />

                                <div className="abt-logo-card">
                                    <div className="abt-corner abt-corner-tl" />
                                    <div className="abt-corner abt-corner-tr" />
                                    <div className="abt-corner abt-corner-bl" />
                                    <div className="abt-corner abt-corner-br" />
                                    <img src={Logo} alt="Dott Ciblez Technologies Logo" />
                                    <div className="abt-card-status">
                                        <span className="abt-status-pulse" />
                                        <span>Est. UAE — Technology Partner</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="abt-scroll-hint">
                    <div className="abt-scroll-mouse"><div className="abt-scroll-wheel" /></div>
                    <span>Scroll to explore</span>
                </div>
            </section>


            {/* STATS */}
            <div className="abt-stats-enhanced">
                <div className="container">
                    <div className="row g-3">
                        {[
                            { label: "Global Clients", value: 500, suffix: "+", icon: <FiGlobe size={22} />, gradient: "linear-gradient(135deg,#667eea,#1e1182)" },
                            { label: "Projects Delivered", value: 1000, suffix: "+", icon: <FiAward size={22} />, gradient: "linear-gradient(135deg,#667eea,#1e1182)" },
                            { label: "Client Satisfaction", value: 98, suffix: "%", icon: <FiSmile size={22} />, gradient: "linear-gradient(135deg,#667eea,#1e1182)" },
                            { label: "Countries Served", value: 15, suffix: "+", icon: <FiGlobe size={22} />, gradient: "linear-gradient(135deg,#667eea,#1e1182)" },
                        ].map((s, i) => (
                            <motion.div key={s.label} className="col-md-6 col-lg-3"
                                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.08 * i}
                                whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="abt-sc-card-enhanced" style={{ background: s.gradient }}>
                                    <div className="abt-sc-icon-enhanced">{s.icon}</div>
                                    <div className="abt-sc-label-enhanced">{s.label}</div>
                                    <div className="abt-sc-num-enhanced">
                                        <Counter value={s.value} suffix={s.suffix} />
                                    </div>
                                    <div className="abt-sc-bar-enhanced" />
                                    <div className="abt-sc-glow" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>


            {/* MISSION / VISION */}
            <section className="abt-mv-section-enhanced">
                <div className="abt-mission-enhanced">
                    <div className="abt-mission-bg-pattern" />
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.05} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <div className="abt-mv-icon-enhanced abt-mi-enhanced"><FiTarget size={32} color="white" /></div>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}>
                        <h2 className="abt-m-title-enhanced">Our Mission</h2>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.18}>
                        <div className="abt-m-sub-enhanced">Disseminating Knowledge</div>
                        <p className="abt-m-text-enhanced">We are dedicated to disseminating software knowledge and providing world-class solutions. Our goal is to empower businesses with the tools they need to succeed in a digital-first economy.</p>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.26} whileHover={{ scale: 1.05 }}>
                        <Link to="/blog" className="abt-btn-m-enhanced">Learn More <FiArrowRight size={16} /></Link>
                    </motion.div>
                </div>
                <div className="abt-vision-enhanced">
                    <div className="abt-vision-bg-pattern" />
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.08} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <div className="abt-mv-icon-enhanced abt-vi-enhanced"><FiStar size={32} color="#667eea" /></div>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
                        <h2 className="abt-v-title-enhanced">Our Vision</h2>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.22}>
                        <div className="abt-v-sub-enhanced">Optimum Quality</div>
                        <p className="abt-v-text-enhanced">We strive for optimum quality in everything we do, building long-term relationships with our clients through trust, innovation, and unwavering commitment to excellence.</p>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3} whileHover={{ scale: 1.05 }}>
                        <Link to="/blog" className="abt-btn-v-enhanced">Explore Future</Link>
                    </motion.div>
                </div>
            </section>


            {/* CORE VALUES */}
            <section className="abt-vals-enhanced">
                <div className="container">
                    <div className="text-center mb-5">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
                            <div className="abt-vals-badge-enhanced"><FiShield size={14} /> Our Foundation</div>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.08}>
                            <h2 className="abt-vals-h2-enhanced">Core Values That Define Excellence</h2>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
                            <p className="abt-vals-desc-enhanced">We build our success on pillars of trust, innovation, and unwavering commitment to quality.</p>
                        </motion.div>
                    </div>
                    <motion.div className="row g-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {[
                            { icon: <FiShield size={24} />, title: "Integrity & Trust", text: "Transparency & Ethics. We operate with honesty in every interaction.", gradient: "linear-gradient(135deg,#667eea,#764ba2)" },
                            { icon: <FiHexagon size={24} />, title: "Excellence", text: "World-class quality. We settle for nothing less than superior performance.", gradient: "linear-gradient(135deg,#f093fb,#f5576c)" },
                            { icon: <FiSun size={24} />, title: "Innovation", text: "Cutting-edge solutions. We constantly push boundaries.", gradient: "linear-gradient(135deg,#4facfe,#00f2fe)" },
                            { icon: <FiHeart size={24} />, title: "Collaboration", text: "Synergistic partnerships. We work closely with you to achieve shared goals.", gradient: "linear-gradient(135deg,#43e97b,#38f9d7)" },
                        ].map(v => (
                            <motion.div key={v.title} className="col-md-6 col-lg-3" variants={fadeUp} whileHover={{ y: -15, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="abt-val-card-enhanced">
                                    <div className="abt-val-icon-enhanced" style={{ background: v.gradient }}>{v.icon}</div>
                                    <h3 className="abt-val-title-enhanced">{v.title}</h3>
                                    <p className="abt-val-text-enhanced">{v.text}</p>
                                    <div className="abt-val-card-glow" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* TECH STACK */}
            <section className="abt-tech-stack-enhanced">
                <div className="abt-tech-bg-pattern" />
                <div className="container">
                    <div className="text-center mb-5">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
                            <div className="abt-tech-badge-enhanced"><FiCode size={14} /> Our Technology Stack</div>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.08}>
                            <h2 className="abt-tech-h2-enhanced">Cutting-Edge Technologies We Master</h2>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
                            <p className="abt-tech-desc-enhanced">We leverage the latest technologies to build scalable, secure, and high-performance solutions.</p>
                        </motion.div>
                    </div>
                    <motion.div className="row g-3 mb-5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {techStackData.map(tech => (
                            <motion.div key={tech.category} className="col-lg-4 col-md-6" variants={fadeUp} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="abt-tech-card-enhanced" style={{ background: tech.bgGradient, borderColor: tech.borderColor, boxShadow: `0 10px 30px -10px ${tech.color}80` }}>
                                    <div className="abt-tech-icon-enhanced" style={{ background: `${tech.color}20`, color: tech.color, border: `2px solid ${tech.color}40` }}>{tech.icon}</div>
                                    <h3 className="abt-tech-category-enhanced" style={{ color: tech.color }}>{tech.category}</h3>
                                    <div className="abt-tech-list-enhanced">
                                        {tech.technologies.map((item, i) => (
                                            <motion.span key={i} className="abt-tech-item-enhanced"
                                                whileHover={{ scale: 1.1, background: tech.color, color: "#fff", boxShadow: `0 5px 15px ${tech.color}80` }}
                                                style={{ background: `${tech.color}20`, borderColor: `${tech.color}40` }}>
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                    <div className="abt-tech-card-glow" style={{ background: `radial-gradient(circle at 50% 0%,${tech.color}40,transparent 70%)` }} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div className="text-center mt-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3} whileHover={{ scale: 1.05 }}>
                        <button className="abt-tech-view-all-enhanced">
                            View All Technologies <FiArrowRight size={18} />
                            <span className="abt-btn-glow" />
                        </button>
                    </motion.div>
                </div>
            </section>


            {/* CTA */}
            <section className="abt-cta-enhanced">
                <div className="abt-cta-bg-particles">
                    <div className="abt-cta-particle" /><div className="abt-cta-particle" /><div className="abt-cta-particle" />
                </div>
                <div className="container abt-cta-in-enhanced">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
                        <h2 className="abt-cta-h2-enhanced">Ready to transform your business?</h2>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
                        <p className="abt-cta-desc-enhanced">Let Dott Ciblez technologies guide you through your digital evolution. Reach out today.</p>
                    </motion.div>
                    <motion.div className="abt-cta-buttons" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}>
                        <motion.button className="abt-btn-cw-enhanced" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Contact Us Today</motion.button>
                        <motion.button className="abt-btn-cg-enhanced" whileHover={{ gap: "15px", scale: 1.05 }} whileTap={{ scale: 0.95 }}>Learn more <FiArrowRight size={16} /></motion.button>
                    </motion.div>
                </div>
            </section>


            {/* FOUNDER */}
            <section className="abt-founder-enhanced">
                <div className="container">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
                        <div className="abt-f-badge-enhanced"><FiTarget size={14} /> Leadership Excellence</div>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.08}>
                        <h2 className="abt-f-h2-enhanced">Meet The Visionary Behind Our Success</h2>
                    </motion.div>
                    <div className="row align-items-center g-5">
                        <div className="col-lg-5">
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                                <div className="abt-f-img-wrap-enhanced">
                                    <div className="abt-f-frame-enhanced">
                                        <div className="abt-f-frame-img-enhanced">
                                            <img src="https://www.dottcibleztechnologies.com/assets/Founder-1-CeMOOrBH.jpeg" alt="Founder" />
                                        </div>
                                    </div>
                                    <div className="abt-f-accent-enhanced" />
                                    <div className="abt-f-glow" />
                                </div>
                            </motion.div>
                        </div>
                        <div className="col-lg-7">
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}>
                                <div className="abt-f-role-enhanced">Founder & CEO</div>
                            </motion.div>
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.16}>
                                <p className="abt-f-bio-enhanced">
                                    A visionary entrepreneur with over 5 years of pioneering experience in the IT industry,
                                    <span> Samir</span> founded <span>Dott Ciblez Technologies</span> with an unwavering commitment to
                                    revolutionize how enterprises harness technology for exponential growth.
                                </p>
                            </motion.div>
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.22} className="abt-f-tags-enhanced">
                                {["5+ Years Industry Leadership", "Former Technology Director", "Published Thought Leader", "International Tech Speaker"].map(t => (
                                    <motion.div key={t} className="abt-f-tag-enhanced" whileHover={{ scale: 1.05, borderColor: "#2C3EE8", color: "#2C3EE8" }}>
                                        <FiCheck size={14} /> {t}
                                    </motion.div>
                                ))}
                            </motion.div>
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.28}>
                                <div className="abt-f-connect-enhanced">Connect With Our Founder</div>
                                <div className="abt-f-socials-enhanced">
                                    {[<FiLinkedin size={20} />, <FiInstagram size={20} />, <FiMail size={20} />].map((icon, i) => (
                                        <motion.a key={i} href="#" className="abt-f-soc-enhanced" whileHover={{ y: -5, borderColor: "#2C3EE8", background: "#eef2ff" }}>{icon}</motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}