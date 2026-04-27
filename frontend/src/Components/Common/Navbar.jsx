import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";
import Logo from "../../assets/Logo/Dott-ciblez-2.png"; // adjust path as needed

export default function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const dropdownRef = useRef(null);

    // Helper to check active route
    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close services dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setServicesOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setServicesOpen(false);
                setMenuOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const closeAll = () => {
        setMenuOpen(false);
        setServicesOpen(false);
    };

    const toggleServices = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setServicesOpen((prev) => !prev);
    };

    const services = [
        { href: "/services/web-development", icon: "bi-code-slash", label: "Web Development" },
        { href: "/services/software-design", icon: "bi-pencil", label: "Software Design" },
        { href: "/services/app-devlopment", icon: "bi-share", label: "Social Media App Development" },
        { href: "/services/social-media-marketing", icon: "bi-graph-up", label: "Social Media Marketing" },
        { href: "/services/datacenter-colocation", icon: "bi-server", label: "Datacenter Colocation" },
        { href: "/computer-systems", icon: "bi-pc", label: "Computer Systems" },
        { href: "/services/cloud-service", icon: "bi-cloud", label: "Cloud Services" },
        { href: "/services/cyber-security-audit", icon: "bi-shield-check", label: "Cyber Audit" },
        { href: "/services/software-education", icon: "bi-book", label: "Education Software" },
        { href: "/services/it-infrastructure", icon: "bi-diagram-3", label: "IT Infrastructure" },
        { href: "/services/it-network-service", icon: "bi-diagram-3", label: "IT Network Service" },
        { href: "/blog", icon: "bi-file-text", label: "Blog" },
        { href: "/services/business-consultancy-services", icon: "bi-briefcase", label: "Business Consultancy" },
    ];

    return (
        <nav
            className={`dc-navbar navbar navbar-expand-lg p-0${scrolled ? " navbar-scrolled" : ""}`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="nav-container">

                {/* Logo */}
                <a href="/" className="navbar-brand d-flex align-items-center" onClick={closeAll}>
                    <img src={Logo} alt="Dott Ciblez Technologies" className="navbar-logo" />
                </a>

                {/* Hamburger (mobile only) */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                    aria-expanded={menuOpen}
                    aria-controls="mainNavCollapse"
                >
                    <i className={`bi ${menuOpen ? "bi-x" : "bi-list"} toggle-icon`} aria-hidden="true" />
                </button>

                {/* Nav Menu */}
                <div id="mainNavCollapse" className={`navbar-collapse${menuOpen ? " show" : ""}`}>
                    <ul className="dc-nav-links navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item">
                            <a href="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={closeAll}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/about-us" className={`nav-link ${isActive("/about-us") ? "active" : ""}`} onClick={closeAll}>About Us</a>
                        </li>
                        <li className="nav-item">
                            <a href="/meet-team" className={`nav-link ${isActive("/meet-team") ? "active" : ""}`} onClick={closeAll}>Our Team</a>
                        </li>

                        {/* Services Mega Dropdown */}
                        <li
                            className={`nav-item dropdown${servicesOpen ? " show" : ""}`}
                            ref={dropdownRef}
                        >
                            <a
                                href="#services"
                                className="nav-link dropdown-toggle"
                                onClick={toggleServices}
                                aria-expanded={servicesOpen}
                                aria-haspopup="true"
                                role="button"
                            >
                                Services
                            </a>

                            <div className="dropdown-menu dropdown-mega-menu" role="menu">
                                <div className="container-fluid p-0">
                                    <div className="row row-cols-2 g-1">
                                        {services.map(({ href, icon, label }) => (
                                            <div className="col" key={href}>
                                                <a
                                                    className={`dropdown-item ${isActive(href) ? "active" : ""}`}
                                                    href={href}
                                                    role="menuitem"
                                                    onClick={closeAll}
                                                >
                                                    <i className={`bi ${icon}`} aria-hidden="true" />
                                                    {label}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a href="/achievements" className={`nav-link ${isActive("/achievements") ? "active" : ""}`} onClick={closeAll}>Achievement</a>
                        </li>
                        <li className="nav-item">
                            <a href="/career" className={`nav-link ${isActive("/career") ? "active" : ""}`} onClick={closeAll}>Career</a>
                        </li>
                        <li className="nav-item">
                            <a href="/contact" className={`nav-link btn-contact ms-lg-3 ${isActive("/contact") ? "active" : ""}`} onClick={closeAll}>
                                Contact Us
                            </a>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
}