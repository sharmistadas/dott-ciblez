import { useEffect, useRef, useState } from "react";

/**
 * EarthHero — Cinematic Scroll Experience
 * Dott Ciblez Technologies PVT LTD
 *
 * Phase 0 (0–600px)   : Full-screen spinning Earth (Three.js)
 * Phase 1 (600–1400px): Earth shatters into particles, coder silhouette fades in
 * Phase 2 (1400–2200px): Coder visible — laptop glow, typing animation, code rain
 * Phase 3 (2200–3000px): Welcome screen fades in with brand reveal
 *
 * The component creates a fixed canvas + a tall scroll container.
 * All content layers are CSS-positioned over the canvas.
 */

/* ─────────────────────────────────────────────────────────────
   STYLES  (injected once into <head>)
───────────────────────────────────────────────────────────────*/
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=Share+Tech+Mono&display=swap');

  .eh-root {
    position: relative;
    width: 100%;
    height: 3200px;          /* scroll height — 4 phases */
    background: #010812;
  }

  /* Fixed canvas wrapper */
  .eh-canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  /* ── SCROLL INDICATOR (phase 0) ────────────────────────── */
  .eh-scroll-hint {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 1;
    transition: opacity 0.6s;
    pointer-events: none;
  }
  .eh-scroll-hint.hidden { opacity: 0; }
  .eh-scroll-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
  .eh-scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(0,229,255,0.7), transparent);
    animation: scrollPulse 1.6s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%,100% { transform: scaleY(1); opacity: 1; }
    50%      { transform: scaleY(0.5); opacity: 0.4; }
  }

  /* ── CODER SILHOUETTE LAYER ────────────────────────────── */
  .eh-coder {
    position: fixed;
    inset: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: none; /* driven by JS */
  }
  .eh-coder-svg {
    width: min(520px, 85vw);
    height: auto;
    filter: drop-shadow(0 0 40px rgba(0,229,255,0.35)) drop-shadow(0 0 80px rgba(35,61,254,0.25));
  }

  /* Laptop glow pulse */
  .eh-laptop-glow {
    animation: laptopGlow 2.2s ease-in-out infinite;
  }
  @keyframes laptopGlow {
    0%,100% { opacity: 0.85; filter: brightness(1); }
    50%      { opacity: 1.0;  filter: brightness(1.35); }
  }

  /* Typing cursor on screen */
  .eh-cursor-blink {
    animation: cursorBlink 0.9s step-end infinite;
  }
  @keyframes cursorBlink {
    0%,100% { opacity: 1; }
    50%      { opacity: 0; }
  }

  /* ── CODE RAIN (floating code strings) ─────────────────── */
  .eh-code-rain {
    position: fixed;
    inset: 0;
    z-index: 4;
    pointer-events: none;
    opacity: 0;
    overflow: hidden;
  }
  .eh-code-col {
    position: absolute;
    top: 0;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    color: rgba(0,229,255,0.18);
    white-space: nowrap;
    writing-mode: vertical-lr;
    animation: codefall linear infinite;
    user-select: none;
  }
  .eh-code-col span { display: block; line-height: 1.6; }
  .eh-code-col span.bright { color: rgba(0,229,255,0.60); }
  @keyframes codefall {
    from { transform: translateY(-100%); }
    to   { transform: translateY(100vh); }
  }

  /* ── WELCOME SCREEN ─────────────────────────────────────── */
  .eh-welcome {
    position: fixed;
    inset: 0;
    z-index: 8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
  }
  .eh-welcome-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.30em;
    text-transform: uppercase;
    color: rgba(0,229,255,0.7);
    margin-bottom: 22px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s, transform 0.7s;
  }
  .eh-welcome-tag.show { opacity: 1; transform: translateY(0); }

  .eh-welcome-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 6vw, 5.5rem);
    font-weight: 800;
    color: #fff;
    text-align: center;
    line-height: 1.08;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s 0.15s, transform 0.8s 0.15s;
  }
  .eh-welcome-title.show { opacity: 1; transform: translateY(0); }
  .eh-welcome-title span {
    background: linear-gradient(90deg, #233dfe 0%, #00e5ff 60%, #233dfe 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s linear infinite;
  }
  @keyframes gradientShift {
    0%   { background-position: 0%   center; }
    100% { background-position: 200% center; }
  }

  .eh-welcome-sub {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: clamp(0.95rem, 1.8vw, 1.25rem);
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.06em;
    margin-top: 18px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s 0.3s, transform 0.7s 0.3s;
  }
  .eh-welcome-sub.show { opacity: 1; transform: translateY(0); }

  .eh-welcome-divider {
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #233dfe, #00e5ff, transparent);
    margin: 28px 0;
    opacity: 0;
    transition: opacity 0.6s 0.45s;
  }
  .eh-welcome-divider.show { opacity: 1; }

  .eh-welcome-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    opacity: 0;
    transition: opacity 0.6s 0.6s;
  }
  .eh-welcome-cta.show { opacity: 1; }

  /* Particle burst overlay for Earth explosion */
  .eh-burst {
    position: fixed;
    inset: 0;
    z-index: 2;
    pointer-events: none;
  }
`;

/* ─────────────────────────────────────────────────────────────
   CODE RAIN DATA
───────────────────────────────────────────────────────────────*/
const CODE_SNIPPETS = [
    "const ai = new DottCiblez();",
    "function innovate() {",
    "  return future.build();",
    "}",
    "import { genius } from 'dc';",
    "async function solve(p) {",
    "  await think(p);",
    "}",
    "class TechVision {",
    "  deploy() {}",
    "}",
    "export default Excellence;",
    "let data = fetch('/api');",
    "const cloud = connect();",
    "for (let i=0; i<∞; i++)",
    "  innovate();",
    "git push origin main",
    "npm run build:future",
    "docker compose up",
    "AI.train(dataset)",
    "network.optimize()",
    "db.query(solutions)",
    "> Hello, World!",
    "10110010 11001011",
    "0xDC 0xFF 0xAI",
];

function makeCodeColumns() {
    const cols = [];
    const count = Math.floor(window.innerWidth / 28);
    for (let i = 0; i < count; i++) {
        const left = i * 28 + Math.random() * 10;
        const delay = Math.random() * 8;
        const dur = 6 + Math.random() * 8;
        const chars = [];
        const lines = 8 + Math.floor(Math.random() * 12);
        for (let j = 0; j < lines; j++) {
            const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
            const bright = Math.random() > 0.85;
            chars.push({ text: snippet, bright });
        }
        cols.push({ left, delay, dur, chars });
    }
    return cols;
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────*/
export default function EarthHero() {
    const canvasRef = useRef(null);
    const coderRef = useRef(null);
    const codeRainRef = useRef(null);
    const welcomeRef = useRef(null);
    const scrollHintRef = useRef(null);
    const [codeCols, setCodeCols] = useState([]);
    const [welcomeVisible, setWelcomeVisible] = useState(false);

    /* ── inject CSS once ── */
    useEffect(() => {
        const id = "eh-style";
        if (!document.getElementById(id)) {
            const s = document.createElement("style");
            s.id = id; s.textContent = CSS;
            document.head.appendChild(s);
        }
        setCodeCols(makeCodeColumns());
    }, []);

    /* ── Three.js Earth + particles ── */
    useEffect(() => {
        let renderer, scene, camera, animId;
        let scrollY = 0;
        let smoothSc = 0;

        const init = async () => {
            const THREE = await import("three");

            const W = window.innerWidth, H = window.innerHeight;
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
            camera.position.set(0, 0, 4.5);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
            renderer.setSize(W, H);
            renderer.setClearColor(0x010812, 1);
            if (canvasRef.current) canvasRef.current.appendChild(renderer.domElement);

            /* ── Lights ── */
            scene.add(new THREE.AmbientLight(0x223366, 1.2));
            const sun = new THREE.DirectionalLight(0xffffff, 2.8);
            sun.position.set(5, 3, 5);
            scene.add(sun);
            const rimLight = new THREE.PointLight(0x233dfe, 3, 20);
            rimLight.position.set(-4, 1, -2);
            scene.add(rimLight);
            const cyanLight = new THREE.PointLight(0x00e5ff, 1.5, 15);
            cyanLight.position.set(2, -3, 3);
            scene.add(cyanLight);

            /* ══════════════════════════════════════════════════════
               EARTH — procedural sphere with lat/lon grid + land masses
               Using vertex colors to fake continents (no texture needed)
            ══════════════════════════════════════════════════════ */
            const SEGS = 96;
            const earthGeo = new THREE.SphereGeometry(1.5, SEGS, SEGS);

            // Build vertex color array to fake ocean vs land
            const posArr = earthGeo.attributes.position.array;
            const vCount = posArr.length / 3;
            const colors = new Float32Array(vCount * 3);

            // Simple noise-like land mask using trig combos
            const landMask = (lon, lat) => {
                const x = Math.cos(lat) * Math.cos(lon);
                const y = Math.cos(lat) * Math.sin(lon);
                const z = Math.sin(lat);
                // Multi-octave pseudo-noise
                const v =
                    Math.sin(x * 4.1 + y * 2.3) * 0.3 +
                    Math.sin(y * 5.7 + z * 3.1) * 0.25 +
                    Math.sin(z * 3.9 + x * 6.2) * 0.2 +
                    Math.sin(x * 8 + z * 4) * 0.15 +
                    Math.sin(y * 7 + x * 2) * 0.1;
                return v;
            };

            const oceanDeep = new THREE.Color(0x0a1a3d);
            const oceanShelf = new THREE.Color(0x0e2555);
            const land = new THREE.Color(0x1a4a2e);
            const landHigh = new THREE.Color(0x2d6b3a);
            const snow = new THREE.Color(0xddeeff);

            for (let i = 0; i < vCount; i++) {
                const px = posArr[i * 3], py = posArr[i * 3 + 1], pz = posArr[i * 3 + 2];
                const lon = Math.atan2(py, px);
                const lat = Math.asin(pz / 1.5);
                const absLat = Math.abs(lat);
                const mask = landMask(lon, lat);
                let col;
                if (absLat > 1.35) { col = snow; }        // poles
                else if (mask > 0.08) {
                    col = mask > 0.22 ? landHigh : land;
                } else {
                    col = mask > -0.05 ? oceanShelf : oceanDeep;
                }
                colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
            }
            earthGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

            const earthMat = new THREE.MeshPhongMaterial({
                vertexColors: true,
                shininess: 35,
                specular: new THREE.Color(0x224488),
                transparent: true, opacity: 1.0,
            });
            const earth = new THREE.Mesh(earthGeo, earthMat);
            scene.add(earth);

            // Atmosphere glow
            const atmMat = new THREE.MeshBasicMaterial({
                color: 0x1133cc, transparent: true, opacity: 0.12, side: THREE.BackSide,
            });
            const atm = new THREE.Mesh(new THREE.SphereGeometry(1.62, 48, 48), atmMat);
            scene.add(atm);

            // Grid lines (lat / lon)
            const gridMat = new THREE.LineBasicMaterial({ color: 0x233dfe, transparent: true, opacity: 0.10 });
            const addGridLine = (pts) => {
                const g = new THREE.BufferGeometry().setFromPoints(pts);
                scene.add(new THREE.Line(g, gridMat));
            };
            for (let lat = -75; lat <= 75; lat += 15) {
                const pts = [];
                const r = 1.505;
                const phi = (lat * Math.PI) / 180;
                for (let lon = 0; lon <= 360; lon += 3) {
                    const theta = (lon * Math.PI) / 180;
                    pts.push(new THREE.Vector3(
                        r * Math.cos(phi) * Math.cos(theta),
                        r * Math.sin(phi),
                        r * Math.cos(phi) * Math.sin(theta)
                    ));
                }
                addGridLine(pts);
            }
            for (let lon = 0; lon < 360; lon += 20) {
                const pts = [];
                const theta = (lon * Math.PI) / 180;
                for (let lat = -90; lat <= 90; lat += 3) {
                    const phi = (lat * Math.PI) / 180;
                    pts.push(new THREE.Vector3(
                        1.505 * Math.cos(phi) * Math.cos(theta),
                        1.505 * Math.sin(phi),
                        1.505 * Math.cos(phi) * Math.sin(theta)
                    ));
                }
                addGridLine(pts);
            }

            /* ══════════════════════════════════════════════════════
               SCATTER PARTICLES — pre-baked from Earth surface
               When scatter triggers, each particle flies outward
            ══════════════════════════════════════════════════════ */
            const PART_N = 3800;
            const pPos = new Float32Array(PART_N * 3);
            const pBase = new Float32Array(PART_N * 3); // original surface pos
            const pScatter = new Float32Array(PART_N * 3);
            const pColorArr = new Float32Array(PART_N * 3);

            for (let i = 0; i < PART_N; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 1.5;
                const bx = r * Math.sin(phi) * Math.cos(theta);
                const by = r * Math.sin(phi) * Math.sin(theta);
                const bz = r * Math.cos(phi);

                pBase[i * 3] = bx; pBase[i * 3 + 1] = by; pBase[i * 3 + 2] = bz;

                // Scatter: radial explosion + random drift
                const dist = 4 + Math.random() * 8;
                pScatter[i * 3] = bx * dist + (Math.random() - 0.5) * 6;
                pScatter[i * 3 + 1] = by * dist + (Math.random() - 0.5) * 6;
                pScatter[i * 3 + 2] = bz * dist + (Math.random() - 0.5) * 6;

                pPos[i * 3] = bx; pPos[i * 3 + 1] = by; pPos[i * 3 + 2] = bz;

                // Color mix: ocean blue / land green / atmosphere cyan
                const rnd = Math.random();
                let pc;
                if (rnd < 0.5) pc = new THREE.Color(0x1144aa);
                else if (rnd < 0.78) pc = new THREE.Color(0x1a5c30);
                else if (rnd < 0.92) pc = new THREE.Color(0x00e5ff);
                else pc = new THREE.Color(0xffffff);
                pColorArr[i * 3] = pc.r; pColorArr[i * 3 + 1] = pc.g; pColorArr[i * 3 + 2] = pc.b;
            }

            const partGeo = new THREE.BufferGeometry();
            const partPosAttr = new THREE.BufferAttribute(pPos, 3);
            partGeo.setAttribute("position", partPosAttr);
            partGeo.setAttribute("color", new THREE.BufferAttribute(pColorArr, 3));

            const partMat = new THREE.PointsMaterial({
                vertexColors: true, size: 0.045,
                transparent: true, opacity: 0.0, sizeAttenuation: true,
            });
            const particles = new THREE.Points(partGeo, partMat);
            scene.add(particles);

            /* ══════════════════════════════════════════════════════
               STAR FIELD — distant background stars
            ══════════════════════════════════════════════════════ */
            const S_N = 1800;
            const sPos = new Float32Array(S_N * 3);
            for (let i = 0; i < S_N; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 20 + Math.random() * 60;
                sPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                sPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                sPos[i * 3 + 2] = r * Math.cos(phi);
            }
            const starGeo = new THREE.BufferGeometry();
            starGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
            const starMat = new THREE.PointsMaterial({
                color: 0xffffff, size: 0.08, transparent: true, opacity: 0.5, sizeAttenuation: true,
            });
            scene.add(new THREE.Points(starGeo, starMat));

            /* helpers */
            const lerp = (a, b, t) => a + (b - a) * t;
            const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
            const easeOut = (t) => 1 - Math.pow(1 - t, 3);
            const easeIn = (t) => t * t * t;
            const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            const onScroll = () => { scrollY = window.scrollY; };
            const onResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onResize);

            const clock = new THREE.Clock();

            const animate = () => {
                animId = requestAnimationFrame(animate);
                const t = clock.getElapsedTime();

                smoothSc += (scrollY - smoothSc) * 0.055;
                const sc = smoothSc;

                /* ── Phase progress ── */
                // Phase 1: Earth scatter (600 → 1400)
                const scatterT = clamp((sc - 600) / 800, 0, 1);
                const scE = easeOut(scatterT);

                // Phase 2: Coder visible (1000 → 1600)
                const coderT = clamp((sc - 1000) / 600, 0, 1);
                const coderE = ease(coderT);

                // Phase 3: Welcome (2200 → 3000)
                const welcomeT = clamp((sc - 2200) / 600, 0, 1);
                const welcomeE = ease(welcomeT);

                /* ── EARTH ── */
                // Spin slows as it scatters
                earth.rotation.y = t * 0.12 * (1 - scatterT * 0.9);
                earth.rotation.x = Math.sin(t * 0.05) * 0.04 * (1 - scatterT);
                atm.rotation.y = t * 0.08;

                // Earth fades + shrinks during scatter
                earthMat.opacity = lerp(1.0, 0.0, easeIn(clamp(scatterT * 1.5, 0, 1)));
                atmMat.opacity = lerp(0.12, 0.0, scE);
                gridMat.opacity = lerp(0.10, 0.0, scE);

                // Camera zoom + tilt for scatter drama
                camera.position.z = lerp(4.5, 7.0, scE * 0.6);
                camera.position.y = lerp(0, 0.8, scE * 0.4);

                /* ── PARTICLES (scatter from Earth surface) ── */
                partMat.opacity = lerp(0.0, 0.85, scE) * lerp(1.0, 0.0, clamp((scatterT - 0.7) / 0.3, 0, 1));
                if (scatterT > 0.01) {
                    const pArr = partGeo.attributes.position.array;
                    for (let i = 0; i < PART_N; i++) {
                        pArr[i * 3] = lerp(pBase[i * 3], pScatter[i * 3], scE);
                        pArr[i * 3 + 1] = lerp(pBase[i * 3 + 1], pScatter[i * 3 + 1], scE);
                        pArr[i * 3 + 2] = lerp(pBase[i * 3 + 2], pScatter[i * 3 + 2], scE);
                    }
                    partGeo.attributes.position.needsUpdate = true;
                }

                /* ── CODER OVERLAY (CSS) ── */
                if (coderRef.current) {
                    coderRef.current.style.opacity = coderE;
                }

                /* ── CODE RAIN ── */
                if (codeRainRef.current) {
                    codeRainRef.current.style.opacity =
                        lerp(0, 1, clamp((coderT - 0.3) / 0.5, 0, 1));
                }

                /* ── WELCOME ── */
                if (welcomeRef.current) {
                    welcomeRef.current.style.opacity = welcomeE;
                }
                if (welcomeT > 0.4 !== welcomeVisible) {
                    setWelcomeVisible(welcomeT > 0.4);
                }

                /* ── SCROLL HINT ── */
                if (scrollHintRef.current) {
                    scrollHintRef.current.style.opacity = lerp(1, 0, clamp(sc / 300, 0, 1));
                }

                /* ── BACKGROUND ── */
                // Shifts from deep navy → near black as coder appears
                const bgR = lerp(0x01, 0x00, coderE) / 255;
                const bgG = lerp(0x08, 0x02, coderE) / 255;
                const bgB = lerp(0x12, 0x06, coderE) / 255;
                renderer.setClearColor(new THREE.Color(bgR, bgG, bgB), 1);

                renderer.render(scene, camera);
            };

            animate();

            if (canvasRef.current) {
                canvasRef.current._cleanup = () => {
                    cancelAnimationFrame(animId);
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("resize", onResize);
                    renderer.dispose();
                };
            }
        };

        init();

        return () => {
            if (canvasRef.current) {
                canvasRef.current._cleanup?.();
                canvasRef.current.querySelector?.("canvas")?.remove();
            }
        };
    }, []);

    /* ─────────────────────────────────────────────────────────
       RENDER
    ───────────────────────────────────────────────────────── */
    return (
        <div className="eh-root">

            {/* Fixed canvas — Three.js mounts here */}
            <div className="eh-canvas" ref={canvasRef} />

            {/* Scroll hint */}
            <div className="eh-scroll-hint" ref={scrollHintRef}>
                <span className="eh-scroll-text">Scroll to explore</span>
                <div className="eh-scroll-line" />
            </div>

            {/* Code rain columns */}
            <div className="eh-code-rain" ref={codeRainRef}>
                {codeCols.map((col, ci) => (
                    <div
                        key={ci}
                        className="eh-code-col"
                        style={{
                            left: col.left,
                            animationDuration: `${col.dur}s`,
                            animationDelay: `${col.delay}s`,
                            opacity: 0.8,
                        }}
                    >
                        {col.chars.map((c, i) => (
                            <span key={i} className={c.bright ? "bright" : ""}>{c.text}</span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Coder silhouette — pure SVG, no image needed */}
            <div className="eh-coder" ref={coderRef}>
                <svg
                    className="eh-coder-svg"
                    viewBox="0 0 520 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* ── Desk surface ── */}
                    <rect x="60" y="360" width="400" height="8" rx="2"
                        fill="none" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5" />

                    {/* ── Laptop base ── */}
                    <rect x="160" y="300" width="200" height="62" rx="6"
                        fill="rgba(35,61,254,0.12)" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" />

                    {/* ── Laptop screen ── */}
                    <rect x="165" y="195" width="190" height="112" rx="5"
                        fill="rgba(1,8,18,0.92)" stroke="rgba(0,229,255,0.55)" strokeWidth="1.5" />

                    {/* Screen glow effect */}
                    <rect x="165" y="195" width="190" height="112" rx="5"
                        fill="url(#screenGrad)" className="eh-laptop-glow" />

                    {/* Code on screen */}
                    <text x="178" y="218" fontFamily="monospace" fontSize="7.5" fill="rgba(0,229,255,0.8)">
                        const dc = DottCiblez.init();
                    </text>
                    <text x="178" y="230" fontFamily="monospace" fontSize="7.5" fill="rgba(255,255,255,0.5)">
                        {"async function build() {"}
                    </text>
                    <text x="188" y="242" fontFamily="monospace" fontSize="7.5" fill="rgba(35,61,254,0.9)">
                        await innovate();
                    </text>
                    <text x="188" y="254" fontFamily="monospace" fontSize="7.5" fill="rgba(0,229,255,0.7)">
                        return excellence;
                    </text>
                    <text x="178" y="266" fontFamily="monospace" fontSize="7.5" fill="rgba(255,255,255,0.5)">
                        {"}"}
                    </text>
                    {/* Cursor */}
                    <rect x="178" y="275" width="6" height="10"
                        fill="rgba(0,229,255,0.9)" className="eh-cursor-blink" />

                    {/* ── Hinge ── */}
                    <rect x="160" y="298" width="200" height="6" rx="2"
                        fill="rgba(0,229,255,0.2)" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />

                    {/* ── Chair back ── */}
                    <rect x="195" y="210" width="130" height="145" rx="8"
                        fill="none" stroke="rgba(35,61,254,0.25)" strokeWidth="1.5"
                        strokeDasharray="4 3" />

                    {/* ── Human body — seated silhouette ── */}
                    {/* Head */}
                    <ellipse cx="260" cy="145" rx="28" ry="33"
                        fill="rgba(0,229,255,0.06)" stroke="rgba(0,229,255,0.45)" strokeWidth="1.5" />

                    {/* Neck */}
                    <line x1="260" y1="178" x2="260" y2="198"
                        stroke="rgba(0,229,255,0.3)" strokeWidth="5" />

                    {/* Shoulders + torso */}
                    <path d="M 195 200 Q 210 190 260 192 Q 310 190 325 200 L 320 280 Q 300 295 260 296 Q 220 295 200 280 Z"
                        fill="rgba(35,61,254,0.08)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />

                    {/* Left arm toward laptop */}
                    <path d="M 200 215 Q 190 255 185 300 Q 190 310 200 308 Q 210 280 215 250 Q 218 225 215 215 Z"
                        fill="rgba(35,61,254,0.10)" stroke="rgba(0,229,255,0.30)" strokeWidth="1.2" />

                    {/* Right arm toward laptop */}
                    <path d="M 320 215 Q 330 255 335 300 Q 330 310 320 308 Q 310 280 305 250 Q 302 225 305 215 Z"
                        fill="rgba(35,61,254,0.10)" stroke="rgba(0,229,255,0.30)" strokeWidth="1.2" />

                    {/* Left hand on keyboard */}
                    <ellipse cx="196" cy="310" rx="18" ry="9"
                        fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.2" />

                    {/* Right hand on keyboard */}
                    <ellipse cx="324" cy="310" rx="18" ry="9"
                        fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.35)" strokeWidth="1.2" />

                    {/* ── Legs / Seat ── */}
                    <path d="M 220 295 L 205 360 L 225 360 L 240 300 Z"
                        fill="rgba(35,61,254,0.08)" stroke="rgba(0,229,255,0.25)" strokeWidth="1.2" />
                    <path d="M 300 295 L 315 360 L 295 360 L 280 300 Z"
                        fill="rgba(35,61,254,0.08)" stroke="rgba(0,229,255,0.25)" strokeWidth="1.2" />

                    {/* Feet */}
                    <ellipse cx="214" cy="362" rx="18" ry="7"
                        fill="rgba(0,229,255,0.06)" stroke="rgba(0,229,255,0.25)" strokeWidth="1" />
                    <ellipse cx="306" cy="362" rx="18" ry="7"
                        fill="rgba(0,229,255,0.06)" stroke="rgba(0,229,255,0.25)" strokeWidth="1" />

                    {/* ── Headphone / ear accent ── */}
                    <path d="M 234 130 Q 225 120 228 138" stroke="rgba(0,229,255,0.5)" strokeWidth="2" fill="none" />
                    <path d="M 286 130 Q 295 120 292 138" stroke="rgba(0,229,255,0.5)" strokeWidth="2" fill="none" />

                    {/* ── Floating code particles around figure ── */}
                    {[
                        { x: 120, y: 180, t: "01" }, { x: 390, y: 160, t: "AI" }, { x: 100, y: 290, t: "{}" }, { x: 400, y: 280, t: "/>" },
                        { x: 140, y: 360, t: "DB" }, { x: 380, y: 350, t: "<>" }, { x: 80, y: 240, t: "fn" }, { x: 440, y: 240, t: "[]" },
                    ].map((p, i) => (
                        <text key={i} x={p.x} y={p.y} fontFamily="monospace" fontSize="11"
                            fill={`rgba(0,229,255,${0.15 + (i % 3) * 0.08})`}>{p.t}</text>
                    ))}

                    {/* Orbit ring around head */}
                    <ellipse cx="260" cy="145" rx="48" ry="18" fill="none"
                        stroke="rgba(35,61,254,0.25)" strokeWidth="1" strokeDasharray="3 4"
                        transform="rotate(-15 260 145)" />
                    <ellipse cx="260" cy="145" rx="60" ry="14" fill="none"
                        stroke="rgba(0,229,255,0.15)" strokeWidth="1" strokeDasharray="2 5"
                        transform="rotate(20 260 145)" />

                    {/* Screen glow gradient def */}
                    <defs>
                        <radialGradient id="screenGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(35,61,254,0.35)" />
                            <stop offset="60%" stopColor="rgba(0,229,255,0.15)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                        </radialGradient>
                    </defs>
                </svg>

                {/* Floor glow under desk */}
                <div style={{
                    position: "absolute",
                    bottom: "calc(50% - 245px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 320,
                    height: 20,
                    background: "radial-gradient(ellipse, rgba(35,61,254,0.25) 0%, transparent 70%)",
                    filter: "blur(8px)",
                    pointerEvents: "none",
                }} />
            </div>

            {/* Welcome screen */}
            <div className="eh-welcome" ref={welcomeRef}>
                <div className={`eh-welcome-tag ${welcomeVisible ? "show" : ""}`}>
                    Dott Ciblez Technologies PVT LTD
                </div>
                <h1 className={`eh-welcome-title ${welcomeVisible ? "show" : ""}`}>
                    Welcome to<br />
                    <span>Dott Ciblez</span>
                </h1>
                <p className={`eh-welcome-sub ${welcomeVisible ? "show" : ""}`}>
                    Innovating the Digital World — One Line at a Time
                </p>
                <div className={`eh-welcome-divider ${welcomeVisible ? "show" : ""}`} />
                <p className={`eh-welcome-cta ${welcomeVisible ? "show" : ""}`}>
                    Scroll to discover our work ↓
                </p>
            </div>
        </div>
    );
}