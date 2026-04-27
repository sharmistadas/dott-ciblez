import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Emily Rodrigues',
            position: 'CTO, TechInnovate Solutions',
            quote: 'Professional, responsive, and incredibly talented. The DottCiblez team took our complex requirements and turned them into an elegant, scalable solution that exceeded expectations.',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            tag: 'Enterprise'
        },
        {
            name: 'Michael Chen',
            position: 'CEO, Digital Frontier',
            quote: 'Their expertise in cloud infrastructure transformed our business operations. We\'ve seen a 40% improvement in system performance since the migration.',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            tag: 'Cloud'
        },
        {
            name: 'Sarah Williams',
            position: 'Product Manager, InnovateLabs',
            quote: 'The team\'s attention to detail and commitment to quality is unmatched. They delivered beyond our expectations — on time and within budget.',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            tag: 'Product'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.18 } }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 18 } }
    };

    return (
        <section className="test-section">
            {/* Decorative blobs */}
            <div className="test-blob test-blob--1" />
            <div className="test-blob test-blob--2" />
            <div className="test-grid-overlay" />

            <div className="container">
                {/* Header */}
                <motion.div
                    className="test-header"
                    initial={{ opacity: 0, y: -28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    <div className="test-eyebrow">
                        <span className="test-eyebrow__line" />
                        <span className="test-eyebrow__text">Client Voices</span>
                        <span className="test-eyebrow__line" />
                    </div>
                    <h2 className="test-title">
                        Trusted by <span className="test-title__accent">Innovators</span>
                    </h2>
                    <p className="test-desc">
                        Real stories from businesses we've helped thrive in the digital landscape.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="row g-3 test-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            className="col-lg-4 col-md-6"
                            variants={itemVariants}
                        >
                            <div className={`test-card test-card--${index}`}>
                                {/* Top bar accent */}
                                <div className="test-card__accent" />

                                {/* Tag + Quote icon row */}
                                <div className="test-card__top">
                                    <span className="test-tag">{t.tag}</span>
                                    <div className="test-quote-icon">
                                        <FaQuoteRight />
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="test-rating">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <FaStar key={i} className="test-star" />
                                    ))}
                                </div>

                                {/* Quote text */}
                                <p className="test-quote">"{t.quote}"</p>

                                {/* Author */}
                                <div className="test-author">
                                    <div className="test-author__img-wrap">
                                        <img src={t.image} alt={t.name} className="test-author__img" />
                                        <div className="test-author__ring" />
                                    </div>
                                    <div className="test-author__info">
                                        <h5 className="test-author__name">{t.name}</h5>
                                        <p className="test-author__pos">{t.position}</p>
                                    </div>
                                </div>

                                {/* Hover glow */}
                                <div className="test-card__glow" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Navigation dots */}
                <div className="test-nav">
                    <span className="test-nav__dot test-nav__dot--active" />
                    <span className="test-nav__dot" />
                    <span className="test-nav__dot" />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;