import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/Career.css";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { mapJobForUi } from "../utils/jobUi";

/* ── animated canvas: flowing particles ── */
function HeroCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        let raf;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        /* particles */
        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.00025,
            vy: (Math.random() - 0.5) * 0.00025,
            r: Math.random() * 1.6 + 0.5,
        }));

        const draw = () => {
            const { width: W, height: H } = canvas;
            ctx.clearRect(0, 0, W, H);

            /* move */
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > 1) p.vx *= -1;
                if (p.y < 0 || p.y > 1) p.vy *= -1;
            });

            /* edges */
            const THRESH = 0.19;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < THRESH) {
                        const alpha = (1 - d / THRESH) * 0.18;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(90,120,255,${alpha})`;
                        ctx.lineWidth = 0.75;
                        ctx.moveTo(particles[i].x * W, particles[i].y * H);
                        ctx.lineTo(particles[j].x * W, particles[j].y * H);
                        ctx.stroke();
                    }
                }
            }

            /* dots */
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(100,140,255,0.50)";
                ctx.fill();
            });

            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
    }, []);

    return <canvas ref={ref} className="cr-hero-canvas" />;
}

/* ── main ── */
export default function Career() {
    const navigate = useNavigate();

    const [jobsData, setJobsData] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [jobsError, setJobsError] = useState("");

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All Departments");
    const [email, setEmail] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadJobs = async () => {
            setJobsLoading(true);
            setJobsError("");
            try {
                const response = await apiRequest("/api/jobs?limit=200", { method: "GET" });
                const mapped = (response?.data?.jobs || []).map(mapJobForUi);
                if (isMounted) {
                    setJobsData(mapped);
                }
            } catch (err) {
                if (isMounted) {
                    setJobsError(err?.message || "Unable to load jobs.");
                }
            } finally {
                if (isMounted) setJobsLoading(false);
            }
        };
        loadJobs();
        return () => { isMounted = false; };
    }, []);

    const departments = [
        "All Departments",
        ...Array.from(new Set(jobsData.map(j => j.dept).filter(Boolean))).sort(),
    ];

    const filteredJobs = jobsData.filter(
        job => (department === "All Departments" || job.dept === department) &&
            job.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleApply = job => navigate(`/job-application?id=${job.id}`);
    const handleSubscribe = () => {
        if (email) alert(`Thank you! We will contact you at ${email}`);
        else alert("Please enter email");
    };

    return (
        <div className="career-wrapper">

            {/* ═══════════════════════════════════
                HERO — full layered bg effects
            ═══════════════════════════════════ */}
            <section className="cr-hero-section">

                {/* bg layers */}
                <HeroCanvas />
                <div className="cr-glow cr-glow-1" />
                <div className="cr-glow cr-glow-2" />
                <div className="cr-glow cr-glow-3" />
                <div className="cr-bg-grid" />
                <div className="cr-bg-scanlines" />
                <div className="cr-orbit cr-orbit-1" />
                <div className="cr-orbit cr-orbit-2" />
                <div className="cr-bg-streak" />
                <div className="cr-particles">
                    {[...Array(7)].map((_, i) => <div key={i} className={`cr-p cr-p-${i + 1}`} />)}
                </div>
                <div className="cr-hero-bottom-fade" />

                {/* content */}
                <div className="container cr-hero-inner">
                    <div className="row align-items-center">

                        {/* LEFT */}
                        <div className="col-lg-6 pe-lg-5 cr-hero-left">

                            <div className="cr-eyebrow">
                                <span className="cr-eyebrow-dot" />
                                We're Hiring
                            </div>

                            <h1 className="cr-hero-h1">
                                Build the{" "}
                                <span className="cr-hero-accent">Future</span>
                                <br />with Us
                            </h1>

                            <div className="cr-hero-rule" />

                            <h5 className="cr-hero-subtitle">
                                Join a team of passionate innovators building the future of technology.
                            </h5>

                            <p className="cr-hero-desc">
                                Join a team of innovators, dreamers, and doers shaping the next
                                generation of enterprise software. We're looking for passionate
                                individuals to redefine technology.
                            </p>

                            {/* stats strip */}
                            <div className="cr-mini-stats">
                                {[
                                    { n: "500+", l: "Projects" },
                                    { n: "50+", l: "Team Members" },
                                    { n: "15+", l: "Countries" },
                                ].map((s, i) => (
                                    <React.Fragment key={s.l}>
                                        <div className="cr-mini-stat">
                                            <span className="cr-mini-n">{s.n}</span>
                                            <span className="cr-mini-l">{s.l}</span>
                                        </div>
                                        {i < 2 && <div className="cr-mini-div" />}
                                    </React.Fragment>
                                ))}
                            </div>

                            <button className="cr-join-btn">
                                Join Us <i className="bi bi-arrow-right-short ms-1" />
                            </button>
                        </div>

                        {/* RIGHT — image card */}
                        <div className="col-lg-6 position-relative mt-5 mt-lg-0 cr-hero-right">
                            <div className="cr-img-card-wrap">
                                <div className="cr-img-orbit cr-img-orbit-1" />
                                <div className="cr-img-orbit cr-img-orbit-2" />
                                <div className="cr-img-card">
                                    <div className="cr-corner cr-corner-tl" />
                                    <div className="cr-corner cr-corner-tr" />
                                    <div className="cr-corner cr-corner-bl" />
                                    <div className="cr-corner cr-corner-br" />
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                        className="img-fluid cr-hero-img"
                                        alt="Career team"
                                    />
                                    {/* floating badge */}
                                    <div className="cr-float-badge">
                                        <span className="cr-fb-dot" />
                                        <span>{jobsLoading ? "Loading positions..." : `${jobsData.length} Open Positions`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════
                FOUNDATION (original, unchanged)
            ═══════════════════════════════════ */}
            <section className="foundation-section py-5 text-center">
                <div className="container">
                    <h2 className="foundation-title fw-bold mb-3">Built on Strong Foundation</h2>
                    <p className="text-muted-dark mb-5">Join a team of passionate innovators building the future of technology.</p>
                    <div className="row mt-4 g-3">
                        {[
                            { icon: "bi-heart", title: "HEALTH INSURANCE", desc: "Comprehensive medical coverage" },
                            { icon: "bi-cup-hot", title: "FLEXIBLE HOURS", desc: "Work-life balance" },
                            { icon: "bi-award", title: "CAREER GROWTH", desc: "Learning opportunities" },
                            { icon: "bi-graph-up", title: "PERFORMANCE BONUS", desc: "Reward excellence" },
                        ].map((item, i) => (
                            <div className="col-md-6 col-lg-3" key={i}>
                                <div className="foundation-card p-4 h-100">
                                    <div className="foundation-icon mb-3">
                                        <i className={`bi ${item.icon}`} />
                                    </div>
                                    <h6 className="fw-bold mb-2 text-dark text-uppercase small">{item.title}</h6>
                                    <p className="text-muted small mb-0">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════
                OPEN POSITIONS (original, unchanged)
            ═══════════════════════════════════ */}
            <section className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="position-title fw-bolder">Open Positions</h2>
                    <p className="text-secondary position-paragraph">Find your perfect role</p>
                </div>

                <div className="row justify-content-center mb-1">
                    <div className="col-md-10">
                        <div className="filters-wrapper d-flex gap-3 justify-content-start flex-wrap">
                            <div className="custom-dropdown-container pill-dropdown">
                                <div className="filter-item-dark custom-dropdown-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <span className="selected-value">{department}</span>
                                    <i className={`bi bi-chevron-down select-icon ${isDropdownOpen ? "rotate-180" : ""}`} />
                                </div>
                                {isDropdownOpen && (
                                    <div className="custom-dropdown-menu shadow-lg">
                                        {departments.map(dept => (
                                            <div key={dept}
                                                className={`custom-dropdown-item ${department === dept ? "active" : ""}`}
                                                onClick={() => { setDepartment(dept); setIsDropdownOpen(false); }}>
                                                {dept}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="filter-item-dark pill-search">
                                <input type="text" className="form-control dark-input" placeholder="Search by title..."
                                    value={search} onChange={e => setSearch(e.target.value)} />
                                <i className="bi bi-search search-icon-btn" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 justify-content-center">
                    <div className="col-md-10">
                        {jobsLoading ? (
                            <div className="text-center py-5">
                                <div className="text-muted">Loading open positions...</div>
                            </div>
                        ) : jobsError ? (
                            <div className="text-center py-5">
                                <i className="bi bi-exclamation-triangle text-muted display-6 d-block mb-3" />
                                <h5>{jobsError}</h5>
                            </div>
                        ) : filteredJobs.length > 0 ? filteredJobs.map(job => (
                            <div className="job-card-premium mb-4 p-4 rounded-4 shadow-sm border position-relative" key={job.id}>
                                <div className="row align-items-center">
                                    <div className="col-lg-1 col-md-2 text-center mb-3 mb-md-0">
                                        <div className="job-icon-circle" style={{ backgroundColor: `${job.color}15`, color: job.color }}>
                                            <i className={`bi ${job.icon}`} />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-7 ps-lg-4">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <h5 className="fw-bold mb-0" style={{ color: "#233DFE" }}>{job.title}</h5>
                                            {job.new && <span className="badge bg-success-light text-success small">NEW</span>}
                                        </div>
                                        <div className="d-flex flex-wrap gap-3 text-muted small">
                                            <span><i className="bi bi-briefcase me-1" />{job.dept}</span>
                                            <span><i className="bi bi-geo-alt me-1" />{job.location}</span>
                                            <span><i className="bi bi-clock me-1" />{job.type}</span>
                                            <span><i className="bi bi-currency-dollar me-1" />{job.salary}</span>
                                        </div>
                                        <p className="text-muted small mt-2 mb-0">{job.para}</p>
                                    </div>
                                    <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-md-end gap-3 mt-3 mt-md-0">
                                        <div className="posted-container text-end">
                                            <div className="posted-label">POSTED</div>
                                            <div className="posted-time fw-bold">{job.posted || "Recently"}</div>
                                        </div>
                                        <button className="btn apply-btn-premium px-4 py-2 fw-bold" onClick={() => handleApply(job)}>Apply Now</button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-5">
                                <i className="bi bi-search text-muted display-4 d-block mb-3" />
                                <h5>No positions found matching your search.</h5>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════
                CTA (original, unchanged)
            ═══════════════════════════════════ */}
            <section className="cta-section-premium py-5 px-3">
                <div className="container text-center">
                    <div className="cta-badge-wrapper mb-4">
                        <span className="cta-badge">FUTURE OPPORTUNITIES</span>
                    </div>
                    <h2 className="cta-heading-premium mb-4">Don't See a Role for You?</h2>
                    <p className="cta-description-premium mb-5 mx-auto">
                        Our team is growing rapidly. Join our talent community to stay updated on future opportunities,
                        company news, and insider events tailored to your expertise.
                    </p>
                    <form className="cta-form-premium d-flex justify-content-center gap-3 align-items-center flex-wrap"
                        onSubmit={e => { e.preventDefault(); handleSubscribe(); }}>
                        <input type="email" className="form-control cta-input-premium" placeholder="Enter your email"
                            value={email} onChange={e => setEmail(e.target.value)} required />
                        <button type="submit" className="btn cta-btn-premium">Join Now</button>
                    </form>
                    <div className="cta-footer-text mt-4">
                        By joining, you agree to our <a href="#privacy" className="text-decoration-none">Privacy Policy</a>. No spam, ever.
                    </div>
                </div>
            </section>
        </div>
    );
}

