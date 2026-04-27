import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExpertTeam.css';
import { apiBaseUrl, apiRequest } from '../../../utils/api';

const buildImageUrl = (avatar) => {
    if (!avatar) return "";
    if (avatar.startsWith("http")) return avatar;
    if (avatar.startsWith("/")) return `${apiBaseUrl}${avatar}`;
    return `${apiBaseUrl}/${avatar}`;
};

const fallbackAvatar = (name = "Team Member") =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=ffffff&size=256`;

const accentPalette = ['#4facfe', '#a78bfa', '#34d399', '#f59e0b', '#f97316', '#22c55e'];
const pickAccent = (name = '') => {
    const sum = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return accentPalette[sum % accentPalette.length];
};

const mapFromApi = (member) => {
    const name = member?.name || "Team Member";
    const avatarUrl = buildImageUrl(member?.avatar) || fallbackAvatar(name);
    return {
        name,
        position: member?.role || "",
        image: avatarUrl,
        bio: member?.bio || "",
        accent: pickAccent(name),
        social: {
            linkedin: member?.socialLinks?.linkedin || "#",
            twitter: member?.socialLinks?.twitter || "#",
            email: member?.email ? `mailto:${member.email}` : "#",
        },
    };
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13 } }
};

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 70, damping: 18 } }
};

const ExpertTeam = () => {
    const [hovered, setHovered] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let alive = true;
        const loadMembers = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await apiRequest("/api/team", { method: "GET" });
                const members = response?.data?.members || [];
                if (!alive) return;
                setTeamMembers(members.map(mapFromApi));
            } catch (err) {
                if (!alive) return;
                setError(err?.message || "Failed to load team members.");
            } finally {
                if (alive) setLoading(false);
            }
        };
        loadMembers();
        return () => {
            alive = false;
        };
    }, []);

    const visibleMembers = teamMembers.slice(0, 4);

    return (
        <section className="tm-section">
            {/* Background layers */}
            <div className="tm-orb tm-orb--1" />
            <div className="tm-orb tm-orb--2" />
            <div className="tm-grid" />

            <div className="container">
                {/* Header */}
                <motion.div
                    className="tm-header"
                    initial={{ opacity: 0, y: -24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="tm-eyebrow">
                        <span className="tm-eyebrow__dash" />
                        <span className="tm-eyebrow__label">Our People</span>
                        <span className="tm-eyebrow__dash" />
                    </div>
                    <h1 className="tm-title">
                        Meet the <span className="tm-title__accent">Experts</span>
                    </h1>
                    <p className="tm-desc">
                        Talented professionals dedicated to delivering exceptional results for your business.
                    </p>
                </motion.div>

                {/* Cards */}
                {loading && (
                    <p className="tm-desc" style={{ marginBottom: 18 }}>Loading team members...</p>
                )}
                {error && (
                    <p className="tm-desc" style={{ marginBottom: 18, color: "#dc2626" }}>{error}</p>
                )}
                <motion.div
                    className="row g-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {visibleMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="col-lg-3 col-md-6"
                            variants={itemVariants}
                        >
                            <div
                                className="tm-card"
                                style={{ '--accent': member.accent, '--accent-20': member.accent + '33' }}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Image area */}
                                <div className="tm-img-wrap">
                                    <img src={member.image} alt={member.name} className="tm-img" />

                                    {/* Overlay gradient */}
                                    <div className="tm-img-overlay" />

                                    {/* Index number watermark */}
                                    <span className="tm-index">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Social icons slide up */}
                                    <div className="tm-social">
                                        {[
                                            { icon: <FaLinkedinIn />, href: member.social.linkedin },
                                            { icon: <FaTwitter />, href: member.social.twitter },
                                            { icon: <FaEnvelope />, href: member.social.email },
                                        ].map((s, i) => (
                                            <motion.a
                                                key={i}
                                                href={s.href}
                                                className="tm-social__link"
                                                whileHover={{ y: -4, scale: 1.1 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                {s.icon}
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Accent corner strip */}
                                    <div className="tm-img-strip" />
                                </div>

                                {/* Info */}
                                <div className="tm-info">
                                    <div className="tm-info__top">
                                        <div>
                                            <h3 className="tm-name">{member.name}</h3>
                                            <p className="tm-position">{member.position}</p>
                                        </div>
                                        <div className="tm-dot" />
                                    </div>

                                    <div className="tm-divider" />

                                    <p className="tm-bio">{member.bio}</p>

                                    <a href="#" className="tm-link">
                                        View Profile
                                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Bottom bar sweep */}
                                <div className="tm-card__bar" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ExpertTeam;