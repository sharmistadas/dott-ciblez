import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar, FaRocket, FaGlobe } from 'react-icons/fa';
import "./Banner.css";

function Banner() {
    const slides = [
        {
            id: 1,
            tag: "Innovative Software Solutions for Modern Businesses",
            title: "Welcome to Dott Ciblez Technologies",
            description: "Trusted by industry leaders for delivering excellence in every project.",
            bgImage: "https://www.executivecentre.com/_next/image/?url=https%3A%2F%2Fassets.executivecentre.com%2Fassets%2FSeoul-HanaSecuritiesBuilding-ProductPO-PrivatOffice.jpg&w=3840&q=75",
            icon: <FaStar className="main-banner-slide-icon" />,
            overlayFrom: "rgba(2, 8, 30, 0.88)",
            overlayTo: "rgba(10, 30, 80, 0.72)",
            orb1Color: "rgba(37, 99, 235, 0.35)",
            orb2Color: "rgba(99, 179, 237, 0.22)",
            gridColor: "rgba(96, 165, 250, 0.07)",
            scanColor: "rgba(59, 130, 246, 0.06)",
        },
        {
            id: 2,
            tag: "Cutting‑Edge Development for Your Ideas",
            title: "We Build Scalable Digital Products",
            description: "From concept to launch, we deliver quality software that drives business growth.",
            bgImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            icon: <FaRocket className="main-banner-slide-icon" />,
            overlayFrom: "rgba(10, 2, 25, 0.90)",
            overlayTo: "rgba(20, 53, 100, 0.72)",
            orb1Color: "rgba(168, 85, 247, 0.35)",
            orb2Color: "rgba(217, 70, 239, 0.20)",
            gridColor: "rgba(192, 132, 252, 0.07)",
            scanColor: "rgba(168, 85, 247, 0.06)",
        },
        {
            id: 3,
            tag: "Your Trusted Technology Partner",
            title: "Empowering Businesses Worldwide",
            description: "Join our growing list of happy clients across the globe.",
            bgImage: "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg",
            icon: <FaGlobe className="main-banner-slide-icon" />,
            overlayFrom: "rgba(2, 20, 18, 0.90)",
            overlayTo: "rgba(5, 80, 60, 0.72)",
            orb1Color: "rgba(16, 185, 129, 0.32)",
            orb2Color: "rgba(52, 211, 153, 0.22)",
            gridColor: "rgba(52, 211, 153, 0.07)",
            scanColor: "rgba(16, 185, 129, 0.06)",
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef(null);

    const goToPrevious = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
        resetTimer();
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        resetTimer();
        setTimeout(() => setIsAnimating(false), 500);
    };

    const resetTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        startTimer();
    };

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setIsAnimating(true);
            setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
            setTimeout(() => setIsAnimating(false), 500);
        }, 3000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current);
    }, []);

    const currentSlide = slides[currentIndex];

    return (
        <section
            className="main-banner-dc-hero d-flex align-items-center justify-content-center"
            style={{
                '--orb1': currentSlide.orb1Color,
                '--orb2': currentSlide.orb2Color,
                '--grid-color': currentSlide.gridColor,
                '--scan-color': currentSlide.scanColor,
            }}
        >
            {/* ── Background layers ── */}

            {/* 1. Photo layers — one per slide, cross-fade via opacity */}
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className="main-banner-bg-photo"
                    style={{
                        backgroundImage: `url("${slide.bgImage}")`,
                        opacity: i === currentIndex ? 1 : 0,
                        zIndex: 0,
                    }}
                />
            ))}

            {/* 2. Per-slide colour overlay */}
            {slides.map((slide, i) => (
                <div
                    key={`ov-${slide.id}`}
                    className="main-banner-bg-overlay"
                    style={{
                        background: `linear-gradient(135deg, ${slide.overlayFrom} 0%, ${slide.overlayTo} 100%)`,
                        opacity: i === currentIndex ? 1 : 0,
                        zIndex: 1,
                    }}
                />
            ))}

            {/* 3. Diagonal vignette always on */}
            <div className="main-banner-bg-vignette" style={{ zIndex: 2 }} />

            {/* 4. Perspective grid floor */}
            <div className="main-banner-bg-grid" style={{ '--grid-color': currentSlide.gridColor, zIndex: 3 }} />

            {/* 5. Horizontal scan lines */}
            <div className="main-banner-bg-scanlines" style={{ zIndex: 4 }} />

            {/* 6. Animated orbs (colour changes via CSS vars) */}
            <div className="main-banner-hero-orb main-banner-orb-1" style={{ zIndex: 5 }} />
            <div className="main-banner-hero-orb main-banner-orb-2" style={{ zIndex: 5 }} />
            <div className="main-banner-hero-orb main-banner-orb-3" style={{ zIndex: 5 }} />

            {/* 7. Moving light streak */}
            <div className="main-banner-bg-streak" style={{ zIndex: 6 }} />

            {/* 8. Bottom edge gradient fade to dark */}
            <div className="main-banner-bg-bottom-fade" style={{ zIndex: 7 }} />

            {/* ── Original content — untouched ── */}
            <div className="main-banner-container position-relative" style={{ zIndex: 10 }}>

                {/* Slide Content */}
                <div className="row justify-content-center text-center">
                    <div className="col-lg-10">
                        <div className={`main-banner-dc-hero-content ${isAnimating ? 'main-banner-slide-animation' : ''}`}>
                            <div className="main-banner-hero-main-badge">
                                <span></span>
                                {currentSlide.icon}
                                <span className="main-banner-badge-text">{currentSlide.tag}</span>
                            </div>

                            <h1 className="main-banner-home-title">
                                {currentSlide.title}
                            </h1>

                            <p className="main-banner-hero-description">
                                {currentSlide.description}
                            </p>

                            <div className="main-banner-hero-btns">
                                <button className="btn home-join-btn main-banner-btn-primary-custom">
                                    <a href="/contact" className="text-decoration-none text-white">
                                        Join Us <span className="main-banner-btn-arrow">→</span>
                                    </a>
                                </button>
                                <button className="btn btn-outline-primary main-banner-btn-outline-custom">
                                    <a href="/blog" className="text-decoration-none text-white">
                                        Learn More
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    className="main-banner-slider-btn main-banner-prev-btn"
                    onClick={goToPrevious}
                    aria-label="Previous slide"
                >
                    <FaChevronLeft />
                </button>
                <button
                    className="main-banner-slider-btn main-banner-nxt-btn"
                    onClick={goToNext}
                    aria-label="Next slide"
                >
                    <FaChevronRight />
                </button>

                {/* Slide indicator dots */}
                <div className="main-banner-slider-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`main-banner-dot ${index === currentIndex ? 'main-banner-active' : ''}`}
                            onClick={() => {
                                if (!isAnimating) {
                                    setIsAnimating(true);
                                    setCurrentIndex(index);
                                    resetTimer();
                                    setTimeout(() => setIsAnimating(false), 500);
                                }
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span className="main-banner-dot-tooltip">{index + 1}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="main-banner-slider-progress" style={{ zIndex: 20 }}>
                <div
                    className="main-banner-progress-bar"
                    style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                />
            </div>
        </section>
    );
}

export default Banner;