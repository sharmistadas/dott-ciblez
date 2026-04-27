import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBlog,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCalendarCheck,
  FaChartLine,
  FaCheckCircle,
  FaCloud,
  FaCode,
  FaCog,
  FaDatabase,
  FaDesktop,
  FaEnvelope,
  FaGraduationCap,
  FaHandPointRight,
  FaLock,
  FaMobileAlt,
  FaNetworkWired,
  FaPencilRuler,
  FaPhoneAlt,
  FaRedoAlt,
  FaShieldAlt,
  FaUser,
  FaWifi,
  FaClock,
} from "react-icons/fa";
import "../CSS/ServiceBooking.css";

const serviceRegistry = {
  "Web Development": {
    icon: <FaCode />,
    route: "/services/web-development",
    eyebrow: "Premium Service",
    title: "Website Development Company in",
    accent: "Bhubaneswar",
    subtitle: "Scalable websites, portals, and commerce platforms built for growth.",
    description:
      "Choose Web Development to preview the same service direction inside booking while keeping the form flow focused and fast.",
    points: ["Custom websites", "E-commerce builds", "24/7 support"],
  },
  "Software Design": {
    icon: <FaPencilRuler />,
    route: "/services/software-design",
    eyebrow: "Elevate Your Product",
    title: "Software",
    accent: "Design",
    subtitle: "Crafting intuitive interfaces that users love.",
    description:
      "Preview the Software Design hero while booking and keep the rest of the page dedicated to your consultation details.",
    points: ["UI/UX design", "Wireframes", "Interactive prototypes"],
  },
  "Social Media Apps": {
    icon: <FaMobileAlt />,
    route: "/services/app-devlopment",
    eyebrow: "Premium Service",
    title: "App",
    accent: "Development",
    subtitle: "Mobile-first products designed for engagement and performance.",
    description:
      "Use this option to book app planning, MVP design, and deployment strategy with the product team.",
    points: ["Android & iOS", "MVP builds", "Launch strategy"],
  },
  "Social Media Marketing": {
    icon: <FaChartLine />,
    route: "/services/social-media-marketing",
    eyebrow: "Premium Service",
    title: "Social Media",
    accent: "Marketing",
    subtitle: "Campaigns, content, and growth systems for modern brands.",
    description:
      "Select this service to shift the banner toward marketing-led outcomes while the booking flow stays the same.",
    points: ["Content strategy", "Paid campaigns", "Performance tracking"],
  },
  "Datacenter Colocation": {
    icon: <FaDatabase />,
    route: "/services/datacenter-colocation",
    eyebrow: "Premium Colocation Service",
    title: "Datacenter",
    accent: "Colocation",
    subtitle: "Enterprise-grade infrastructure for mission-critical workloads.",
    description:
      "This banner reflects the colocation offering with a more infrastructure-focused positioning.",
    points: ["Certified facilities", "Global reach", "High reliability"],
  },
  "Computer Systems": {
    icon: <FaDesktop />,
    route: "/computer-systems",
    eyebrow: "Premium Service",
    title: "Computer Systems &",
    accent: "Communication Equipment",
    subtitle: "Enterprise hardware solutions and communication infrastructure.",
    description:
      "Book consultations for device rollouts, communication equipment, and enterprise system planning.",
    points: ["Workstations", "Servers", "Communication systems"],
  },
  "Cloud Services": {
    icon: <FaCloud />,
    route: "/services/cloud-service",
    eyebrow: "Enterprise Cloud",
    title: "Cloud Service & Data Center",
    accent: "Providers",
    subtitle: "Secure cloud infrastructure and managed services at scale.",
    description:
      "Selecting Cloud Services updates the hero to the same cloud-first positioning used on the service page.",
    points: ["Cloud migration", "Hybrid cloud", "Managed operations"],
  },
  "Cyber Audit": {
    icon: <FaShieldAlt />,
    route: "/services/cyber-security-audit",
    eyebrow: "Premium Service",
    title: "Cyber Audit",
    accent: "Services",
    subtitle: "Protect your digital assets with expert security reviews.",
    description:
      "The service booking page now uses Cyber Audit service wording instead of the incorrect Cyber Audit Server title.",
    points: ["Threat reviews", "Risk analysis", "Compliance checks"],
  },
  "Education Software": {
    icon: <FaGraduationCap />,
    route: "/services/software-education",
    eyebrow: "Premium Service",
    title: "Next Education",
    accent: "Software",
    subtitle: "Innovative e-learning platforms for modern education.",
    description:
      "Use this selection to book education-focused product discussions for schools, universities, and training teams.",
    points: ["LMS platforms", "Virtual classrooms", "Learning analytics"],
  },
  "IT Infrastructure": {
    icon: <FaNetworkWired />,
    route: "/services/it-infrastructure",
    eyebrow: "Premium Service",
    title: "IT Infrastructure",
    accent: "Services",
    subtitle: "Enterprise IT infrastructure management and support.",
    description:
      "This service switches the hero to an infrastructure-first message while leaving the booking experience unchanged below.",
    points: ["Infrastructure planning", "Cloud transition", "Monitoring"],
  },
  "IT Network Service": {
    icon: <FaWifi />,
    route: "/services/it-network-service",
    eyebrow: "Premium Service",
    title: "Information Technology and",
    accent: "Network Services",
    subtitle: "Expert guidance to improve technology strategy and digital transformation.",
    description:
      "Select this to preview the IT Network hero direction from the service page directly inside booking.",
    points: ["Network design", "Maintenance", "Security management"],
  },
  "Business Consultancy": {
    icon: <FaBriefcase />,
    route: "/services/business-consultancy-services",
    eyebrow: "Premium Service",
    title: "Business Consultancy",
    accent: "Services",
    subtitle: "Expert strategy, operational excellence, and data-driven insight.",
    description:
      "Choose this to align the hero with the consultancy page while the booking form remains ready for scheduling.",
    points: ["Strategy planning", "Operational audits", "Growth consulting"],
  },
};

const premiumServices = Object.entries(serviceRegistry).map(([name, data]) => ({
  name,
  icon: data.icon,
}));

const defaultService = "Web Development";

const ServiceBooking = () => {
  const [selectedService, setSelectedService] = useState(defaultService);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    bookingDate: "",
    bookingTime: "10:00",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, bookingDate: today }));
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
  };

  const handleBooking = (e) => {
    e.preventDefault();

    const { fullName, email, bookingDate, bookingTime } = formData;

    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      alert("Valid email is required.");
      return;
    }

    const message = `Thank you, ${fullName}! Your <strong>${selectedService}</strong> booking (${bookingDate} at ${bookingTime}) is received. Our team will contact you at ${email}.`;
    setConfirmationMessage(message);
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const handleReset = () => {
    const today = new Date().toISOString().split("T")[0];

    setFormData({
      fullName: "",
      email: "",
      company: "",
      phone: "",
      bookingDate: today,
      bookingTime: "10:00",
    });
    setSelectedService(defaultService);
    setShowConfirmation(false);
  };

  const currentBanner = serviceRegistry[selectedService] || serviceRegistry[defaultService];

  return (
    <div className="service-booking-page">
      <div className="service-booking-container">
        <section className="service-banner">
          <div className="service-banner-grid">
            <div className="banner-copy">
              <div className="premium-tag">{currentBanner.eyebrow}</div>
              <h1>
                {currentBanner.title} <span>{currentBanner.accent}</span>
              </h1>
              <p className="banner-subtitle">{currentBanner.subtitle}</p>
              <p className="description">{currentBanner.description}</p>

              <div className="banner-buttons">
                <a href="#booking-form" className="banner-btn primary">
                  Book This Service <FaArrowRight />
                </a>
                <Link to={currentBanner.route} className="banner-btn secondary">
                  View Service Page
                </Link>
              </div>
            </div>

            <div className="banner-preview">
              <div className="banner-preview-card">
                <div className="banner-preview-top">
                  <div className="preview-icon">{currentBanner.icon}</div>
                  <div className="preview-label">Selected Service</div>
                </div>

                <h3>{selectedService}</h3>
                <div className="preview-points">
                  {currentBanner.points.map((point) => (
                    <div className="preview-point" key={point}>
                      <FaCheckCircle />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="main-layout">
          <div className="left-panel">
            <div className="premium-badge">PREMIUM SERVICES</div>
            <ul className="service-list">
              {premiumServices.map((service) => (
                <li
                  key={service.name}
                  className={selectedService === service.name ? "active-service" : ""}
                  onClick={() => handleServiceClick(service.name)}
                >
                  {service.icon}
                  <span>{service.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="booking-panel" id="booking-form">
            <h2>
              <FaCalendarCheck /> Service Booking
            </h2>
            <div className="greeting">
              <FaHandPointRight />
              Select a service and the banner updates automatically to match that service while the booking form stays ready below.
            </div>

            <form className="booking-card" onSubmit={handleBooking}>
              <label htmlFor="serviceChoose">
                <FaCog /> 1. Select your service
              </label>

              <select
                id="serviceChoose"
                className="service-select"
                value={selectedService}
                onChange={handleServiceChange}
              >
                {premiumServices.map((service) => (
                  <option key={service.name} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>

              <div className="selected-preview">
                <span>
                  <FaCheckCircle />
                  Currently selected:
                </span>
                <span className="selected-value">{selectedService}</span>
              </div>

              <div className="customer-details">
                <div className="input-group">
                  <label htmlFor="fullName">
                    <FaUser /> Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="e.g. James Wilson"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="company">
                    <FaBuilding /> Company / Org
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="(optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="phone">
                    <FaPhoneAlt /> Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+1 555 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="date-time-row">
                <div className="input-group">
                  <label htmlFor="bookingDate">
                    <FaCalendarAlt /> Preferred date
                  </label>
                  <input
                    type="date"
                    id="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="bookingTime">
                    <FaClock /> Preferred time
                  </label>
                  <input
                    type="time"
                    id="bookingTime"
                    value={formData.bookingTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-primary" type="submit">
                  <FaCalendarCheck /> Book Consultation
                </button>
                <button className="btn-outline" type="button" onClick={handleReset}>
                  <FaRedoAlt /> Reset Form
                </button>
              </div>

              <div className={`confirm-message ${showConfirmation ? "show" : ""}`}>
                <FaCheckCircle size={24} />
                <span dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
              </div>

              <div className="footnote">
                <FaLock />
                Your data is encrypted and we will confirm your booking within 2 hours.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;
