import { useState, useRef, useEffect } from "react";
import { 
    IoRocketOutline, IoMailOutline, IoLogoLinkedin, IoLogoTwitter, 
    IoPeopleOutline, IoTrophyOutline, IoGlobeOutline, IoHeartOutline 
} from "react-icons/io5";
import { motion, useInView } from "framer-motion";
import "../CSS/Team.css";
import { apiBaseUrl, apiRequest } from "../utils/api";

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

/* ─── Data ─────────────────────────────────────────────────── */
const categoryColors = {
    Leadership: { bg: "#eef2ff", text: "#2340f5", border: "#c7d2fe" },
    Product: { bg: "#faf5ff", text: "#7c3aed", border: "#ddd6fe" },
    Engineering: { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
    Design: { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa" },
    Marketing: { bg: "#fefce8", text: "#ca8a04", border: "#fde68a" },
};

const filters = ["All", "Leadership", "Engineering", "Design", "Product", "Marketing"];

const buildImageUrl = (avatar) => {
    if (!avatar) return "";
    if (avatar.startsWith("http")) return avatar;
    if (avatar.startsWith("/")) return `${apiBaseUrl}${avatar}`;
    return `${apiBaseUrl}/${avatar}`;
};

const fallbackAvatar = (name = "Team Member") =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=111827&color=ffffff&size=256`;

const mapFromApi = (member) => {
    const name = member?.name || "Team Member";
    const avatarUrl = buildImageUrl(member?.avatar) || fallbackAvatar(name);
    return {
        id: member?._id || member?.id || name,
        name,
        category: member?.category || "Leadership",
        role: member?.role || "",
        bio: member?.bio || "",
        avatar: avatarUrl,
        linkedin: member?.socialLinks?.linkedin || "#",
        twitter: member?.socialLinks?.twitter || "#",
        email: member?.email ? `mailto:${member.email}` : "#",
    };
};

const values = [
    { emoji: "🚀", title: "Innovation First", desc: "We challenge the status quo and embrace emerging technologies to stay ahead of the curve." },
    { emoji: "🤝", title: "Collaboration", desc: "Great work happens when diverse minds come together with shared purpose and mutual respect." },
    { emoji: "💡", title: "Ownership", desc: "Every team member owns their work end-to-end — from concept to deployment to impact." },
    { emoji: "🌱", title: "Growth Mindset", desc: "We invest in learning, celebrate experimentation, and grow stronger from every challenge." },
];

/* ─── Component ────────────────────────────────────────────── */
export default function MeetTheTeam() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fn = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setDropdownOpen(false);
        };
        document.addEventListener("mousedown", fn);
        return () => document.removeEventListener("mousedown", fn);
    }, []);

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

    const stats = [
        { icon: <IoPeopleOutline />, num: teamMembers.length || 0, suffix: "+", label: "Team Members" },
        { icon: <IoTrophyOutline />, num: 12, suffix: "+", label: "Awards Won" },
        { icon: <IoGlobeOutline />, num: 8, suffix: "", label: "Countries" },
        { icon: <IoHeartOutline />, num: 98, suffix: "%", label: "Satisfaction" },
    ];

    const filtered = activeFilter === "All"
        ? teamMembers
        : teamMembers.filter((m) => m.category === activeFilter);

    const clusterCount = Math.min(teamMembers.length, 5);

    return (
        <div className="team-page">

            {/* ══════════════════════════════════════
                HERO BANNER
            ══════════════════════════════════════ */}
            <section className="team-hero-banner">
                <div className="team-hero-bg-shapes">
                    <div className="team-hero-shape team-hero-shape-1" />
                    <div className="team-hero-shape team-hero-shape-2" />
                    <div className="team-hero-shape team-hero-shape-3" />
                    <div className="team-hero-dots" />
                </div>
                <div className="team-container">
                    <div className="team-hero-inner">
                        <div className="team-hero-text">
                            <div className="team-hero-eyebrow">
                                <span className="team-eyebrow-dot" />
                                <span>Who We Are</span>
                            </div>
                            <h1 className="team-hero-title">
                                The Minds Behind<br />
                                <span className="team-hero-title-accent">Dott Ciblez</span>
                            </h1>
                            <p className="team-hero-desc">
                                A collective of engineers, designers, strategists and innovators
                                united by a single mission — to build technology that makes a
                                lasting difference.
                            </p>
                            <div className="team-hero-actions">
                                <a href="/career" className="team-btn-primary">Join the Team</a>
                                <a href="/about-us" className="team-btn-ghost">Our Story</a>
                            </div>
                        </div>
                        <div className="team-hero-avatars">
                            <div className="team-avatar-cluster">
                                {teamMembers.slice(0, clusterCount).map((m, i) => (
                                    <div
                                        key={m.id}
                                        className="team-cluster-avatar"
                                        style={{ '--i': i }}
                                        title={m.name}
                                    >
                                        <img src={m.avatar} alt={m.name} />
                                    </div>
                                ))}
                                {teamMembers.length > 5 && (
                                    <div className="team-cluster-more">+{teamMembers.length - 5}</div>
                                )}
                            </div>
                            <p className="team-hero-avatar-label">Meet our growing team</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                STATS STRIP
            ══════════════════════════════════════ */}
            <section className="team-stats-strip">
                <div className="team-container">
                    <div className="team-stats-grid">
                        {stats.map((s, i) => (
                            <div className="team-stat-item" key={i}>
                                <div className="team-stat-icon">{s.icon}</div>
                                <div className="team-stat-value">
                                    <Counter value={s.num} suffix={s.suffix} />
                                </div>
                                <div className="team-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                VALUES SECTION
            ══════════════════════════════════════ */}
            <section className="team-values-section">
                <div className="team-container">
                    <div className="team-section-header">
                        <span className="team-section-tag">Our Culture</span>
                        <h2 className="team-section-title">What Drives Us</h2>
                        <p className="team-section-sub">
                            The principles that shape how we work, collaborate and grow together every day.
                        </p>
                    </div>
                    <div className="team-values-grid">
                        {values.map((v, i) => (
                            <div className="team-value-card" key={i} style={{ '--delay': `${i * 0.1}s` }}>
                                <div className="team-value-emoji">{v.emoji}</div>
                                <h4 className="team-value-title">{v.title}</h4>
                                <p className="team-value-desc">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                TEAM CARDS
            ══════════════════════════════════════ */}
            <section className="team-section">
                <div className="team-container">
                    <div className="team-section-header">
                        <span className="team-section-tag">The Team</span>
                        <h2 className="team-section-title">Meet the People</h2>
                        <p className="team-section-sub">
                            Talented individuals across engineering, design, product and beyond.
                        </p>
                    </div>

                    {/* Filters — Desktop */}
                    <div className="team-filter-bar">
                        {filters.map((f) => (
                            <button
                                key={f}
                                className={`team-filter-btn${activeFilter === f ? " active" : ""}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Filters — Mobile */}
                    <div className="team-filter-dropdown" ref={dropdownRef}>
                        <button
                            className="team-filter-dropdown-toggle"
                            onClick={() => setDropdownOpen((p) => !p)}
                            aria-haspopup="listbox"
                            aria-expanded={dropdownOpen}
                        >
                            <span>{activeFilter}</span>
                            <svg className={`team-filter-dropdown-arrow${dropdownOpen ? " open" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <ul className="team-filter-dropdown-menu" role="listbox">
                                {filters.map((f) => (
                                    <li key={f} role="option" aria-selected={activeFilter === f}
                                        className={`team-filter-dropdown-item${activeFilter === f ? " active" : ""}`}
                                        onClick={() => { setActiveFilter(f); setDropdownOpen(false); }}
                                    >
                                        {f}
                                        {activeFilter === f && (
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Cards */}
                    {loading && (
                        <div className="team-section-sub" style={{ marginBottom: 12 }}>
                            Loading team members...
                        </div>
                    )}
                    {error && (
                        <div className="team-section-sub" style={{ marginBottom: 12, color: "#dc2626" }}>
                            {error}
                        </div>
                    )}
                    <div className="team-cards-grid">
                        {filtered.map((member, idx) => {
                            const col = categoryColors[member.category] || categoryColors.Leadership;
                            return (
                                <div
                                    key={member.id}
                                    className="team-card-animate"
                                    style={{ animationDelay: `${idx * 0.07}s` }}
                                    onMouseEnter={() => setHoveredCard(member.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className={`team-card${hoveredCard === member.id ? " hovered" : ""}`}>
                                        {/* Top color bar */}
                                        <div className="team-card-top-bar" style={{ background: col.text }} />

                                        {/* Avatar */}
                                        <div className="team-avatar-wrap">
                                            <div className="team-avatar-ring" style={{ borderColor: col.border }}>
                                                <img src={member.avatar} alt={member.name} className="team-avatar-img" />
                                            </div>
                                            <span className="team-avatar-status" style={{ background: col.text }} />
                                        </div>

                                        {/* Info */}
                                        <span className="team-category-tag" style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}>
                                            {member.category}
                                        </span>
                                        <div className="team-member-name">{member.name}</div>
                                        <div className="team-member-role" style={{ color: col.text }}>{member.role}</div>
                                        <p className="team-member-bio">{member.bio}</p>

                                        {/* Social links */}
                                        <div className="team-social-links">
                                            <a href={member.linkedin} className="team-social-btn" aria-label="LinkedIn" title="LinkedIn">
                                                <IoLogoLinkedin />
                                            </a>
                                            <a href={member.twitter} className="team-social-btn" aria-label="Twitter" title="Twitter">
                                                <IoLogoTwitter />
                                            </a>
                                            <a href={member.email} className="team-social-btn" aria-label="Email" title="Email">
                                                <IoMailOutline />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                HIRING BANNER
            ══════════════════════════════════════ */}
            <section className="team-hiring-banner">
                <div className="team-container">
                    <div className="team-hiring-inner">
                        <div className="team-hiring-left">
                            <div className="team-hiring-icon-wrap">
                                <IoRocketOutline />
                            </div>
                            <div>
                                <h3 className="team-hiring-title">We're Hiring!</h3>
                                <p className="team-hiring-sub">Join a team that's building the future of technology. Explore open roles across all departments.</p>
                            </div>
                        </div>
                        <div className="team-hiring-right">
                            <a href="/career" className="team-hiring-btn-primary">View Open Positions</a>
                            <a href="/contact" className="team-hiring-btn-ghost">Get in Touch</a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}