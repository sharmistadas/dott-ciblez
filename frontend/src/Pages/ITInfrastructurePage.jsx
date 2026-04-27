import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/ITInfrastructurePage.css";

import bgImg from "../assets/banner/it-infrastructure.jpeg";
import laptopImg from "../assets/images/laptop.png";

import icoMail from "../assets/images/mail.png";
import icoMobile from "../assets/images/mobile.png";
import icoLock from "../assets/images/lock.png";
import icoLocation from "../assets/images/location.png";
import icoWifi from "../assets/images/wifi.png";
import icoSetting from "../assets/images/setting.png";
import icoPrint from "../assets/images/print.png";
import icoShare from "../assets/images/share.png";
import icoCloud from "../assets/images/cloud.png";
import icoSwitch from "../assets/images/switch.png";
import icoMessage from "../assets/images/message.png";
import icoMonitor from "../assets/images/laptop.png";

import logoHP from "../assets/images/hp.png";
import logoVMware from "../assets/images/vm.png";
import logoAWS from "../assets/images/aws.png";
import logoAzure from "../assets/images/ms.png";
import logoCisco from "../assets/images/cisco.png";
import logoVeeam from "../assets/images/veeam.png";
import logoPaloalto from "../assets/images/palo.png";
import logoFortinet from "../assets/images/fort.png";
import logoTerraform from "../assets/images/terra.png";
import logoDellEMC from "../assets/images/dell.png";
import logoKubernetes from "../assets/images/kuber.png";
import logoNetApp from "../assets/images/net.png";

import storyImg1 from "../assets/images/Enterp.png";
import storyImg2 from "../assets/images/tech.png";
import storyImg3 from "../assets/images/health.png";

/* ─── Data ──────────────────────────────────── */
const GREY_ICONS = [
    { img: icoMobile, label: "mobile", pos: "icon-pos-2" },
    { img: icoMonitor, label: "monitor", pos: "icon-pos-4" },
    { img: icoWifi, label: "wifi", pos: "icon-pos-6" },
    { img: icoPrint, label: "print", pos: "icon-pos-8" },
    { img: icoCloud, label: "cloud", pos: "icon-pos-10" },
    { img: icoSwitch, label: "switch", pos: "icon-pos-11" },
];
const BLUE_ICONS = [
    { img: icoMail, label: "mail", pos: "icon-pos-1" },
    { img: icoLock, label: "lock", pos: "icon-pos-3" },
    { img: icoLocation, label: "location", pos: "icon-pos-5" },
    { img: icoSetting, label: "setting", pos: "icon-pos-7" },
    { img: icoShare, label: "share", pos: "icon-pos-9" },
    { img: icoMessage, label: "message", pos: "icon-pos-12" },
];

const IconUsers = () => (
    <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconAward = () => (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></svg>
);
const IconTrend = () => (
    <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
);
const IconCheck = () => (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
);

const STATS = [
    { Icon: IconUsers, value: "500+", label: "Clients Served" },
    { Icon: IconAward, value: "99.9%", label: "System Uptime" },
    { Icon: IconTrend, value: "60%", label: "Cost Reduction" },
    { Icon: IconCheck, value: "24/7", label: "Monitoring" },
];

const SvcNetwork = () => <svg viewBox="0 0 24 24" stroke="#233DFE" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M12 8v3M9.5 17.5L12 11M14.5 17.5L12 11" /></svg>;
const SvcServer = () => <svg viewBox="0 0 24 24" stroke="#233DFE" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>;
const SvcCloud = () => <svg viewBox="0 0 24 24" stroke="#233DFE" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>;
const SvcShield = () => <svg viewBox="0 0 24 24" stroke="#233DFE" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const SvcDb = () => <svg viewBox="0 0 24 24" stroke="#233DFE" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
const SvcMonitor = () => <svg viewBox="0 0 24 24" stroke="#233DFE" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
const MetricIcon = () => <svg viewBox="0 0 24 24" className="story-metric-icon"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;

const SERVICES = [
    { Icon: SvcNetwork, name: "Network Design & Implementation", desc: "Design and deploy enterprise-grade networks with LAN, WAN, VPN, SD-WAN, and wireless infrastructure." },
    { Icon: SvcServer, name: "Server Management", desc: "Comprehensive server administration including deployment, configuration, monitoring, and maintenance." },
    { Icon: SvcCloud, name: "Cloud Infrastructure", desc: "Cloud migration, hybrid cloud setup, multi-cloud management, and cloud-native architecture design." },
    { Icon: SvcShield, name: "Security Infrastructure", desc: "Firewall management, intrusion detection, VPN setup, endpoint protection, and security audits." },
    { Icon: SvcDb, name: "Storage Solutions", desc: "Enterprise storage architecture, backup systems, disaster recovery, and data replication strategies." },
    { Icon: SvcMonitor, name: "Infrastructure Monitoring", desc: "Proactive monitoring, performance optimization, capacity planning, and incident management." },
];

const STEPS = [
    { num: "01", title: "Assessment & Planning", desc: "Evaluate existing infrastructure, identify gaps, and develop a comprehensive roadmap for improvements." },
    { num: "02", title: "Design & Architecture", desc: "Create scalable infrastructure designs with redundancy, security, and performance optimisation." },
    { num: "03", title: "Implementation & Migration", desc: "Deploy new systems, migrate workloads, configure services, and ensure minimal downtime." },
    { num: "04", title: "Support & Optimization", desc: "Ongoing monitoring, maintenance, performance tuning, and continuous improvement initiatives." },
];

const PARTNERS = [
    { name: "HP", img: logoHP },
    { name: "VMware", img: logoVMware },
    { name: "AWS", img: logoAWS },
    { name: "Azure", img: logoAzure },
    { name: "Cisco", img: logoCisco },
    { name: "Veeam", img: logoVeeam },
    { name: "Palo Alto", img: logoPaloalto },
    { name: "Fortinet", img: logoFortinet },
    { name: "Terraform", img: logoTerraform },
    { name: "Dell EMC", img: logoDellEMC },
    { name: "Kubernetes", img: logoKubernetes },
    { name: "NetApp", img: logoNetApp },
];

const STORIES = [
    { tag: "Finance", name: "Enterprise Corp", img: storyImg1, metric: "99.99% uptime achieved" },
    { tag: "Technology", name: "TechScale Inc", img: storyImg2, metric: "50% infrastructure cost saved" },
    { tag: "Healthcare", name: "HealthCare Plus", img: storyImg3, metric: "HIPAA compliant infrastructure" },
];

/* ─── Component ─────────────────────────────── */
export default function ITInfrastructurePage() {
    return (
        <div className="it-page">

            {/* ══════════ HERO ══════════ */}
            <section className="hero">
                <div className="hero-bg-img" style={{ backgroundImage: `url(${bgImg})` }} />
                <div className="hero-overlay" />

                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row align-items-center g-5">

                        {/* Left text */}
                        <div className="col-lg-6">
                            <div className="hero-badge mb-4">Premium Service</div>
                            <h1 className="hero-title mb-2">
                                IT Infrastructure
                                <span className="hero-title-blue">Services</span>
                            </h1>
                            <p className="hero-subtitle">Enterprise IT Infrastructure Management &amp; Support</p>
                            <p className="hero-desc">
                                Build, manage, and optimise your IT infrastructure with expert support.
                                From network design to cloud migration, we deliver scalable, secure,
                                and efficient technology solutions.
                            </p>
                            <a href="#contact" className="hero-btn">Get Started</a>
                        </div>

                        {/* Right — orbit visual */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            <div className="hero-visual-wrap">
                                <div className="ring-deco ring-deco-1" />
                                <div className="ring-deco ring-deco-2" />
                                <div className="laptop-glow" />

                                <div className="laptop-center">
                                    <img src={laptopImg} alt="laptop" />
                                </div>

                                {/* Grey inner orbit */}
                                <div className="orbit-track orbit-track-grey">
                                    {GREY_ICONS.map(({ img, label, pos }) => (
                                        <div key={label} className={`icon-node icon-grey ${pos}`}>
                                            <img src={img} alt={label} />
                                        </div>
                                    ))}
                                </div>

                                {/* Blue outer orbit */}
                                <div className="orbit-track orbit-track-blue">
                                    {BLUE_ICONS.map(({ img, label, pos }) => (
                                        <div key={label} className={`icon-node icon-blue ${pos}`}>
                                            <img src={img} alt={label} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════ STATS ══════════ */}
            <section className="stats-section">
                <div className="container-fluid px-0">
                    <div className="stats-grid ">
                        {STATS.map(({ Icon, value, label }, i) => (
                            <div className="stat-card" key={i}>
                                <div className="stat-icon"><Icon /></div>
                                <div className="stat-value">{value}</div>
                                <div className="stat-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ SERVICES ══════════ */}
            <section className="services-section" id="services">
                <div className="container">
                    <div className="it-section-header">
                        <div className="it-eyebrow"><span className="it-eyebrow-dot" />What We Offer</div>
                        <h2 className="section-title">Infrastructure Services</h2>
                        <p className="section-subtitle">Complete IT Infrastructure solution for your business</p>
                        <div className="it-underline" />
                    </div>
                    <div className="row g-4">
                        {SERVICES.map(({ Icon, name, desc }, i) => (
                            <div className="col-12 col-md-6 col-lg-4" key={i}>
                                <div className="service-card">
                                    <div className="service-icon-wrap"><Icon /></div>
                                    <h3 className="service-name">{name}</h3>
                                    <p className="service-desc">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ PROCESS ══════════ */}
            <section className="process-section" id="process">
                <div className="container">
                    <div className="it-section-header">
                        <div className="it-eyebrow"><span className="it-eyebrow-dot" />How We Work</div>
                        <h2 className="section-title">Our Implementation Process</h2>
                        <p className="section-subtitle">Our structured path to digital transformation.</p>
                        <div className="it-underline" />
                    </div>

                    <div className="position-relative">
                        {/* Desktop connecting line */}
                        <div
                            className="d-none d-md-block"
                            style={{
                                position: 'absolute', top: 40,
                                left: 'calc(12.5%)', right: 'calc(12.5%)',
                                height: 2, background: 'rgba(35,61,254,.15)', zIndex: 0,
                            }}
                        />
                        <div className="row g-4 g-md-0">
                            {STEPS.map((step, i) => (
                                <div className="col-12 col-md-3" key={i}>
                                    <div className="process-step">
                                        <div className="step-number">{step.num}</div>
                                        <h3 className="step-title">{step.title}</h3>
                                        <p className="step-desc">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ PARTNERS ══════════ */}
            <section className="it-partners-section" id="partners">
                <div className="container">
                    <div className="row align-items-end mb-5 g-4">
                        <div className="col-lg-6">
                            <div className="it-eyebrow mb-3"><span className="it-eyebrow-dot" />Ecosystem</div>
                            <h2 className="partners-title">Technology Partners</h2>
                            <p className="partners-subtitle">
                                A curated selection of our cloud technology stack designed for
                                enterprise-grade scalability and performance.
                            </p>
                        </div>
                    </div>
                    <div className="row g-3">
                        {PARTNERS.map((p, i) => (
                            <div className="col-6 col-sm-4 col-md-3" key={i}>
                                <div className="partner-card">
                                    {p.img
                                        ? <img src={p.img} alt={p.name} />
                                        : <span className="partner-fallback">{p.name}</span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ SUCCESS STORIES ══════════ */}
            <section className="it-stories-section" id="stories">
                <div className="container">
                    <div className="it-section-header">
                        <div className="it-eyebrow"><span className="it-eyebrow-dot" />Case Studies</div>
                        <h2 className="section-title">Our Success Stories</h2>
                        <div className="it-underline" />
                    </div>
                    <div className="row g-4">
                        {STORIES.map((s, i) => (
                            <div className="col-12 col-md-6 col-lg-4" key={i}>
                                <div className="story-card">
                                    <div className="story-img-wrap">
                                        <img src={s.img} alt={s.name} className="story-img" />
                                    </div>
                                    <div className="story-body">
                                        <span className="story-tag">{s.tag}</span>
                                        <h3 className="story-name">{s.name}</h3>
                                        <p className="story-metric">
                                            <MetricIcon /> {s.metric}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA ══════════ */}
            <section className="cta-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9 col-xl-8">
                            <div className="cta-box">
                                <div className="cta-content">
                                    <h2 className="cta-title">Ready To Optimise Your IT Infrastructure?</h2>
                                    <p className="cta-desc">
                                        Let's build a scalable, secure IT infrastructure that supports your
                                        business growth and digital transformation.
                                    </p>
                                    <a href="#contact" className="cta-btn">Schedule Consultation</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}