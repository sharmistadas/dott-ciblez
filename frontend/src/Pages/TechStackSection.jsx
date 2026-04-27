import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .ts-root {
    background: #0b397e;
    min-height: 100vh;
    padding: 60px 80px 80px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .ts-heading { font-size: 36px; font-weight: 800; color: #111; margin-bottom: 8px; }
  .ts-sub { font-size: 14px; color: #666; font-weight: 400; margin-bottom: 36px; }

  /* Tabs */
  .ts-tabs {
    display: flex;
    gap: 0;
    border-bottom: 2px solid #dde0e6;
    margin-bottom: 40px;
  }
  .ts-tab {
    background: none;
    border: none;
    padding: 10px 22px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
    white-space: nowrap;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
  }
  .ts-tab.active {
    color: #e96b1f;
    border-bottom: 3px solid #e96b1f;
    font-weight: 700;
  }
  .ts-tab:hover:not(.active) { color: #333; }

  /* Grid */
  .ts-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }

  /* Card */
  .ts-card {
    background: #fff;
    border-radius: 12px;
    padding: 32px 16px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 1.5px solid transparent;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    opacity: 0;
    transform: translateY(16px);
    animation: cardIn 0.4s ease forwards;
  }
  .ts-card:hover {
    border-color: #e96b1f;
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(233,107,31,0.12), 0 4px 12px rgba(0,0,0,0.06);
  }
  @keyframes cardIn {
    to { opacity: 1; transform: translateY(0); }
  }

  .ts-card img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  .ts-card-name {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    text-align: center;
    letter-spacing: 0.2px;
  }

  @media (max-width: 1200px) { .ts-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (max-width: 768px) {
    .ts-root { padding: 40px 20px; }
    .ts-grid { grid-template-columns: repeat(3, 1fr); }
    .ts-tabs { overflow-x: auto; }
  }
  @media (max-width: 480px) { .ts-grid { grid-template-columns: repeat(2, 1fr); } }
`;

const allTechs = [
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", cat: "Frontend" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", cat: "Frontend" },
    { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg", cat: "Mobile Apps" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", cat: "Frontend" },
    { name: "JMeter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", cat: "DevOps" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", cat: "DevOps" },
    { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", cat: "DevOps" },
    { name: "ASP.NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", cat: "Backend" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", cat: "Cloud" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", cat: "Backend" },
    { name: "Azure Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", cat: "Cloud" },
    { name: "Hyperledger", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", cat: "Backend" },
    { name: "IBM Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibmcloud/ibmcloud-original.svg", cat: "Cloud" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", cat: "Backend" },
    { name: "Microsoft .NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg", cat: "Backend" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", cat: "Backend" },
    { name: "Odoo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", cat: "Analytics" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", cat: "Backend" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", cat: "Database" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", cat: "Database" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", cat: "Database" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", cat: "Database" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", cat: "Mobile Apps" },
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", cat: "Mobile Apps" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", cat: "DevOps" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", cat: "DevOps" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", cat: "Frontend" },
    { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", cat: "Frontend" },
    { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", cat: "Cloud" },
    { name: "Tableau", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", cat: "Analytics" },
];

const TABS = ["All", "Frontend", "Backend", "Database", "Analytics", "Mobile Apps", "Cloud", "DevOps"];

export default function TechStackSection() {
    const [active, setActive] = useState("All");
    const [animKey, setAnimKey] = useState(0);

    const filtered = active === "All" ? allTechs : allTechs.filter(t => t.cat === active);

    const handleTab = (tab) => {
        setActive(tab);
        setAnimKey(k => k + 1);
    };

    return (
        <>
            <style>{css}</style>
            <div className="ts-root">
                <h2 className="ts-heading">Tech Stack</h2>
                <p className="ts-sub">Reap benefits from collaborating with our experienced IT experts for your diverse tech requirements.</p>

                {/* Tabs */}
                <div className="ts-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`ts-tab${active === tab ? " active" : ""}`}
                            onClick={() => handleTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="ts-grid" key={animKey}>
                    {filtered.map((tech, i) => (
                        <div
                            className="ts-card"
                            key={tech.name}
                            style={{ animationDelay: `${i * 45}ms` }}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                onError={e => { e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg"; }}
                            />
                            <span className="ts-card-name">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}