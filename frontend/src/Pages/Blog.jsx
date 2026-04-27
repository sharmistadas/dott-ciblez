import { useState, useRef, useEffect } from "react";
import "../CSS/Blog.css";
import blogImage from '../assets/image.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const cardData = [
    {
        category: "WEB DEVELOPMENT",
        img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
        title: "Optimizing React Performance for Low-Bandwidth",
        desc: "New techniques for reducing bundle sizes and improving First Contentful Paint in emerging market segments through advanced edge computing.",
    },
    {
        category: "SOFTWARE DESIGN",
        img: "https://images.unsplash.com/photo-1667984390527-850f63192709?w=600&q=80",
        title: "Multi-Cloud vs Hybrid: Which Strategy Wins?",
        desc: "Analyzing the cost-benefit ratio of vendor diversification in enterprise architecture for Fortune 500 companies.",
    },
    {
        category: "CYBER AUDIT",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
        title: "Zero Trust Architecture: Implementation Guide",
        desc: "Moving beyond perimeter defense to identity-centric security models in the era of decentralized workforce.",
    },
    {
        category: "IT INFRASTRUCTURE",
        img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
        title: "Optimizing React Performance for Low-Bandwidth",
        desc: "New techniques for reducing bundle sizes and improving First Contentful Paint in emerging market segments through advanced edge computing.",
    },
    {
        category: "CLOUD SERVICES",
        img: "https://images.unsplash.com/photo-1667984390527-850f63192709?w=600&q=80",
        title: "Multi-Cloud vs Hybrid: Which Strategy Wins?",
        desc: "Analyzing the cost-benefit ratio of vendor diversification in enterprise architecture for Fortune 500 companies.",
    },
];

const categories = ["All", "Web Development", "Software Design", "Cloud Services", "Cyber Audit", "IT Infrastructure"];

const categoryColors = {
    "WEB DEVELOPMENT": { bg: "#e8f4ff", text: "#1a73e8" },
    "SOFTWARE DESIGN": { bg: "#f3e8ff", text: "#9b59b6" },
    "CLOUD SERVICES": { bg: "#e8fff4", text: "#16a34a" },
    "CYBER AUDIT": { bg: "#fff0e8", text: "#e67e22" },
    "IT INFRASTRUCTURE": { bg: "#fff8e8", text: "#d4a017" },
};

const trending = [
    { num: "01", title: "Generative AI in System Architecture", meta: "Architectural Patterns • 15 Min Read" },
    { num: "02", title: "The Shift to Edge-First Data Strategies", meta: "Edge Computing • 12 Min Read" },
    { num: "03", title: "Quantum Security: Preparing for Y2Q", meta: "Cyber Security • 32 Min Read" },
];

const cardsPerSlide = 3;

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [email, setEmail] = useState("");
    const [slideIndex, setSlideIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setSlideIndex(0);
    };

    const handleSelect = (cat) => {
        handleCategoryChange(cat);
        setDropdownOpen(false);
    };

    const filteredCards =
        activeCategory === "All"
            ? cardData
            : cardData.filter((card) => card.category === activeCategory.toUpperCase());

    const totalSlides = Math.ceil(filteredCards.length / cardsPerSlide);
    const prevSlide = () => setSlideIndex(i => Math.max(0, i - 1));
    const nextSlide = () => setSlideIndex(i => Math.min(totalSlides - 1, i + 1));
    const visibleCards = filteredCards.slice(
        slideIndex * cardsPerSlide,
        slideIndex * cardsPerSlide + cardsPerSlide
    );

    return (
        <>
            {/* HERO */}
            <section className="hero-section border">
                <div className="container hero-container ">
                    <div className="row align-items-center ">
                        <div className="col-lg-6">
                            <p className="featured-label">Featured Analysis</p>
                            <h1 className="hero-title">
                                The Future of <span>Hybrid IT</span><br />Infrastructure
                            </h1>
                            <p className="hero-subtitle">
                                Next-generation server management for the modern enterprise.
                                Explore how multi-cloud environments are redefining scaling for the data demands of 2025.
                            </p>
                            <div>
                                <button className="btn btn-primary-hero">Read Full Article</button>
                                <button className="btn btn-outline-hero">View Roadmap</button>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center align-items-center">

                            <img
                                src={blogImage}
                                alt="Blog Illustration"
                                className="hero-illustration"
                            />

                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="categories-section">
                <div className="container">
                    <p className="categories-title">Top Categories</p>

                    {/* Desktop pill buttons */}
                    <div className="cat-btn-group">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Mobile dropdown */}
                    <div className="filter-dropdown" ref={dropdownRef}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => setDropdownOpen(prev => !prev)}
                            aria-haspopup="listbox"
                            aria-expanded={dropdownOpen}
                        >
                            <span>{activeCategory}</span>
                            <svg
                                className={`filter-dropdown-arrow ${dropdownOpen ? "open" : ""}`}
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                            >
                                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <ul className="filter-dropdown-menu" role="listbox">
                                {categories.map(f => (
                                    <li
                                        key={f}
                                        role="option"
                                        aria-selected={activeCategory === f}
                                        className={`filter-dropdown-item ${activeCategory === f ? "active" : ""}`}
                                        onClick={() => handleSelect(f)}
                                    >
                                        {f}
                                        {activeCategory === f && (
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor"
                                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>

            {/* LATEST INSIGHTS CAROUSEL */}
            <section className="insights-section">
                <div className="container">
                    <h2 className="section-title">Latest Insights</h2>
                    <p className="section-subtitle">
                        In-depth analysis from our global team of technical architects and senior engineers.
                    </p>

                    <div className="bs-carousel">
                        {/* Dot indicators */}
                        <div className="bs-carousel-indicators">
                            {Array.from({ length: totalSlides }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`bs-indicator ${i === slideIndex ? "active" : ""}`}
                                    onClick={() => setSlideIndex(i)}
                                />
                            ))}
                        </div>

                        {/* Slide content */}
                        <div className="bs-carousel-inner">
                            {visibleCards.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    <p style={{ fontSize: "15px" }}>No articles found for this category.</p>
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {visibleCards.map((card, i) => (
                                        <div className="col-md-4" key={i}>
                                            <div className="insight-card h-100">
                                                <div className="card-img-wrap">
                                                    <img src={card.img} alt={card.title} />
                                                </div>
                                                <div className="card-body-custom">
                                                    <p
                                                        className="card-category"
                                                        style={{
                                                            background: categoryColors[card.category]?.bg,
                                                            color: categoryColors[card.category]?.text,
                                                            display: "inline-block",
                                                            padding: "3px 10px",
                                                            borderRadius: "20px",
                                                            fontSize: "10px",
                                                            fontWeight: 700,
                                                            letterSpacing: "1.5px",
                                                            marginBottom: "10px",
                                                        }}
                                                    >
                                                        {card.category}
                                                    </p>
                                                    <h3 className="card-title-custom">{card.title}</h3>
                                                    <p className="card-desc">{card.desc}</p>
                                                    <a href="#" className="read-link">Read Article &rarr;</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Prev arrow */}
                        <button
                            className="bs-carousel-control bs-carousel-prev"
                            onClick={prevSlide}
                            disabled={slideIndex === 0}
                        >
                            <span className="bs-carousel-icon">&#10094;</span>
                        </button>

                        {/* Next arrow */}
                        <button
                            className="bs-carousel-control bs-carousel-next"
                            onClick={nextSlide}
                            disabled={slideIndex === totalSlides - 1}
                        >
                            <span className="bs-carousel-icon">&#10095;</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* CASE STUDY */}
            <section className="case-study-section">
                <div className="case-study-grid">
                    <div className="case-img-side">
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80"
                            alt="Enterprise Scale"
                        />
                    </div>
                    <div className="case-content-side">
                        <p className="success-label">Success Stories</p>
                        <h2 className="case-title">Scaling Enterprise Social<br />Media Ecosystems</h2>
                        <div className="d-flex gap-4 mb-2">
                            <div className="stat-block">
                                <div className="stat-number">1.2M+</div>
                                <div className="stat-label">Daily Active Users</div>
                            </div>
                            <div className="stat-block">
                                <div className="stat-number">99.9%</div>
                                <div className="stat-label">Uptime Maintained</div>
                            </div>
                        </div>
                        <p className="case-desc">
                            Our cloud-native approach allowed our partner to scale from 50k to over a million users
                            in under six months without a single millisecond of downtime.
                        </p>
                        <button className="btn btn-case">View Full Case Study &rarr;</button>
                    </div>
                </div>
            </section>

            {/* TRENDING + NEWSLETTER */}
            <section className="bottom-section">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-5">
                            <h3 className="trending-title">Trending Analysis</h3>
                            {trending.map((t, i) => (
                                <div className="trending-item" key={i}>
                                    <span className="trend-num">{t.num}</span>
                                    <div>
                                        <div className="trend-title">{t.title}</div>
                                        <div className="trend-meta">{t.meta}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-7">
                            <div className="newsletter-card">
                                <h3 className="newsletter-title">
                                    Technical deep dives,<br /><span>delivered weekly.</span>
                                </h3>
                                <p className="newsletter-sub">
                                    Join 50,000+ senior engineers and technical leads receiving our vetted
                                    architectural patterns and industry analysis.
                                </p>
                                <div className="newsletter-form">
                                    <input
                                        className="newsletter-input"
                                        type="email"
                                        placeholder="Work email address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <button className="btn-subscribe-dark">Subscribe Now</button>
                                </div>
                                <p className="newsletter-disclaimer">Zero Spam. Only Technical Insights. Unsubscribe Anytime.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <div className="container-fluid px-4">
                <div className="cta-section">
                    <h2 className="cta-title">Build the next evolution of your<br />digital infrastructure</h2>
                    <button className="btn btn-cta">Start Your Project</button>
                </div>
            </div>
        </>
    );
}