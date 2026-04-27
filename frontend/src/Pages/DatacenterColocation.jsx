import React from "react";
import { useEffect, useState } from "react";
import "../CSS/DatacenterColocation.css";
import heroBg from "../assets/banner/data-center.png";
import onboardBg from "../assets/img1.png"; // This is imported but not used
import {
    FaShieldAlt,
    FaBolt,
    FaNetworkWired,
    FaServer,
    FaSnowflake,
    FaHandsHelping,
    FaLock,
    FaRocket,
    FaChartLine,
    FaDatabase,
    FaFingerprint,
    FaCloud,
    FaHdd,
    FaBoxes,
    FaCertificate,
    FaGlobe,
    FaClipboardList,
    FaExchangeAlt,
    FaEye,
    FaCheckCircle
} from "react-icons/fa";
import CTA from "../Components/AppDevlopment/CTA";

const DatacenterColocation = () => {
    const [uptime, setUptime] = useState(0);
    const [storage, setStorage] = useState(0);

    useEffect(() => {
        let u = 0;
        let s = 0;

        const interval = setInterval(() => {
            if (u < 99.99) u += 1.0;
            if (s < 10) s += 1;

            setUptime(Number(u).toFixed(2));
            setStorage(s);

            if (u >= 99.99 && s >= 10) clearInterval(interval);
        }, 25);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dc-wrapper">

            {/* ================= HERO ================= */}
            <section
                className="dc-hero"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="dc-hero-content">
                    <h1>
                        Datacenter <br />
                        <span>Colocation</span>
                    </h1>

                    <p>
                        Enterprise-grade infrastructure for high-performance computing
                        and mission-critical applications. Global reach, certified security,
                        and unmatched reliability.
                    </p>

                    <div className="dc-hero-actions">
                        <div className="dc-badge">
                            ◉ PREMIUM COLOCATION SERVICE
                        </div>

                        <button className="dc-primary-btn">
                            Get Quote →
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= STATS ================= */}
            <section className="dc-stats">
                <div className="dc-stat-box">
                    <h3>{uptime}%</h3>
                    <span>Guaranteed Uptime</span>
                </div>

                <div className="dc-stat-box">
                    <h3>Tier III</h3>
                    <span>Facility Standard</span>
                </div>

                <div className="dc-stat-box">
                    <h3>{storage}PB+</h3>
                    <span>Storage Capacity</span>
                </div>

                <div className="dc-stat-box">
                    <h3>24/7</h3>
                    <span>Expert Support</span>
                </div>
            </section>

            {/* ================= WHY CHOOSE US ================= */}
            <section className="dc-why">
                <div className="dc-why-container">
                    <h2 className="dc-why-title">
                        Why leading enterprises choose us
                    </h2>

                    <div className="dc-why-underline"></div>

                    <div className="dc-why-grid">
                        <div className="dc-why-card">
                            <div className="dc-why-icon">
                                <FaShieldAlt />
                            </div>
                            <h4>Enterprise Security</h4>
                            <p>
                                Multi-layer biometric access control, 24/7/365 on-site armed security,
                                and full SOC2/ISO 27001 compliance for your hardware.
                            </p>
                        </div>

                        <div className="dc-why-card">
                            <div className="dc-why-icon">
                                <FaRocket />
                            </div>
                            <h4>Ultra-low Latency</h4>
                            <p>
                                Strategic carrier-neutral facilities with direct peering to major cloud
                                providers and global fiber backbones for sub-millisecond speeds.
                            </p>
                        </div>

                        <div className="dc-why-card">
                            <div className="dc-why-icon">
                                <FaChartLine />
                            </div>
                            <h4>Rapid Scalability</h4>
                            <p>
                                Modular infrastructure allows you to scale from a single 42U rack to a
                                private cage or custom suite in days, not months.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section className="dc-services">
                <div className="dc-services-container">
                    <h2 className="dc-services-title">
                        Datacenter Colocation Services
                    </h2>

                    <p className="dc-services-subtitle">
                        Enterprise-grade infrastructure designed for maximum reliability and global
                        scale. Deploy your hardware in our Tier III certified facilities.
                    </p>

                    <div className="dc-services-grid">
                        <div className="dc-service-card">
                            <div className="dc-service-icon">
                                <FaServer />
                            </div>
                            <h4>Rack Space & Cabinets</h4>
                            <p>
                                Secure server housing with flexible, high-density configurations
                                to suit any scale from single units to private suites.
                            </p>
                        </div>

                        <div className="dc-service-card">
                            <div className="dc-service-icon">
                                <FaBolt />
                            </div>
                            <h4>Redundant Power</h4>
                            <p>
                                Uninterrupted N+1 power supply with multi-stage UPS backup
                                and industrial diesel generators for 100% uptime.
                            </p>
                        </div>

                        <div className="dc-service-card">
                            <div className="dc-service-icon">
                                <FaNetworkWired />
                            </div>
                            <h4>High-Speed Connectivity</h4>
                            <p>
                                Low-latency carrier-neutral fiber connectivity with direct
                                cloud on-ramps to AWS, Azure, and Google Cloud.
                            </p>
                        </div>

                        <div className="dc-service-card">
                            <div className="dc-service-icon">
                                <FaFingerprint />
                            </div>
                            <h4>Physical Security</h4>
                            <p>
                                24/7 on-site guards, biometric access, multi-layer security
                                zones, and full HD CCTV surveillance with long-term retention.
                            </p>
                        </div>

                        <div className="dc-service-card">
                            <div className="dc-service-icon">
                                <FaSnowflake />
                            </div>
                            <h4>Advanced Cooling</h4>
                            <p>
                                Precision environmental control using hot/cold aisle containment
                                systems ensuring optimal hardware operating temperatures.
                            </p>
                        </div>

                        <div className="dc-service-card">
                            <div className="dc-service-icon">
                                <FaHandsHelping />
                            </div>
                            <h4>Remote Hands</h4>
                            <p>
                                Our 24/7 on-site expert technical support for hardware swaps,
                                troubleshooting, and physical environment management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ONBOARDING EVOLUTION - EXACT 2ND IMAGE DESIGN ================= */}
            <section className="dc-onboarding">

                <div className="dc-onboard-header">
                    <h2 className="dc-title">
                        ONBOARDING <span>EVOLUTION</span>
                    </h2>

                    <p className="dc-subtitle">
                        PROVISIONING ENTERPRISE GRADE INFRASTRUCTURE
                    </p>
                </div>


                <div className="dc-onboard-grid">

                    {/* LEFT SIDE */}
                    <div className="dc-onboard-left">

                        <div className="dc-card">
                            <div className="dc-icon"><FaClipboardList /></div>
                            <div>
                                <small>STEP 01</small>
                                <h5>Consultation</h5>
                                <p>Assess your infrastructure needs, power requirements, bandwidth, and compliance requirements.</p>
                            </div>
                        </div>

                        <div className="dc-card">
                            <div className="dc-icon"><FaBoxes /></div>
                            <div>
                                <small>STEP 02</small>
                                <h5>Allocation</h5>
                                <p>Reserve rack space, configure power distribution, and setup network connectivity.</p>
                            </div>
                        </div>

                    </div>


                    {/* CENTER IMAGE */}
                    <div className="dc-onboard-center">
                        <img src={onboardBg} alt="Data Center" />
                    </div>


                    {/* RIGHT SIDE */}
                    <div className="dc-onboard-right">

                        <div className="dc-card">
                            <div className="dc-icon"><FaExchangeAlt /></div>
                            <div>
                                <small>STEP 03</small>
                                <h5>Migration</h5>
                                <p>Coordinate equipment transport, installation, cable management, and system testing.</p>
                            </div>
                        </div>

                        <div className="dc-card">
                            <div className="dc-icon"><FaEye /></div>
                            <div>
                                <small>STEP 04</small>
                                <h5>Monitoring</h5>
                                <p>Continuous monitoring, proactive maintenance, and instant support for any issue.</p>
                            </div>
                        </div>

                    </div>

                </div>


                {/* BUTTON */}
                <div className="dc-onboard-btn">
                    <button className="dc-btn">
                        INITIALIZE DEPLOYMENT ⚡
                    </button>
                </div>


                {/* INDICATORS */}
                <div className="dc-indicators">
                    <span><FaShieldAlt /> TIER IV COMPLIANT</span>
                    <span><FaCheckCircle /> SOC2 TYPE II</span>
                    <span><FaGlobe /> GLOBAL NETWORK</span>
                </div>

                <div className="dc-system-info">
                    <p>SYSTEM_STATE: <span>READY</span></p>
                    <p>LATENCY_SYNC: <span>0.002MS</span></p>
                </div>

            </section>
            {/* ================= ENTERPRISE TECH ================= */}
            <section className="dc-enterprise">
                <div className="dc-enterprise-header">
                    <span className="dc-enterprise-badge">
                        INFRASTRUCTURE EXCELLENCE
                    </span>

                    <h2>
                        Enterprise-Grade <span>Technology</span>
                    </h2>
                </div>

                {/* 01 NETWORKING */}
                <div className="dc-enterprise-section">
                    <div className="dc-enterprise-title">
                        <span>01. NETWORKING</span>
                        <div className="dc-line"></div>
                    </div>

                    <div className="dc-enterprise-grid three">
                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaNetworkWired /></div>
                            <h4>Cisco Systems</h4>
                            <p>Enterprise-grade core switching and routing fabric ensuring seamless high-speed backbone connectivity.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaServer /></div>
                            <h4>Juniper Networks</h4>
                            <p>Carrier-class edge routing and security protocols for low-latency global traffic orchestration.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaCloud /></div>
                            <h4>F5 Networks</h4>
                            <p>Advanced application delivery controllers providing intelligent load balancing and SSL offloading.</p>
                        </div>
                    </div>
                </div>

                {/* 02 POWER & COOLING */}
                <div className="dc-enterprise-section">
                    <div className="dc-enterprise-title">
                        <span>02. POWER & COOLING</span>
                        <div className="dc-line"></div>
                    </div>

                    <div className="dc-enterprise-grid two">
                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaBolt /></div>
                            <h4>APC by Schneider</h4>
                            <p>Redundant N+1 UPS systems and modular power distribution units for uninterrupted operations.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaSnowflake /></div>
                            <h4>Liebert (Vertiv)</h4>
                            <p>Precision thermal management and cold-aisle containment systems for optimal hardware efficiency.</p>
                        </div>
                    </div>
                </div>

                {/* 03 COMPUTE & STORAGE */}
                <div className="dc-enterprise-section">
                    <div className="dc-enterprise-title">
                        <span>03. COMPUTE & STORAGE</span>
                        <div className="dc-line"></div>
                    </div>

                    <div className="dc-enterprise-grid three">
                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaDatabase /></div>
                            <h4>Dell EMC</h4>
                            <p>High-performance PowerEdge compute clusters engineered for virtualization and AI workloads.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaHdd /></div>
                            <h4>HP Enterprise</h4>
                            <p>ProLiant blade systems delivering high-density processing power and mission-critical reliability.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaServer /></div>
                            <h4>NetApp</h4>
                            <p>Unified flash storage arrays providing high-throughput and enterprise data management.</p>
                        </div>
                    </div>
                </div>

                {/* 04 SECURITY & MONITORING */}
                <div className="dc-enterprise-section">
                    <div className="dc-enterprise-title">
                        <span>04. SECURITY & MONITORING</span>
                        <div className="dc-line"></div>
                    </div>

                    <div className="dc-enterprise-grid four">
                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaShieldAlt /></div>
                            <h4>Palo Alto</h4>
                            <p>Next-gen firewalls with AI-driven threat prevention at the network perimeter.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaCloud /></div>
                            <h4>VMware</h4>
                            <p>Standardized virtualization layer for complete workload isolation and mobility.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaChartLine /></div>
                            <h4>Nagios</h4>
                            <p>Comprehensive infrastructure monitoring for real-time performance tracking.</p>
                        </div>

                        <div className="dc-enterprise-card">
                            <div className="dc-icon"><FaServer /></div>
                            <h4>Zabbix</h4>
                            <p>Distributed monitoring solution for granular network and server metrics.</p>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
        </div>
    );
};

export default DatacenterColocation;