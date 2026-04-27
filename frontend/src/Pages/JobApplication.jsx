import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../CSS/JobApplication.css";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import HeroIllustration from "../Components/JobApplication/Heroillustration";
import { apiRequest } from "../utils/api";
import { mapJobForUi } from "../utils/jobUi";

/* ─── Skills per Department ─── */
const skillSets = {
    Engineering: {
        "Core Languages": ["JavaScript", "TypeScript", "Python", "Java", "Go", "Rust", "C#"],
        "Frontend": ["React.js", "Next.js", "Vue.js", "Angular", "HTML/CSS", "Tailwind CSS"],
        "Backend": ["Node.js", "Express", "Django", "Spring Boot", "GraphQL", "REST APIs"],
        "DevOps & Cloud": ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD Pipelines"],
        "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
        "Tools": ["Git", "Jira", "Figma", "Postman", "VS Code"],
    },
    "UI/UX Design": {
        "Design Tools": ["Figma", "Adobe XD", "Sketch", "InVision", "Zeplin", "Framer"],
        "Disciplines": ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Information Architecture"],
        "Visual Design": ["Typography", "Color Theory", "Design Systems", "Motion Design", "Branding"],
        "Dev Handoff": ["HTML/CSS basics", "Responsive Design", "Accessibility (WCAG)", "Storybook"],
        "Soft Skills": ["Stakeholder Communication", "Design Critique", "Workshop Facilitation"],
    },
    Marketing: {
        "Digital Channels": ["SEO/SEM", "Google Ads", "Meta Ads", "LinkedIn Ads", "Email Marketing"],
        "Content": ["Copywriting", "Blog / Long-form", "Video Scripting", "Social Media"],
        "Analytics": ["Google Analytics", "GA4", "HubSpot", "Salesforce", "Mixpanel"],
        "Strategy": ["Campaign Planning", "A/B Testing", "Brand Strategy", "Market Research"],
        "Tools": ["Canva", "Hootsuite", "Mailchimp", "WordPress", "Notion"],
    },
    "IT Desk Support": {
        "OS & Networking": ["Windows 10/11", "macOS", "Linux", "Active Directory", "TCP/IP", "VPN Setup"],
        "Hardware": ["Laptop/PC Setup", "Printer Troubleshooting", "Peripheral Management"],
        "Software": ["Microsoft 365", "Google Workspace", "Jira/Zendesk", "Remote Desktop Tools"],
        "Security": ["Antivirus Management", "MFA Setup", "Data Backup & Recovery", "IT Policies"],
        "Soft Skills": ["End-user Communication", "Escalation Management", "Documentation"],
    },
    Accounting: {
        "Accounting": ["Bookkeeping", "Accounts Payable/Receivable", "Bank Reconciliation", "Payroll"],
        "Software": ["QuickBooks", "SAP", "Tally", "Excel (Advanced)", "Zoho Books"],
        "HR Skills": ["Recruitment Support", "Onboarding", "HRIS Systems", "Performance Management"],
        "Compliance": ["GST/VAT Filing", "TDS", "Statutory Compliance", "Audit Support"],
        "Soft Skills": ["Attention to Detail", "Confidentiality", "Cross-team Coordination"],
    },
};

const availabilityOptions = ["Immediately", "Within 2 weeks", "Within 1 month", "Within 2 months", "3+ months"];
const workModeOptions = ["Full Remote", "Hybrid", "On-site", "Flexible"];
const ratingLabels = ["", "Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];

/* ─── SVG Icons ─── */
const LocationIcon = () => (<svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>);
const ClockIcon = () => (<svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" /><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" /></svg>);
const MoneyIcon = () => (<svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16"><path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4z" /></svg>);
const PersonIcon = () => (<svg width="15" height="15" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" /></svg>);
const BriefcaseIcon = () => (<svg width="15" height="15" fill="currentColor" viewBox="0 0 16 16"><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" /></svg>);
const FileIcon = () => (<svg width="15" height="15" fill="currentColor" viewBox="0 0 16 16"><path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2L9.5 1.5z" /></svg>);
const SkillsIcon = () => (<svg width="15" height="15" fill="currentColor" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" /><path d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm0 2A.5.5 0 0 1 6 8h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zm0 2A.5.5 0 0 1 6 10h2a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" /></svg>);
const CheckIcon = () => (<svg width="11" height="11" fill="none" viewBox="0 0 14 14"><path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const StarIcon = ({ filled }) => (<svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#2235eb" : "none"} stroke={filled ? "#2235eb" : "#cbd5e1"} strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);

/* ─── Skill Rating Row ─── */
const SkillRating = ({ skill, rating, onRate }) => (
    <div className="skill-rating-row">
        <span className="skill-rating-label">{skill}</span>
        <div className="skill-stars">
            {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button" className="star-btn"
                    onClick={() => onRate(skill, n)}
                    title={ratingLabels[n]}>
                    <StarIcon filled={n <= (rating || 0)} />
                </button>
            ))}
            <span className={`skill-level-pill ${rating ? "skill-level-pill-active" : ""}`}>
                {ratingLabels[rating || 0] || "Not rated"}
            </span>
        </div>
    </div>
);

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
const JobApplication = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);

    const jobId = searchParams.get("id");
    const [job, setJob] = useState(null);
    const [jobLoading, setJobLoading] = useState(true);
    const [jobError, setJobError] = useState("");

    useEffect(() => {
        let isMounted = true;
        const loadJob = async () => {
            setJobLoading(true);
            setJobError("");
            try {
                let jobData = null;
                if (jobId) {
                    const response = await apiRequest(`/api/jobs/${jobId}`, { method: "GET" });
                    jobData = response?.data?.job || null;
                } else {
                    const response = await apiRequest("/api/jobs?limit=1", { method: "GET" });
                    jobData = (response?.data?.jobs || [])[0] || null;
                }
                if (!jobData) throw new Error("Job not found.");
                if (isMounted) setJob(mapJobForUi(jobData));
            } catch (err) {
                if (isMounted) setJobError(err?.message || "Unable to load job details.");
            } finally {
                if (isMounted) setJobLoading(false);
            }
        };
        loadJob();
        return () => { isMounted = false; };
    }, [jobId]);

    /* ── derive skill set for this job ── */
    const deptKey = Object.keys(skillSets).find(k => (job?.dept || "").toLowerCase().includes(k.toLowerCase())) || "Engineering";
    const skillGroups = skillSets[deptKey];

    /* ── state ── */
    const [checkedSkills, setCheckedSkills] = useState({});
    const [skillRatings, setSkillRatings] = useState({});
    const [availability, setAvailability] = useState("");
    const [workMode, setWorkMode] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const [expectedSalary, setExpectedSalary] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [coverNote, setCoverNote] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [confirmChecks, setConfirmChecks] = useState({ work: false, interview: false, skills: false });
    const [submitted, setSubmitted] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [currentJobTitle, setCurrentJobTitle] = useState("");
    const [totalExperience, setTotalExperience] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const toggleSkill = skill => setCheckedSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
    const rateSkill = (skill, r) => setSkillRatings(prev => ({ ...prev, [skill]: r }));
    const toggleConfirm = key => setConfirmChecks(prev => ({ ...prev, [key]: !prev[key] }));

    const checkedCount = Object.values(checkedSkills).filter(Boolean).length;
    const requiredFieldsValid = fullName.trim() && email.trim() && phone.trim();
    const canSubmit = requiredFieldsValid && agreeTerms && Object.values(confirmChecks).every(Boolean);

    const buildSkillsPayload = () => (
        Object.keys(checkedSkills)
            .filter(k => checkedSkills[k])
            .map(name => {
                const rating = skillRatings[name];
                return rating ? { name, rating } : { name };
            })
    );

    const handleSubmit = async () => {
        if (!canSubmit || !job?.id) return;
        setSubmitError("");
        setSubmitLoading(true);
        try {
            await apiRequest("/api/applications", {
                method: "POST",
                body: {
                    job: job.id,
                    fullName: fullName.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    currentJobTitle: currentJobTitle.trim(),
                    totalExperience: totalExperience ? Number(totalExperience) : 0,
                    linkedinUrl: linkedinUrl.trim(),
                    skills: buildSkillsPayload(),
                    availability,
                    workMode,
                    noticePeriod: noticePeriod.trim(),
                    expectedSalary: expectedSalary.trim(),
                    portfolioUrl: portfolioUrl.trim(),
                    coverNote: coverNote.trim(),
                },
            });
            setSubmitted(true);
        } catch (err) {
            setSubmitError(err?.message || "Unable to submit application.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const steps = [
        { id: 1, label: "Personal Info", num: "STEP 01", Icon: PersonIcon },
        { id: 2, label: "Professional Details", num: "STEP 02", Icon: BriefcaseIcon },
        { id: 3, label: "Documents", num: "STEP 03", Icon: FileIcon },
        { id: 4, label: "Skills Assessment", num: "STEP 04", Icon: SkillsIcon },
    ];
    if (jobLoading) {
        return (
            <div className="apply-page">
                <div className="text-center py-5">
                    <div className="text-muted">Loading job details...</div>
                </div>
            </div>
        );
    }

    if (jobError || !job) {
        return (
            <div className="apply-page">
                <div className="text-center py-5">
                    <i className="bi bi-exclamation-triangle text-muted display-6 d-block mb-3" />
                    <h5>{jobError || "Job not found."}</h5>
                    <button className="back-jobs-btn mt-4" onClick={() => navigate("/career")}>← Back to All Jobs</button>
                </div>
            </div>
        );
    }

    /* ── Success Screen ── */
    if (submitted) return (
        <div className="apply-page">
            <div className="success-screen">
                <div className="success-inner">
                    <div className="success-anim">
                        <svg width="60" height="60" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="38" fill="#eef2ff" stroke="#2235eb" strokeWidth="2" />
                            <path d="M22 40l13 13 22-22" stroke="#2235eb" strokeWidth="4"
                                strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </div>
                    <h2 className="success-title">Application Submitted!</h2>
                    <p className="success-sub">
                        Thank you for applying for <strong>{job.title}</strong>.<br />
                        We'll review your application and reach out within 3–5 business days.
                    </p>
                    <div className="success-meta-grid">
                        <div className="smg-item"><span className="smg-label">Role</span><span className="smg-val">{job.title}</span></div>
                        <div className="smg-item"><span className="smg-label">Skills Selected</span><span className="smg-val">{checkedCount}</span></div>
                        <div className="smg-item"><span className="smg-label">Availability</span><span className="smg-val">{availability || "—"}</span></div>
                        <div className="smg-item"><span className="smg-label">Work Mode</span><span className="smg-val">{workMode || "—"}</span></div>
                    </div>
                    {checkedCount > 0 && (
                        <div className="success-skill-chips">
                            {Object.keys(checkedSkills).filter(k => checkedSkills[k]).map(s => (
                                <span key={s} className="submit-skill-chip">{s}</span>
                            ))}
                        </div>
                    )}
                    <button className="back-jobs-btn" onClick={() => navigate("/career")}>← Back to All Jobs</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="apply-page">

            {/* ══ HERO ══ */}
            <div className="hero-banner">
                <div className="hero-inner">
                    <div className="hero-left">
                        <div className="hero-breadcrumb">
                            <span onClick={() => navigate("/career")} style={{ cursor: "pointer" }} className="bc-back">← JOBS</span>
                            <span className="bc-sep">/</span>
                            <span>APPLY</span>
                        </div>
                        <h1 className="hero-title">{job.title}</h1>
                        <div className="hero-tags">
                            <span className="hero-tag"><LocationIcon />&nbsp;{job.location}</span>
                            <span className="hero-tag"><ClockIcon />&nbsp;{job.type}</span>
                            <span className="hero-tag"><MoneyIcon />&nbsp;{job.salary}</span>
                        </div>
                    </div>
                    <HeroIllustration job={job} />
                </div>
            </div>

            {/* ══ FORM SECTION ══ */}
            <div className="apply-section">
                <div className="apply-row">

                    {/* Sidebar */}
                    <div className="steps">
                        {steps.map(s => (
                            <div key={s.id} className={`step ${activeStep === s.id ? "active" : ""} ${activeStep > s.id ? "done" : ""}`}>
                                <div className="step-icon-wrap">
                                    {activeStep > s.id ? <CheckIcon /> : <s.Icon />}
                                </div>
                                <div>
                                    <small>{s.num}</small>
                                    <p>{s.label}</p>
                                </div>
                            </div>
                        ))}

                        {/* Skill pill summary in sidebar */}
                        {activeStep >= 4 && checkedCount > 0 && (
                            <div className="sidebar-skill-summary">
                                <div className="sss-label">Skills tagged</div>
                                <div className="sss-count">{checkedCount}</div>
                                <div className="sss-bar-track">
                                    <div className="sss-bar-fill" style={{ width: `${Math.min(100, (checkedCount / 12) * 100)}%` }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Forms column */}
                    <div className="apply-forms">

                        {/* ── STEP 1: Personal Info ── */}
                        <div className={`form-card ${activeStep < 1 ? "card-locked" : ""}`}>
                            <div className="card-body">
                                <div className="card-head">
                                    <div className="card-head-icon"><PersonIcon /></div>
                                    <div><h5>Personal Info</h5><p className="subtitle">Please provide your contact details</p></div>
                                </div>
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            className="form-control"
                                            placeholder="Jane Cooper"
                                            value={fullName}
                                            onChange={e => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            placeholder="jane@example.com"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-row-1">
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            className="form-control"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="btn-row">
                                    <button className="next-btn" onClick={() => setActiveStep(2)}>Next Step →</button>
                                </div>
                            </div>
                        </div>

                        {/* ── STEP 2: Professional Details ── */}
                        <div className={`form-card ${activeStep < 2 ? "card-locked" : ""}`}>
                            <div className="card-body">
                                <div className="card-head">
                                    <div className="card-head-icon"><BriefcaseIcon /></div>
                                    <div><h5>Professional Details</h5><p className="subtitle">Tell us about your work background</p></div>
                                </div>
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="form-label">Current Job Title</label>
                                        <input
                                            className="form-control"
                                            placeholder={`e.g. ${job.title}`}
                                            value={currentJobTitle}
                                            onChange={e => setCurrentJobTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Total Experience (Years)</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={totalExperience}
                                            onChange={e => setTotalExperience(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-row-1 form-row-wide">
                                    <div className="form-group">
                                        <label className="form-label">LinkedIn Profile URL</label>
                                        <input
                                            className="form-control"
                                            placeholder="linkedin.com/in/username"
                                            value={linkedinUrl}
                                            onChange={e => setLinkedinUrl(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="btn-row">
                                    <button className="next-btn" onClick={() => setActiveStep(3)}>Next Step →</button>
                                </div>
                            </div>
                        </div>

                        {/* ── STEP 3: Documents ── */}
                        <div className={`form-card ${activeStep < 3 ? "card-locked" : ""}`}>
                            <div className="card-body">
                                <div className="card-head">
                                    <div className="card-head-icon"><HiOutlineDocumentText /></div>
                                    <div><h5>Documents</h5><p className="subtitle">Upload your supporting files</p></div>
                                </div>
                                <div className="doc-box">
                                    <p className="doc-label">SEND YOUR RESUME TO THIS EMAIL OR WHATSAPP</p>
                                    <div className="doc-contacts">
                                        <a href="mailto:hr.recruiter@dottcibleztechnologies.com" className="contact-link">
                                            <MdOutlineEmail className="email-icon" />
                                            hr.recruiter@dottcibleztechnologies.com
                                        </a>
                                        <a href="https://wa.me/7077791446" className="contact-link whatsapp-link" target="_blank" rel="noreferrer">
                                            <FaWhatsapp className="whatsapp-icon" />
                                            +91 7077791446
                                        </a>
                                    </div>
                                </div>
                                <div className="btn-row" style={{ marginTop: 32 }}>
                                    <button className="next-btn" onClick={() => setActiveStep(4)}>Next Step →</button>
                                </div>
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════
                            ── STEP 4: SKILLS ASSESSMENT ──
                        ══════════════════════════════════════════ */}
                        <div className={`form-card skills-card ${activeStep < 4 ? "card-locked" : ""}`}>
                            <div className="card-body">

                                {/* Card header */}
                                <div className="card-head">
                                    <div className="card-head-icon skills-head-icon"><SkillsIcon /></div>
                                    <div>
                                        <h5>Skills Assessment</h5>
                                        <p className="subtitle">Tick every skill you know · Rate your level with stars</p>
                                    </div>
                                </div>

                                {/* Live progress banner */}
                                {activeStep >= 4 && (
                                    <div className="skills-progress-banner">
                                        <div className="spb-left">
                                            <span className="spb-count">{checkedCount}</span>
                                            <span className="spb-text">
                                                {checkedCount === 0
                                                    ? "skills selected — start checking below"
                                                    : `skill${checkedCount > 1 ? "s" : ""} selected for `}
                                                {checkedCount > 0 && <strong>{job.title}</strong>}
                                            </span>
                                        </div>
                                        <div className="spb-bar-wrap">
                                            <div className="spb-bar-track">
                                                <div className="spb-bar-fill"
                                                    style={{ width: `${Math.min(100, (checkedCount / 12) * 100)}%` }} />
                                            </div>
                                            <span className="spb-pct">{Math.round((checkedCount / 12) * 100)}%</span>
                                        </div>
                                    </div>
                                )}

                                {/* ── Skill Groups ── */}
                                {Object.entries(skillGroups).map(([groupName, skills]) => {
                                    const groupChecked = skills.filter(s => checkedSkills[s]).length;
                                    return (
                                        <div key={groupName} className="skill-group">

                                            {/* Group header */}
                                            <div className="skill-group-header">
                                                <span className="skill-group-title">{groupName}</span>
                                                <span className={`skill-group-badge ${groupChecked > 0 ? "skill-group-badge-active" : ""}`}>
                                                    {groupChecked}/{skills.length}
                                                </span>
                                            </div>

                                            {/* Chip grid */}
                                            <div className="skill-chips-grid">
                                                {skills.map(skill => {
                                                    const checked = !!checkedSkills[skill];
                                                    return (
                                                        <button
                                                            key={skill}
                                                            type="button"
                                                            className={`skill-chip ${checked ? "skill-chip-checked" : ""}`}
                                                            onClick={() => toggleSkill(skill)}
                                                        >
                                                            <span className="skill-chip-check">{checked && <CheckIcon />}</span>
                                                            {skill}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* Rating rows — only for checked skills */}
                                            {skills.some(s => checkedSkills[s]) && (
                                                <div className="skill-ratings-section">
                                                    <div className="srs-label">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#2235eb">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                        Rate your proficiency level
                                                    </div>
                                                    {skills.filter(s => checkedSkills[s]).map(skill => (
                                                        <SkillRating
                                                            key={skill}
                                                            skill={skill}
                                                            rating={skillRatings[skill]}
                                                            onRate={rateSkill}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* ── Divider ── */}
                                <div className="section-divider" />

                                {/* ── Availability & Preferences ── */}
                                <div className="pref-section">
                                    <h6 className="pref-section-title">Availability &amp; Preferences</h6>

                                    <div className="form-row-2">
                                        <div className="form-group">
                                            <label className="form-label">When can you start?</label>
                                            <div className="radio-pill-group">
                                                {availabilityOptions.map(opt => (
                                                    <label key={opt} className={`radio-pill ${availability === opt ? "radio-pill-active" : ""}`}>
                                                        <input type="radio" name="availability" value={opt}
                                                            checked={availability === opt} onChange={() => setAvailability(opt)}
                                                            style={{ display: "none" }} />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Preferred Work Mode</label>
                                            <div className="radio-pill-group">
                                                {workModeOptions.map(opt => (
                                                    <label key={opt} className={`radio-pill ${workMode === opt ? "radio-pill-active" : ""}`}>
                                                        <input type="radio" name="workMode" value={opt}
                                                            checked={workMode === opt} onChange={() => setWorkMode(opt)}
                                                            style={{ display: "none" }} />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row-2" style={{ marginTop: 10 }}>
                                        <div className="form-group">
                                            <label className="form-label">Notice Period</label>
                                            <input className="form-control" placeholder="e.g. 30 days"
                                                value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Expected Salary (Annual)</label>
                                            <input className="form-control" placeholder="e.g. $95,000"
                                                value={expectedSalary} onChange={e => setExpectedSalary(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: 6 }}>
                                        <label className="form-label">Portfolio / GitHub / Website URL</label>
                                        <input className="form-control" placeholder="https://yourportfolio.com"
                                            value={portfolioUrl} onChange={e => setPortfolioUrl(e.target.value)} />
                                    </div>
                                </div>

                                {/* ── Divider ── */}
                                <div className="section-divider" />

                                {/* ── Cover Note ── */}
                                <div className="cover-note-section">
                                    <h6 className="pref-section-title">
                                        Cover Note
                                        <span className="optional-tag">optional</span>
                                    </h6>
                                    <p className="cover-note-hint">
                                        A short personal note goes a long way. Tell us why you're a great fit for this role.
                                    </p>
                                    <textarea
                                        className="form-control cover-textarea"
                                        placeholder={`Hi, I'm excited to apply for the ${job.title} role because...`}
                                        rows={5}
                                        maxLength={800}
                                        value={coverNote}
                                        onChange={e => setCoverNote(e.target.value)}
                                    />
                                    <div className="char-count">{coverNote.length} / 800 characters</div>
                                </div>

                                {/* ── Divider ── */}
                                <div className="section-divider" />

                                {/* ── Confirmation Checkboxes ── */}
                                <div className="terms-section">
                                    <h6 className="pref-section-title" style={{ marginBottom: 16 }}>Confirm &amp; Submit</h6>

                                    <div className="confirm-checkboxes">
                                        {[
                                            { key: "work", label: "I am legally authorised to work in the job's country" },
                                            { key: "interview", label: "I am available for an interview within 7 business days" },
                                            { key: "skills", label: "The skills I've selected accurately reflect my current ability" },
                                        ].map(({ key, label }) => (
                                            <label key={key}
                                                className={`confirm-item ${confirmChecks[key] ? "confirm-item-checked" : ""}`}
                                                onClick={() => toggleConfirm(key)}>
                                                <div className={`custom-checkbox ${confirmChecks[key] ? "custom-checkbox-active" : ""}`}>
                                                    {confirmChecks[key] && <CheckIcon />}
                                                </div>
                                                <span className="confirm-text">{label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Main terms agreement */}
                                    <label className={`terms-agreement ${agreeTerms ? "terms-agreement-active" : ""}`}
                                        onClick={() => setAgreeTerms(!agreeTerms)}>
                                        <div className={`custom-checkbox cb-large ${agreeTerms ? "custom-checkbox-active" : ""}`}>
                                            {agreeTerms && <CheckIcon />}
                                        </div>
                                        <span>
                                            I confirm all information provided is accurate and agree to the{" "}
                                            <a href="#" className="terms-link" onClick={e => e.stopPropagation()}>Recruitment Terms</a>{" "}
                                            and{" "}
                                            <a href="#" className="terms-link" onClick={e => e.stopPropagation()}>Privacy Policy</a>.
                                            My data will only be used for hiring purposes.
                                        </span>
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* ── SUBMIT AREA ── */}
                        <div className="submit-area">

                            {/* Skill chips preview */}
                            {checkedCount > 0 && (
                                <div className="submit-skill-chips">
                                    <span className="ssc-heading">Your skills:</span>
                                    {Object.keys(checkedSkills).filter(k => checkedSkills[k]).slice(0, 7).map(s => (
                                        <span key={s} className="submit-skill-chip">{s}</span>
                                    ))}
                                    {checkedCount > 7 && (
                                        <span className="submit-skill-chip submit-skill-chip-more">+{checkedCount - 7} more</span>
                                    )}
                                </div>
                            )}

                            {/* Validation hint */}
                            {!canSubmit && activeStep >= 4 && (
                                <p className="submit-hint">
                                    {!requiredFieldsValid
                                        ? "Please fill your name, email, and phone number."
                                        : !agreeTerms
                                            ? "Please accept the terms and check all confirmation boxes to submit."
                                            : "Please check all three confirmation boxes above."}
                                </p>
                            )}
                            {submitError && (
                                <p className="submit-hint" style={{ color: "#dc2626" }}>
                                    {submitError}
                                </p>
                            )}

                            <p className="submit-legal">
                                By submitting you confirm all information is accurate and<br />
                                consent to data processing for hiring purposes only.
                            </p>

                            <button
                                className={`submit-btn ${!canSubmit ? "submit-btn-disabled" : ""}`}
                                onClick={canSubmit ? handleSubmit : undefined}
                                disabled={!canSubmit || submitLoading}
                            >
                                {submitLoading ? "Submitting..." : (canSubmit ? "Submit Application" : "Complete all fields to submit")}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplication;







