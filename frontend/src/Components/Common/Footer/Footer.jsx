// Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaLinkedinIn,
    FaTwitter,
    FaFacebookF,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaArrowRight,
} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {

    const services = [
        { name: "Web Development", path: "/services/web-development" },
        { name: "Software Design", path: "/services/software-design" },
        { name: "Mobile App Dev", path: "/services/mobile-app-dev" },
        { name: "Digital Marketing", path: "/services/social-media-marketing" },
        { name: "Datacenter Colocation", path: "/services/datacenter-colocation" },
        { name: "Hardware Solutions", path: "/services/app-devlopment" },
        { name: "Cloud Infrastructure", path: "/services/cloud-service" },
        { name: "Cyber Security Audit", path: "/services/cyber-security-audit" },
        { name: "IT Infrastructure", path: "/services/it-infrastructure" },
        { name: "EdTech Solutions", path: "/services/edtech-solutions" },
    ];

    const quickLinks = [
        { name: "About Us", path: "/about" },
        { name: "Our Team", path: "/team" },
        { name: "Achievements", path: "/achievements" },
        { name: "Career", path: "/career" },
        { name: "Contact Us", path: "/contact" },
        { name: "Blog", path: "/blog" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Term And Condition", path: "/term-condition" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <footer className="dc-footer">
            <div className="container py-5">

                <motion.div
                    className="row gy-5"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    {/* Company Info */}
                    <motion.div className="col-lg-4 col-md-6" variants={itemVariants}>

                        <div className="footer-logo mb-4">
                            <h5>Dott Ciblez</h5>
                            <div className="logo-underline"></div>
                        </div>

                        <p className="footer-text">
                            Empowering enterprises with innovative technology solutions.
                            We bridge the gap between complex challenges and digital success
                            through our world-class expertise.
                        </p>

                        <motion.div whileHover={{ x: 5 }}>
                            <Link to="/about" className="learn-more-link">
                                Learn More About Us <FaArrowRight size={12} />
                            </Link>
                        </motion.div>

                    </motion.div>


                    {/* Services */}
                    <motion.div className="col-lg-3 col-md-6" variants={itemVariants}>

                        <h6 className="footer-title">Our Services</h6>
                        <div className="title-underline"></div>

                        <ul className="footer-links">

                            {services.slice(0, 8).map((service, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <Link to={service.path}>{service.name}</Link>
                                </motion.li>
                            ))}

                            <motion.li className="view-all" whileHover={{ x: 5 }}>
                                <Link to="/services">View All Services →</Link>
                            </motion.li>

                        </ul>

                    </motion.div>


                    {/* Quick Links */}
                    <motion.div className="col-lg-2 col-md-6" variants={itemVariants}>

                        <h6 className="footer-title">Quick Links</h6>
                        <div className="title-underline"></div>

                        <ul className="footer-links">

                            {quickLinks.map((link, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <Link to={link.path}>{link.name}</Link>
                                </motion.li>
                            ))}

                        </ul>

                    </motion.div>


                    {/* Contact */}
                    <motion.div className="col-lg-3 col-md-6" variants={itemVariants}>

                        <h6 className="footer-title">Contact Us</h6>
                        <div className="title-underline"></div>

                        <div className="contact-item">

                            <div className="contact-icon">
                                <FaMapMarkerAlt />
                            </div>

                            <div className="contact-text">
                                <span className="contact-label">Address</span>
                                <span>Business Bay, Dubai, UAE</span>
                            </div>

                        </div>

                        <div className="contact-item">

                            <div className="contact-icon">
                                <FaPhoneAlt />
                            </div>

                            <div className="contact-text">
                                <span className="contact-label">Phone</span>
                                <span>+971 4 123 4567</span>
                            </div>

                        </div>

                        <div className="contact-item">

                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>

                            <div className="contact-text">
                                <span className="contact-label">Email</span>
                                <span>info@dottciblez.com</span>
                            </div>

                        </div>

                    </motion.div>

                </motion.div>


                {/* Footer Bottom */}
                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >

                    <div className="row align-items-center">

                        <div className="col-md-6">
                            <p className="copyright">
                                © {new Date().getFullYear()} Dott Ciblez Technologies. All rights reserved.
                            </p>
                        </div>

                        <div className="col-md-6">

                            <div className="social-icons">

                                <motion.a
                                    href="https://linkedin.com"
                                    className="social-icon"
                                    whileHover={{ y: -3 }}
                                >
                                    <FaLinkedinIn />
                                </motion.a>

                                <motion.a
                                    href="https://twitter.com"
                                    className="social-icon"
                                    whileHover={{ y: -3 }}
                                >
                                    <FaTwitter />
                                </motion.a>

                                <motion.a
                                    href="https://facebook.com"
                                    className="social-icon"
                                    whileHover={{ y: -3 }}
                                >
                                    <FaFacebookF />
                                </motion.a>

                                <motion.a
                                    href="https://instagram.com"
                                    className="social-icon"
                                    whileHover={{ y: -3 }}
                                >
                                    <FaInstagram />
                                </motion.a>

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>
        </footer>
    );
}