import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/Home.css";
import GlobBackground from "../Components/GlobBackground/GlobBackground";
import OurExpertise from "../Components/HomeComponents/OurExpertise/OurExpertise";
import Testimonials from "../Components/HomeComponents/Testimonials/Testimonials";
import Quote from "../Components/HomeComponents/Quote/Quote";
import ExpertTeam from "../Components/HomeComponents/ExpertTeam/ExpertTeam";
import WhyChooseUs from "../Components/HomeComponents/WhyChooseUs/WhyChooseUs";
import TechnologySection from "../Components/HomeComponents/TechnologySection/TechnologySection";
import GlobBackground2 from "../Components/GlobBackground/GlobBackground2";
import BgAnimation from "../Components/GlobBackground/Bganimation";
import EarthHero from "../Components/GlobBackground/Earthhero";
import Banner from "../Components/HomeComponents/HeroSection/Banner";
import VortexBackground from "../Components/GlobBackground/VortexBackground";
import SciFiTunnel from "../Components/GlobBackground/Scifitunnel/Scifitunnel";

const useReveal = () => {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const obs = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("visible");
                }),
            { threshold: 0.12 }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
};

const Counter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && !started.current) {
                    started.current = true;
                    let c = 0;
                    const step = target / 60;
                    const t = setInterval(() => {
                        c = Math.min(c + step, target);
                        setCount(Math.floor(c));
                        if (c >= target) clearInterval(t);
                    }, 24);
                    obs.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
    { icon: "bi-briefcase", num: 500, suffix: "+", label: "Projects Completed" },
    { icon: "bi-people", num: 250, suffix: "+", label: "Happy Clients" },
    { icon: "bi-trophy", num: 25, suffix: "+", label: "Awards Won" },
    { icon: "bi-calendar-check", num: 5, suffix: "+", label: "Years Experience" },
];

const services = [
    { icon: "bi-code-square", title: "Web Development", desc: "High-performance, scalable web applications built with modern frameworks." },
    { icon: "bi-phone", title: "Mobile App Dev", desc: "Native and cross-platform mobile apps for iOS and Android with intuitive UX." },
    { icon: "bi-palette", title: "UI/UX Design", desc: "Beautiful, user-centered designs that convert visitors into loyal customers." },
    { icon: "bi-cloud", title: "Cloud Solutions", desc: "Secure, scalable cloud infrastructure and DevOps pipelines tailored to your needs." },
    { icon: "bi-robot", title: "AI Integration", desc: "Smart AI-powered features and automations that supercharge your business workflows." },
    { icon: "bi-shield-lock", title: "Cyber Security", desc: "Enterprise-grade security audits, penetration testing, and compliance consulting." },
];

export default function Home() {
    const aboutRef = useRef(null);
    useReveal();

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && aboutRef.current)
                    aboutRef.current.classList.add("visible");
            },
            { threshold: 0.2 }
        );
        if (aboutRef.current) obs.observe(aboutRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <>
            {/* Fixed animated glob — sits behind everything */}

            <GlobBackground2 />
            {/* <BgAnimation /> */}
            {/* <EarthHero /> */}
            {/* <VortexBackground /> */}
            {/* <SciFiTunnel /> */}

            <Banner />
            
            {/* About Section */}
            <section className="dc-about py-5">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-5 reveal">
                            <div className="about-images position-relative">
                                <img className="img-main img-fluid rounded-4"
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
                                    alt="Team collaboration" />
                                <img className="img-secondary img-fluid rounded-4"
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80"
                                    alt="Meeting" />
                                <div className="years-badge">
                                    <div className="num">5</div>
                                    <div className="label">Years of<br />Excellence</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="section-badge">
                                <span className="section-badge-dot">
                                </span>
                                    About Us
                            </div>
                            <div ref={aboutRef} className="about-title reveal reveal-delay-1">
                                We don't just build software .{" "}
                                <span className="highlight">We engineer growth</span> .
                            </div>
                            <div className="reveal reveal-delay-2 mt-4">
                                <p className="about-body">
                                    When seeking the best software company in Dubai, the majority of us Google
                                    "software development company Dubai." Just Google{" "}
                                    <strong className="company-highlight">Dott Ciblez Technologies</strong> the next time.
                                </p>
                                <p className="about-body">
                                    As one of the premier mobile app developers in the UAE, we specialize in
                                    high-performance software, web, and mobile app development. We work relentlessly
                                    to provide best-in-class service to businesses of all sizes.
                                </p>
                                <div className="about-badges d-flex flex-wrap gap-2 mt-4">
                                    <div className="about-badge"><i className="bi bi-emoji-smile me-2"></i>User-Friendly Solutions</div>
                                    <div className="about-badge"><i className="bi bi-building me-2"></i>Enterprise Scalability</div>
                                    <div className="about-badge"><i className="bi bi-headset me-2"></i>24/7 Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Numbers Section */}
            <section className="dc-numbers py-5">
                <div className="container">
                    <div className="numbers-top text-center reveal">
                        <div className="section-badge">
                            <i className="bi bi-star-fill me-2"></i>Proven Excellence
                        </div>
                        <h2 className="about-title reveal reveal-delay-1">
                            Numbers that <span className="highlight">define Us</span>
                        </h2>
                        <p className="numbers-sub mx-auto">
                            Every digit represents a milestone in our journey of delivering
                            exceptional technology solutions to our global partners.
                        </p>
                    </div>
                    <div className="row g-3 mt-3">
                        {stats.map((s, i) => (
                            <div key={s.label} className={`col-6 col-lg-3 reveal reveal-delay-${i + 1}`}>
                                <div className="stat-card text-center p-4">
                                    <div className="stat-icon-wrap mx-auto mb-3">
                                        <i className={`bi ${s.icon} fs-3`}></i>
                                    </div>
                                    <div className="stat-num display-5 fw-bold">
                                        <Counter target={s.num} suffix={s.suffix} />
                                    </div>
                                    <div className="stat-label text-uppercase small fw-semibold mt-2">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="dtc-services py-5">
                <div className="container">
                    <div className="services-header text-center reveal">
                        <div className="section-badge">
                            <span className="section-badge-dot"></span>
                            What We Do
                        </div>
                        <h2 className="home-title reveal reveal-delay-1 text-white">
                            Our Core <span className="highlight">Services</span>
                        </h2>
                        <p className="mx-auto" style={{ maxWidth: "480px", color: "rgb(215, 214, 214)" }}>
                            End-to-end technology solutions crafted with precision for every industry.
                        </p>
                    </div>
                    <div className="row g-3 mt-3">
                        {services.map((s, i) => (
                            <div key={s.title} className={`col-md-6 col-lg-4 reveal reveal-delay-${(i % 4) + 1}`}>
                                <div className="service-card h-100 p-4">
                                    <div className="d-flex  align-items-center">
                                        <div className="svc-icon d-flex align-items-center justify-content-center mb-4">
                                            <i className={`bi ${s.icon} fs-3`}></i>
                                        </div>
                                        <h3 className="svc-title fw-bold mb-3 ms-3">{s.title}</h3>
                                     </div>
                                    <p className="svc-desc mb-0">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section><OurExpertise /></section>
            <section><Quote /></section>
            <section><Testimonials /></section>
            <section><ExpertTeam /></section>
            <section><WhyChooseUs /></section>
            <section><TechnologySection /></section>
        </>
    );
}