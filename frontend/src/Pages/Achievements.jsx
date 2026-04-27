import React, { useEffect, useRef } from 'react';
import { FaTrophy, FaMedal, FaAws, FaMicrosoft, FaAward } from 'react-icons/fa';
import { HiBadgeCheck } from 'react-icons/hi';
import { SiGooglecloud, SiOracle, SiSalesforce } from 'react-icons/si';
import { TbShieldCheckFilled } from 'react-icons/tb';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { LuCalendarDays } from 'react-icons/lu';
import '../CSS/Achievements.css';
import Image from '../assets/images/image.jpg';
import Image2 from '../assets/images/image1.jpg';
import Image3 from '../assets/images/image2.jpg';

/* ── data ────────────────────────────────────────── */
const statsData = [
    { label: 'PROJECT DELIVERED', value: '500+', trend: '+25%', desc: 'Across 20+ different industries' },
    { label: 'HAPPY CLIENTS', value: '250+', trend: '+15%', desc: 'Serving clients in 30 countries' },
    { label: 'INDUSTRY AWARDS', value: '25+', trend: '+2%', desc: 'Established 2014 in Silicon Valley' },
];

const awardsData = [
    { icon: <FaTrophy />, title: 'Best Digital Transformation Partner', source: 'Tech Summit Excellence' },
    { icon: <FaAward />, title: 'Most Innovation Solution', source: 'Global Business Summit 2022' },
    { icon: <FaMedal />, title: 'Client Choice Award', source: 'Service Quality Index 2021' },
    { icon: <HiBadgeCheck />, title: 'Fastest Growing', source: 'Inc 5000 Honoree' },
];

const partnersData = [
    { icon: <FaAws />, name: 'AWS' },
    { icon: <FaMicrosoft />, name: 'Microsoft' },
    { icon: <SiGooglecloud />, name: 'Cloud' },
    { icon: <SiOracle />, name: 'Oracle' },
    { icon: <SiSalesforce />, name: 'Salesforce' },
    { icon: <BsGrid3X3Gap />, name: 'IBM' },
];

const certificationsData = [
    { icon: <FaAws />, title: 'AWS Certified Partner', desc: 'Specialized in Cloud Migration and Serverless Architectures.' },
    { icon: <TbShieldCheckFilled />, title: 'ISO 27001 Certified', desc: 'World-class Information Security Management systems.' },
    { icon: <BsGrid3X3Gap />, title: 'Microsoft Gold Partner', desc: 'Expertise in .NET Core and Azure Enterprise solutions.' },
];

const milestonesData = [
    { year: '2025', title: 'Company Founded', description: 'Dott Ciblez was established with a vision to transform digital landscape', image: Image },
    { year: '2024', title: 'Top Tech Agency Award', description: 'Recognized as the leading technology solution provider in the region.', image: Image2 },
    { year: '2023', title: '500th Project Milestone', description: 'Successfully delivered our 50th major enterprise project.', image: Image3 },
];

/* ── animated canvas grid ────────────────────────── */
function HeroCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        let raf;
        let t = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        /* moving dots / nodes */
        const nodes = Array.from({ length: 55 }, () => ({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.0003,
            vy: (Math.random() - 0.5) * 0.0003,
            r: Math.random() * 1.8 + 0.6,
        }));

        const draw = () => {
            const { width: W, height: H } = canvas;
            ctx.clearRect(0, 0, W, H);
            t += 0.8;

            /* update positions */
            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > 1) n.vx *= -1;
                if (n.y < 0 || n.y > 1) n.vy *= -1;
            });

            /* draw edges */
            const DIST = 0.18;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < DIST) {
                        const alpha = (1 - d / DIST) * 0.22;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100,140,255,${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
                        ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
                        ctx.stroke();
                    }
                }
            }

            /* draw nodes */
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(120,160,255,0.55)`;
                ctx.fill();
            });

            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
    }, []);
    return <canvas ref={ref} className="achieve-hero-canvas" />;
}

/* ── main component ──────────────────────────────── */
const Achievements = () => {
    const milestonesRef = useRef(null);

    const handleViewAchievements = () => {
        if (milestonesRef.current) {
            milestonesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('achieve-reveal-active'); }),
            { threshold: 0.1 }
        );
        const els = document.querySelectorAll('.achieve-reveal');
        els.forEach(el => observer.observe(el));
        return () => els.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <div className="achieve-page">

            {/* HERO */}
            <section className="achieve-hero-section achieve-reveal">
                <HeroCanvas />
                <div className="achieve-glow achieve-glow-1" />
                <div className="achieve-glow achieve-glow-2" />
                <div className="achieve-glow achieve-glow-3" />
                <div className="achieve-glow achieve-glow-4" />
                <div className="achieve-bg-grid" />
                <div className="achieve-bg-scanlines" />
                <div className="achieve-orbit achieve-orbit-1" />
                <div className="achieve-orbit achieve-orbit-2" />
                <div className="achieve-orbit achieve-orbit-3" />
                <div className="achieve-bg-streak" />
                <div className="achieve-particles">
                    {[...Array(8)].map((_, i) => <div key={i} className={`achieve-particle achieve-p-${i + 1}`} />)}
                </div>
                <div className="achieve-hero-bottom-fade" />

                <div className="achieve-hero-content">
                    <div className="achieve-hero-badge-wrapper">
                        <span className="achieve-hero-badge">
                            <span className="achieve-badge-dot" />
                            Milestones &amp; Recognition
                        </span>
                    </div>

                    <h1 className="achieve-hero-heading">
                        Our Journey of{' '}
                        <span className="achieve-hero-highlight">
                            Excellence
                            <span className="highlight-underline" />
                        </span>
                    </h1>

                    <p className="achieve-hero-desc">
                        Celebrating a decade of innovation, pushing boundaries in software engineering,
                        and delivering transformative digital solutions for global enterprises.
                    </p>

                    <div className="achieve-hero-stats">
                        {statsData.map((s, i) => (
                            <React.Fragment key={s.label}>
                                <div className="hero-stat-item">
                                    <span className="hero-stat-number">{s.value}</span>
                                    <span className="hero-stat-label">{s.label}</span>
                                </div>
                                {i < statsData.length - 1 && <div className="hero-stat-divider" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="achieve-hero-actions">
                        <button className="hero-btn hero-btn-primary" onClick={handleViewAchievements}>
                            View Achievements <span className="btn-arrow">→</span>
                        </button>
                        <button className="hero-btn hero-btn-secondary">
                            Our Story <span className="btn-play">▶</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="achieve-stats-section achieve-reveal">
                <div className="achieve-stats-container">
                    {statsData.map((stat, i) => (
                        <div key={i} className="achieve-stat-card">
                            <span className="achieve-stat-label">{stat.label}</span>
                            <div className="achieve-stat-value-row">
                                <h3 className="achieve-stat-value">{stat.value}</h3>
                                <span className="achieve-stat-trend">
                                    <svg className="achieve-trend-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 12L6 7L9 10L14 4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="achieve-stat-desc">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* AWARDS */}
            <section className="achieve-awards-section achieve-reveal">
                <div className="achieve-awards-header">
                    <h2 className="achieve-awards-title">Awards &amp; Recognition</h2>
                    <p className="achieve-awards-subtitle">Industry-wide validation of our commitment to quality and innovation.</p>
                </div>
                <div className="achieve-awards-grid">
                    {awardsData.map((award, i) => (
                        <div key={i} className="achieve-award-card">
                            <div className="achieve-award-icon-box">{award.icon}</div>
                            <h3 className="achieve-award-card-title">{award.title}</h3>
                            <p className="achieve-award-card-source">{award.source}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PARTNERS */}
            <section className="achieve-partners-section achieve-reveal">
                <span className="achieve-partners-badge">TRUSTED PARTNERS &amp; ALLIANCES</span>
                <div className="achieve-partners-logos">
                    {partnersData.map((p, i) => (
                        <div key={i} className="achieve-partner-logo" title={p.name}>{p.icon}</div>
                    ))}
                </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className="achieve-certifications-section achieve-reveal">
                <div className="achieve-certifications-header">
                    <h2 className="achieve-certifications-title">Our Certifications</h2>
                    <p className="achieve-certifications-subtitle">Adhering to the highest global standards of security and technical proficiency.</p>
                </div>
                <div className="achieve-certifications-grid">
                    {certificationsData.map((cert, i) => (
                        <div key={i} className="achieve-cert-card">
                            <div className="achieve-cert-icon-box">{cert.icon}</div>
                            <div className="achieve-cert-info">
                                <h3 className="achieve-cert-title">{cert.title}</h3>
                                <p className="achieve-cert-desc">{cert.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MILESTONES */}
            <section className="achieve-milestones-section achieve-reveal" ref={milestonesRef}>
                <div className="achieve-milestones-header">
                    <h2 className="achieve-milestones-title">Milestones Timeline</h2>
                    <p className="achieve-milestones-subtitle">A timeline of our defining moments and strategic growth over the years.</p>
                </div>
                <div className="achieve-milestones-display">
                    <div className="achieve-timeline-line" />
                    {milestonesData.map((mile, i) => (
                        <div key={i} className={`achieve-timeline-row ${i % 2 === 0 ? 'achieve-row-text-left' : 'achieve-row-text-right'}`}>
                            <div className="achieve-timeline-side achieve-side-left">
                                {i % 2 === 0 ? (
                                    <div className="achieve-timeline-text-block text-align-right">
                                        <div className="achieve-timeline-year-row justify-end">
                                            <LuCalendarDays className="achieve-timeline-calendar-icon" />
                                            <span className="achieve-year-text">{mile.year}</span>
                                        </div>
                                        <h3 className="achieve-timeline-mile-title">{mile.title}</h3>
                                        <p className="achieve-timeline-mile-desc">{mile.description}</p>
                                    </div>
                                ) : (
                                    <div className="achieve-timeline-image-block">
                                        <img src={mile.image} alt={mile.title} className="achieve-timeline-img" />
                                    </div>
                                )}
                            </div>
                            <div className="achieve-timeline-center">
                                <div className={`achieve-timeline-dot achieve-dot-${i}`} />
                            </div>
                            <div className="achieve-timeline-side achieve-side-right">
                                {i % 2 === 0 ? (
                                    <div className="achieve-timeline-image-block">
                                        <img src={mile.image} alt={mile.title} className="achieve-timeline-img" />
                                    </div>
                                ) : (
                                    <div className="achieve-timeline-text-block text-align-left">
                                        <div className="achieve-timeline-year-row justify-start">
                                            <LuCalendarDays className="achieve-timeline-calendar-icon" />
                                            <span className="achieve-year-text">{mile.year}</span>
                                        </div>
                                        <h3 className="achieve-timeline-mile-title">{mile.title}</h3>
                                        <p className="achieve-timeline-mile-desc">{mile.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="achieve-cta-bottom-section achieve-reveal">
                <div className="achieve-cta-bottom-card">
                    <h2 className="achieve-cta-bottom-title">Ready to Create Your Success Story?</h2>
                    <p className="achieve-cta-bottom-desc">Let's collaborate to build something remarkable. Our team is ready to help you achieve your digital goals.</p>
                    <button className="achieve-cta-bottom-btn">Start a Project</button>
                </div>
            </section>
        </div>
    );
};

export default Achievements;