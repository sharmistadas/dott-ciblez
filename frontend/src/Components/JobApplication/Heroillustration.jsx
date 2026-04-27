import "../../CSS/JobApplication.css";

/* ─── Department-based illustration config ─── */
const deptConfig = {
    "Engineering": {
        bigCardLeft: { label: "DEV", bg: "#eef2ff", color: "#3b5bff" },
        bigCardRight: { label: "OPS", bg: "#eff6ff", color: "#2563eb", strip: "#93c5fd" },
        primaryBadge: "ENGINEER",
        searchBg: "#3b5bff",
        redPillBg: "#3b5bff",
    }, 
    "UI/UX Design": {
        bigCardLeft: { label: "UX", bg: "#fdf2f8", color: "#db2777" },
        bigCardRight: { label: "UI", bg: "#eff6ff", color: "#2563eb", strip: "#93c5fd" },
        primaryBadge: "DESIGNER",
        searchBg: "#db2777",
        redPillBg: "#db2777",
    },
    "Marketing": {
        bigCardLeft: { label: "SEO", bg: "#fefce8", color: "#ca8a04" },
        bigCardRight: { label: "ADS", bg: "#fff7ed", color: "#ea580c", strip: "#fed7aa" },
        primaryBadge: "MARKETER",
        searchBg: "#ca8a04",
        redPillBg: "#ca8a04",
    },
    "IT Desk Support": {
        bigCardLeft: { label: "L1", bg: "#f0fdf4", color: "#059669" },
        bigCardRight: { label: "L2", bg: "#ecfdf5", color: "#10b981", strip: "#6ee7b7" },
        primaryBadge: "SUPPORT",
        searchBg: "#059669",
        redPillBg: "#059669",
    },
    "Accounting": {
        bigCardLeft: { label: "HR", bg: "#f5f3ff", color: "#4f46e5" },
        bigCardRight: { label: "FIN", bg: "#eef2ff", color: "#6366f1", strip: "#c7d2fe" },
        primaryBadge: "EXECUTIVE",
        searchBg: "#4f46e5",
        redPillBg: "#4f46e5",
    },
};

const defaultConfig = deptConfig["UI/UX Design"];

const HeroIllustration = ({ job }) => {
    const cfg = (job && deptConfig[job.dept]) ? deptConfig[job.dept] : defaultConfig;

    return (
        <div className="hero-right">

            {/* Mini preview card */}
            <div className="il-mini-card">
                <div className="il-mini-img">
                    <svg width="14" height="14" fill="rgba(255,255,255,0.6)" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg>
                </div>
                <div className="il-mini-lines"><span></span><span></span></div>
            </div>

            {/* Accent pill — color changes by dept */}
            <div
                className="il-red-pill"
                style={{ background: cfg.redPillBg }}
            ></div>

            {/* Big left card — label changes by dept */}
            <div
                className="il-ux-card"
                style={{ background: cfg.bigCardLeft.bg, color: cfg.bigCardLeft.color }}
            >
                <span>{cfg.bigCardLeft.label}</span>
            </div>

            {/* VS label */}
            <div className="il-vs">vs</div>

            {/* Big right card — label changes by dept */}
            <div
                className="il-ui-card"
                style={{ background: cfg.bigCardRight.bg, color: cfg.bigCardRight.color }}
            >
                <span>{cfg.bigCardRight.label}</span>
                <div
                    className="il-ui-strip"
                    style={{ background: cfg.bigCardRight.strip }}
                ></div>
            </div>

            {/* Play button */}
            <div className="il-play">
                <svg width="13" height="13" fill="#fff" viewBox="0 0 16 16">
                    <path d="M6 3.84v8.32L13 8 6 3.84z" />
                </svg>
            </div>

            {/* Search bubble — color changes by dept */}
            <div
                className="il-search"
                style={{ background: cfg.searchBg }}
            >
                <svg width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                </svg>
            </div>

            {/* Toolbar (pencil / pin / trash) */}
            <div className="il-toolbar">
                <div className="il-tool-btn">
                    <svg width="10" height="10" fill={cfg.bigCardLeft.color} viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10z" />
                    </svg>
                </div>
                <div className="il-tool-btn">
                    <svg width="10" height="10" fill="#6b7280" viewBox="0 0 16 16">
                        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5a.5.5 0 0 1-1 0V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354z" />
                    </svg>
                </div>
                <div className="il-tool-btn">
                    <svg width="10" height="10" fill="#6b7280" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </div>
            </div>

            {/* PRIMARY badge — label changes by dept */}
            <div className="il-primary-badge">{cfg.primaryBadge}</div>

        </div>
    );
};

export default HeroIllustration;