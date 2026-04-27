import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaGlobe, FaCode, FaMobileAlt, FaChartLine, FaServer,
    FaMicrochip, FaCloud, FaShieldAlt, FaNetworkWired, FaGraduationCap,
} from "react-icons/fa";
import "./OurExpertise.css";

const expertiseData = [
    {
        title: "Web Development",
        description: "Custom websites and web apps built with React, Next.js, and modern frameworks for speed and scale.",
        tags: ["RESPONSIVE", "SEO READY", "FAST"],
        icon: FaGlobe,
        accent: "#4facfe",
    },
    {
        title: "Software Design",
        description: "Architectural blueprints and comprehensive design patterns tailored to scalable business systems.",
        tags: ["SCALABLE", "AGILE", "CLEAN CODE"],
        icon: FaCode,
        accent: "#667eea",
    },
    {
        title: "Mobile App Dev",
        description: "Native and cross-platform mobile applications for seamless iOS and Android experiences.",
        tags: ["IOS & ANDROID", "CROSS-PLATFORM"],
        icon: FaMobileAlt,
        accent: "#a78bfa",
    },
    {
        title: "Digital Marketing",
        description: "Data-driven strategies to amplify brand voice and maximize ROI across all digital channels.",
        tags: ["GROWTH", "ANALYTICS", "SEO"],
        icon: FaChartLine,
        accent: "#34d399",
    },
    {
        title: "Datacenter Colocation",
        description: "Tier-3 colocation datacenter space with high security, redundancy, and guaranteed uptime.",
        tags: ["TIER-3", "SECURITY", "REDUNDANCY"],
        icon: FaServer,
        accent: "#f59e0b",
    },
    {
        title: "Hardware Solutions",
        description: "Enterprise-grade computing systems and communication infrastructure setup and maintenance.",
        tags: ["ENTERPRISE", "NETWORK", "SETUP"],
        icon: FaMicrochip,
        accent: "#fb923c",
    },
    {
        title: "Cloud Infrastructure",
        description: "Scalable cloud solutions with automated backups, global CDN, and disaster recovery planning.",
        tags: ["AWS / AZURE", "BACKUPS", "CDN"],
        icon: FaCloud,
        accent: "#38bdf8",
    },
    {
        title: "Cyber Security Audit",
        description: "Vulnerability assessments and penetration testing to fully secure your digital assets.",
        tags: ["PEN-TESTING", "COMPLIANCE"],
        icon: FaShieldAlt,
        accent: "#f43f5e",
    },
    {
        title: "IT Infrastructure",
        description: "End-to-end management of corporate networks, server systems, and IT support operations.",
        tags: ["SUPPORT", "NETWORK", "ADMIN"],
        icon: FaNetworkWired,
        accent: "#2dd4bf",
    },
    {
        title: "EdTech Solutions",
        description: "Smart LMS systems and intelligent tracking solutions for educational institutions.",
        tags: ["LMS", "E-LEARNING", "TRACKING"],
        icon: FaGraduationCap,
        accent: "#e879f9",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const OurExpertise = () => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="exp-section">
            {/* Background effects */}
            <div className="exp-bg-orb exp-bg-orb--1" />
            <div className="exp-bg-orb exp-bg-orb--2" />
            <div className="exp-bg-orb exp-bg-orb--3" />
            <div className="exp-noise" />
            <div className="exp-grid-lines" />

            <div className="exp-container">
                {/* Header */}
                <motion.div
                    className="exp-header"
                    initial={{ opacity: 0, y: -28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="exp-eyebrow">
                        <span className="exp-eyebrow__dot" />
                        <span className="exp-eyebrow__text">What We Do</span>
                        <span className="exp-eyebrow__dot" />
                    </div>

                    <h1 className="exp-title">
                        Our <span className="exp-title__gradient">Expertise</span>
                    </h1>

                    <p className="exp-subtitle">
                        Enterprise solutions for the <em>digital age</em>
                    </p>

                    <p className="exp-desc">
                        We combine technical expertise with business intelligence to create
                        software architectures that drive sustainable growth.
                    </p>

                    <div className="exp-header__line" />
                </motion.div>

                {/* Grid */}
                <motion.div
                    className="exp-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {expertiseData.map((item, index) => {
                        const Icon = item.icon;
                        const isHovered = hovered === index;

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className="exp-card"
                                style={{
                                    "--accent": item.accent,
                                    "--accent-a15": item.accent + "26",
                                    "--accent-a30": item.accent + "4D",
                                }}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Glow bg */}
                                <div className="exp-card__glow-bg" />

                                {/* Top row */}
                                <div className="exp-card__top">
                                    <span className="exp-card__num">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="exp-card__icon-wrap">
                                        <Icon size={17} />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="exp-card__title">{item.title}</h3>

                                {/* Divider */}
                                <div className="exp-card__divider" />

                                {/* Description */}
                                <p className="exp-card__desc">{item.description}</p>

                                {/* Tags */}
                                <div className="exp-card__tags">
                                    {item.tags.map((tag, i) => (
                                        <span key={i} className="exp-card__tag">{tag}</span>
                                    ))}
                                </div>

                                {/* Explore link */}
                                <a href="#" className="exp-card__link">
                                    <span>Explore</span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path
                                            d="M2 7h10M8 3l4 4-4 4"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>

                                {/* Bottom accent bar */}
                                <div className="exp-card__bar" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default OurExpertise;