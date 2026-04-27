// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Career from "./Pages/Career";
import AppDevlopment from "./Pages/AppDevelopment";
import BusinessConsultancyServices from "./Pages/BusinessConsultancyServices";
import DatacenterColocation from "./Pages/DatacenterColocation";
import SoftwareDesign from "./Pages/SoftwareDesign";
import Education from "./Pages/Education";
import ITNetworkServices from "./Pages/ITNetworkServices";
import SocialMediaMarketing from "./Pages/SocialMediaMarketing";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import JobApplication from "./Pages/JobApplication";
import CyberAuditPage from "./Pages/CyberAuditPage";
import ITInfrastructurePage from "./Pages/ITInfrastructurePage";
import ComputerSystemsPage from "./Pages/ComputerSystemsPage";
import WebDevelopment from "./Pages/WebDevelopment";
import CloudServices from "./Pages/CloudServices";
import Achievements from "./Pages/Achievements";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import MeetTheTeam from "./Pages/MeetTheTeam";
import AboutUS from "./Pages/AboutUs";
import TechStack from "./Pages/TechStack";
import "./App.css"; // global styles (optional)
import ServiceBooking from "./Pages/ServiceBooking";

function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };
    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="main-content" style={{ paddingTop: navbarHeight }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/glob1" element={<About />} />
          <Route path="/about-us" element={<AboutUS />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/software-design" element={<SoftwareDesign />} />
          <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
          <Route path="/services/datacenter-colocation" element={<DatacenterColocation />} />
          <Route path="/services/app-devlopment" element={<AppDevlopment />} />
          <Route path="/services/cloud-service" element={<CloudServices />} />
          <Route path="/services/cyber-security-audit" element={<CyberAuditPage />} />
          <Route path="/services/it-infrastructure" element={<ITInfrastructurePage />} />
          <Route path="/services/software-education" element={<Education />} />
          <Route path="/services/business-consultancy-services" element={<BusinessConsultancyServices />} />
          <Route path="/services/it-network-service" element={<ITNetworkServices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/meet-team" element={<MeetTheTeam />} />
          <Route path="/career" element={<Career />} />
          <Route path="/job-application" element={<JobApplication />} />
          <Route path="/computer-systems" element={<ComputerSystemsPage />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-condition" element={<PrivacyPolicy />} />
          <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/service-booking" element={<ServiceBooking />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;