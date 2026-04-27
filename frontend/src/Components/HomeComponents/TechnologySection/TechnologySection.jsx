import React from "react";
import "./TechnologySection.css";
import { FaUsers, FaChartLine, FaCogs, FaRocket } from "react-icons/fa";

const steps = [
    {
        num: "01",
        icon: <FaUsers />,
        title: "Deep Consultation",
        desc: "We align with your vision through deep analysis, ensuring every solution connects to your core business goals.",
    },
    {
        num: "02",
        icon: <FaChartLine />,
        title: "Strategic Roadmap",
        desc: "Designing a structured architectural blueprint targeting efficiency and long-term scalability.",
    },
    {
        num: "03",
        icon: <FaCogs />,
        title: "Agile Development",
        desc: "Building robust systems with interconnected modules ensuring speed, security, and precision code.",
    },
    {
        num: "04",
        icon: <FaRocket />,
        title: "Launch & Scale",
        desc: "Seamless deployment with continuous monitoring, propelling your business toward its targets.",
    },
];

function TechnologySection() {
    return (
        <section className="tech-section">
            <div className="container">

                <div className="tech-header">
                    <div className="tech-eyebrow">
                        <span className="abt-badge-dot"></span>
                        Our Process</div>
                    <h1>
                        Connecting Technology to{" "}
                        <span>Business Goals</span>
                    </h1>
                    <p className="tech-desc">
                        Our structured approach ensures precise execution. We don't just write code —
                        we engineer solutions that hit your target.
                    </p>
                </div>

                <div className="row g-3">
                    {steps.map((s) => (
                        <div key={s.num} className="col-lg-3 col-md-6">
                            <div className="hm-tech-card">
                                <div className="d-flex justify-content-between">
                                    <span className="step-numbers">{s.num}</span>
                                    <div className="icon-box">{s.icon}</div>
                                </div>
                                <h5>{s.title}</h5>
                                <p className="tech-desc">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5 pt-3">
                    <button className="journey-btn">Start Your Journey →</button>
                </div>

            </div>
        </section>
    );
}

export default TechnologySection;