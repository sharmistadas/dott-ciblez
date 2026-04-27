import React, { useEffect, useState, useRef } from "react";
import "./WhyChooseUs.css";
import { FaAward, FaHeadset, FaRocket, FaClock, FaShieldAlt, FaUsers } from "react-icons/fa";

const data = [
    { icon: "award", title: "Proven Excellence", desc: "Award-winning solutions recognized across the industry worldwide." },
    { icon: "headset", title: "24/7 Support", desc: "Round-the-clock dedicated assistance for smooth operations." },
    { icon: "rocket", title: "Fast Delivery", desc: "Rapid deployment pipelines powered by agile methodology." },
    { icon: "shield", title: "Secure Solutions", desc: "Enterprise-grade security protecting your digital assets." },
    { icon: "users", title: "Expert Team", desc: "Highly skilled professionals committed to delivering excellence." },
    { icon: "clock", title: "On-Time Execution", desc: "Consistent on-time completion with a structured workflow." },
];

const ICONS = {
    award: FaAward, headset: FaHeadset, rocket: FaRocket,
    shield: FaShieldAlt, users: FaUsers, clock: FaClock,
};

const VISIBLE = 3;
const TOTAL = data.length;
const MAX_IDX = TOTAL - VISIBLE;

function WhyChooseUs() {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const startAuto = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev >= MAX_IDX ? 0 : prev + 1));
        }, 3000);
    };

    useEffect(() => {
        if (isMobile) { clearInterval(intervalRef.current); return; }
        startAuto();
        return () => clearInterval(intervalRef.current);
    }, [isMobile]);

    const goTo = (i) => { setIndex(i); startAuto(); };
    const translateX = isMobile ? 0 : -(index * (100 / TOTAL));

    return (
        <section className="dtc-why-section">
            <div className="container">
                <div className="dtc-why-header">
                    <div className="dtc-why-eyebrow">
                        <span className="abt-badge-dot"></span>
                        Why Us</div>
                    <h2 className="dtc-why-title">Why Choose Us</h2>
                    <p className="dtc-why-subtitle">Excellence in every aspect of our service delivery, every single time.</p>
                </div>

                <div className="dtc-why-slider-wrapper">
                    <div className="dtc-why-slider" style={{ transform: `translateX(${translateX}%)` }}>
                        {data.map((item, i) => {
                            const Icon = ICONS[item.icon];
                            return (
                                <div className="dtc-why-card" key={i}>
                                    <div className="dtc-why-card-inner">
                                        <div className="dtc-why-icon"><Icon /></div>
                                        <h5>{item.title}</h5>
                                        <p className="why-desc">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="dtc-why-indicators">
                    {Array.from({ length: MAX_IDX + 1 }).map((_, i) => (
                        <span key={i} className={i === index ? "active" : ""} onClick={() => goTo(i)} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;