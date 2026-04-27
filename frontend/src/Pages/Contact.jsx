import React, { useState, useRef, useEffect } from "react";
import { IoSendOutline } from "react-icons/io5";
import "../CSS/Contact.css"; // import the separated CSS
import { apiRequest } from "../utils/api";

/* ── Brand tokens ─────────────────── */
const BLUE = "#233DFE";
const BLACK = "#000000";
const WHITE = "#ffffff";

const COUNTRIES = [
    {
        code: "IN", name: "India", flag: "🇮🇳",
        city: "Bhubaneswar, India",
        address: "DLF Cyber City, Bhubaneswar, Odisha 751024",
        phone: "+91 (674) 123-4567", timezone: "IST · UTC+5:30",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.928!2d85.80554!3d20.34904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190908258c4c55%3A0xee1fcd1f11e55141!2sDLF%20Cyber%20City%2C%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1709000000000",
    },
    {
        code: "AE", name: "Dubai", flag: "🇦🇪",
        city: "Dubai, UAE",
        address: "Dubai Internet City, Al Sufouh, Dubai 500001",
        phone: "+971 4 123 4567", timezone: "GST · UTC+4:00",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178!2d55.1484!3d25.0957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402d6e2bd%3A0x8f10c12de9b12f7!2sDubai%20Internet%20City!5e0!3m2!1sen!2sae!4v1709000000001",
    },
    {
        code: "US", name: "New York", flag: "🇺🇸",
        city: "New York, USA",
        address: "One World Trade Center, Manhattan, NY 10007",
        phone: "+1 (212) 123-4567", timezone: "EST · UTC−5:00",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.656!2d-74.0134!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sOne%20World%20Trade%20Center!5e0!3m2!1sen!2sus!4v1709000000002",
    },
    {
        code: "GB", name: "London", flag: "🇬🇧",
        city: "London, UK",
        address: "Canary Wharf, One Canada Square, London E14 5AB",
        phone: "+44 20 7123 4567", timezone: "GMT · UTC+0:00",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.458!2d-0.0197!3d51.5055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487602b7b2f08f39%3A0xf10c1d3a07dcae72!2sOne%20Canada%20Square!5e0!3m2!1sen!2sgb!4v1709000000003",
    },
];

const CONTACTS = [
    { icon: "✉", title: "Sales Support", sub: "Mon–Fri · 9 am – 6 pm EST", email: "sales@coredata.com", phone: "+1 (888) 123-4567" },
    { icon: "🎧", title: "Technical NOC", sub: "Priority support · 24 / 7", email: "noc@coredata.com", phone: "+1 (888) 999-0000" },
    { icon: "ℹ", title: "General Inquiries", sub: "Partnerships & corporate", email: "hello@coredata.com", phone: "+1 (888) 555-4433" },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
    const [country, setCountry] = useState(COUNTRIES[0]);
    const [dropOpen, setDropOpen] = useState(false);
    const [mapKey, setMapKey] = useState(0);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [hovered, setHovered] = useState(null);
    const dropRef = useRef(null);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const pick = (c) => { setCountry(c); setDropOpen(false); setMapKey(k => k + 1); };
    const send = async () => {
        if (sending) return;
        setError("");

        const payload = {
            name: form.name.trim(),
            company: form.company.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
        };

        if (!payload.name || !payload.email || !payload.message) {
            setError("Please fill in your name, email, and message.");
            return;
        }

        setSending(true);
        try {
            await apiRequest("/api/inquiries", { method: "POST", body: payload });
            setSent(true);
            setForm({ name: "", company: "", email: "", message: "" });
            setTimeout(() => setSent(false), 2800);
        } catch (err) {
            setError(err?.message || "Unable to send your message right now.");
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    return (
        <div className="cnt-contact-page" style={{ fontFamily: "'Syne', 'Segoe UI', sans-serif", background: WHITE, color: BLACK }}>
            {/* Top accent stripe */}
            <div className="cnt-top-stripe" style={{ background: BLUE }} />

            {/* CONTACT SECTION */}
            <section className="cnt-contact-section">
                {/* Ghost word watermark */}
                <div className="cnt-ghost-watermark" style={{ color: `${BLUE}07` }}>COREDATA</div>

                {/* Decorative blue rotated square */}
                <div className="cnt-decor-square cnt-top-right" style={{ background: BLUE }} />
                <div className="cnt-decor-square cnt-bottom-left" style={{ borderColor: BLUE }} />

                <div className="cnt-contact-grid">
                    {/* LEFT column */}
                    <div className="cnt-left-col">
                        <div className="cnt-section-label">
                            <div className="cnt-label-line" style={{ background: BLUE }} />
                            <span style={{ color: BLUE }}>Enterprise Connectivity</span>
                        </div>

                        <h1 className="cnt-main-heading">
                            Get in<br />
                            <span style={{ color: BLUE }}>Touch.</span>
                        </h1>

                        <p className="cnt-sub-text">
                            Enterprise-grade colocation &amp; connectivity solutions.<br />
                            Our experts are available around the clock.
                        </p>

                        {/* Contact cards */}
                        <div className="cnt-contact-cards">
                            {CONTACTS.map((c, i) => (
                                <div
                                    key={c.title}
                                    className={`cnt-contact-card ${hovered === i ? 'cnt-hovered' : ''}`}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{
                                        borderColor: hovered === i ? BLUE : "#ebebeb",
                                        background: hovered === i ? `${BLUE}08` : WHITE,
                                        transform: hovered === i ? "translateX(5px)" : "none",
                                    }}
                                >
                                    <div className="cnt-card-icon" style={{ background: hovered === i ? BLUE : `${BLUE}12` }}>
                                        {c.icon}
                                    </div>
                                    <div className="cnt-card-content">
                                        <div className="cnt-card-title">{c.title}</div>
                                        <div className="cnt-card-sub">{c.sub}</div>
                                        <div className="cnt-card-email" style={{ color: BLUE }}>{c.email}</div>
                                        <div className="cnt-card-phone">{c.phone}</div>
                                    </div>
                                    <div className="cnt-card-arrow" style={{ color: hovered === i ? BLUE : "#ddd", transform: hovered === i ? "translateX(3px)" : "none" }}>→</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT column – Form */}
                    <div className="cnt-form-card" style={{ background: BLACK }}>
                        {/* Blue glow blobs */}
                        <div className="cnt-glow-blob cnt-top-right" style={{ background: BLUE }} />
                        <div className="cnt-glow-blob cnt-bottom-left" style={{ background: BLUE }} />

                        <div className="cnt-form-content">
                            {/* Form header */}
                            <div className="cnt-form-header">
                                <div className="cnt-form-icon" style={{ background: BLUE }}>✦</div>
                                <div>
                                    <div className="cnt-form-title" style={{ color: WHITE }}>Send a Message</div>
                                    <div className="cnt-form-subtitle">We respond within one business day</div>
                                </div>
                            </div>

                            {/* Name + Company row */}
                            <div className="cnt-form-row">
                                {[["name", "Full Name", "Alex Johnson"], ["company", "Company", "Enterprise Inc."]].map(([n, l, ph]) => (
                                    <div key={n} className="cnt-input-group">
                                        <label style={{ color: BLUE }}>{l}</label>
                                        <input
                                            name={n} placeholder={ph} value={form[n]} onChange={handle}
                                            className="cnt-form-input"
                                            style={{ color: WHITE }}
                                            onFocus={e => e.target.style.borderBottomColor = BLUE}
                                            onBlur={e => e.target.style.borderBottomColor = "#222"}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Email */}
                            <div className="cnt-input-group">
                                <label style={{ color: BLUE }}>Email Address</label>
                                <input
                                    name="email" type="email" placeholder="alex@company.com" value={form.email} onChange={handle}
                                    className="cnt-form-input"
                                    style={{ color: WHITE }}
                                    onFocus={e => e.target.style.borderBottomColor = BLUE}
                                    onBlur={e => e.target.style.borderBottomColor = "#222"}
                                />
                            </div>

                            {/* Message */}
                            <div className="cnt-input-group">
                                <label style={{ color: BLUE }}>Message</label>
                                <textarea
                                    name="message" placeholder="Tell us about your requirements…" value={form.message} onChange={handle} rows={4}
                                    className="cnt-form-input"
                                    style={{ color: WHITE }}
                                    onFocus={e => e.target.style.borderBottomColor = BLUE}
                                    onBlur={e => e.target.style.borderBottomColor = "#222"}
                                />
                            </div>

                            {/* Send button */}
                            <button
                                onClick={send}
                                className={`cnt-send-button ${sending ? 'cnt-sending' : ''} ${sent ? 'cnt-sent' : ''}`}
                                style={{
                                    background: sent ? "#0a8c47" : BLUE,
                                    boxShadow: `0 6px 28px ${BLUE}55`,
                                }}
                                disabled={sending}
                                onMouseEnter={e => { if (!sent) { e.currentTarget.style.background = "#1a30e0"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                                onMouseLeave={e => { e.currentTarget.style.background = sent ? "#0a8c47" : BLUE; e.currentTarget.style.transform = "none"; }}
                            >
                                {sending
                                    ? <><span className="cnt-spinner" /> Sending…</>
                                    : sent
                                        ? <>✓ &nbsp;Message Sent!</>
                                        : <>Send Message &nbsp;<IoSendOutline /></>
                                }
                            </button>
                            {error && (
                                <div style={{ marginTop: 12, color: "#fca5a5", fontSize: 13 }}>
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blue accent divider */}
            <div className="cnt-accent-divider" style={{ background: `linear-gradient(90deg,transparent,${BLUE},transparent)` }} />

            {/* LOCATION + MAP SECTION */}
            <section className="cnt-map-section" style={{ background: BLACK }}>
                <iframe
                    key={mapKey}
                    title={`Map – ${country.city}`}
                    src={country.mapSrc}
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    className="cnt-map-iframe"
                />

                {/* Bottom vignette */}
                <div className="cnt-map-vignette" />

                {/* Selector bar */}
                <div className="cnt-selector-bar">
                    {/* Info pill */}
                    <div className="cnt-info-pill" style={{ borderColor: `${BLUE}55` }}>
                        <div className="cnt-info-city" style={{ color: WHITE }}>
                            {country.flag} &nbsp;{country.city}
                        </div>
                        <div className="cnt-info-address">{country.address}</div>
                        <div className="cnt-info-timezone" style={{ color: BLUE }}>{country.timezone} · {country.phone}</div>
                    </div>

                    {/* Flag dropdown */}
                    <div ref={dropRef} className="cnt-dropdown-container">
                        <button
                            onClick={() => setDropOpen(o => !o)}
                            className="cnt-dropdown-button"
                            style={{ background: BLUE, boxShadow: `0 6px 28px ${BLUE}66` }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
                        >
                            <span className="cnt-flag-icon">{country.flag}</span>
                            {country.name}
                            <span className="cnt-dropdown-arrow">{dropOpen ? "▲" : "▼"}</span>
                        </button>

                        {dropOpen && (
                            <div className="cnt-dropdown-menu" style={{ background: BLACK, borderColor: "#1e1e1e" }}>
                                <div className="cnt-dropdown-header">
                                    <span style={{ color: BLUE }}>◉ &nbsp;Select Location</span>
                                </div>
                                {COUNTRIES.map(c => {
                                    const active = c.code === country.code;
                                    return (
                                        <div
                                            key={c.code}
                                            onClick={() => pick(c)}
                                            className={`cnt-dropdown-item ${active ? 'cnt-active' : ''}`}
                                            style={{
                                                background: active ? "#0d0d0d" : "transparent",
                                                borderLeftColor: active ? BLUE : "transparent",
                                            }}
                                            onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#0a0a0a"; }}
                                            onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                                        >
                                            <span className="cnt-flag-icon">{c.flag}</span>
                                            <div className="cnt-item-details">
                                                <div className="cnt-item-name" style={{ color: active ? WHITE : "#888" }}>{c.name}</div>
                                                <div className="cnt-item-timezone">{c.timezone}</div>
                                            </div>
                                            {active && <div className="cnt-active-dot" style={{ background: BLUE }} />}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Bottom stripe */}
            <div className="cnt-bottom-stripe" style={{ background: BLUE }} />
        </div>
    );
}
