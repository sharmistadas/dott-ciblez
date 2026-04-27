import { useEffect, useRef, useState } from "react";
import "../CSS/TechStack.css"; // adjust path to your css folder
import TechStackSection from "./TechStackSection";

const tickerItems = [
  "Angular", "React", "Node.js", "Python", "AWS", "Azure", "Docker", "Kubernetes",
  "MongoDB", "PostgreSQL", "Flutter", "TypeScript", "Java", "PHP", "DevOps", "Cloud"
];

export default function TechStack() {
  return (
    <div className="banner-root">
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="stripe-overlay" />

      {/* HERO */}
      <div className="tech-hero">
        <div className="hero-left">
          <div className="eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Empowering Digital Solutions</span>
          </div>

          <h1 className="hero-title">
            <span className="line">DYNAMIC</span>
            <span className="line"></span>
            <span className="line outline">TECH STACK</span>
          </h1>

          <p className="hero-desc">
            Cutting-edge technologies powering scalable, high-performance solutions
            from front-end interfaces to back-end architectures.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">Explore Stack</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>

        {/* VISUAL */}
        <div className="tech-hero-right">
          <div className="visual-ring">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
            <div className="ring-center">
              <div className="ring-center-text">TECH<br />STACK</div>
            </div>
          </div>

          <div className="float-tag tag-1">Frontend</div>
          <div className="float-tag tag-2">Backend</div>
          <div className="float-tag tag-3">Cloud</div>
          <div className="float-tag tag-4">DevOps</div>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-label">Tech Stack</div>
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span className="ticker-item" key={i}>
              <span className="ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section>
        <TechStackSection />
      </section>
    </div>
  );
}