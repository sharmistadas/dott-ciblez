import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── Bootstrap must be imported in your project:
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataSecurityBanner() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const W = canvas.clientWidth;
        const H = canvas.clientHeight;

        // ── RENDERER ─────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 200);
        camera.position.set(1.5, 1.2, 13);
        camera.lookAt(1, 0, 0);

        // ── LIGHTS ───────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0x112233, 5));
        const key = new THREE.DirectionalLight(0x00ddcc, 4);
        key.position.set(4, 8, 10);
        scene.add(key);
        const fillLight = new THREE.DirectionalLight(0x002255, 2);
        fillLight.position.set(-6, -2, 4);
        scene.add(fillLight);
        const orb = new THREE.PointLight(0x00ffcc, 8, 25);
        const orb2 = new THREE.PointLight(0x0055ff, 4, 20);
        orb.position.set(2, 3, 6);
        orb2.position.set(-3, -2, 4);
        scene.add(orb, orb2);

        // ── MATERIALS ────────────────────────────────────────────
        const darkMat = new THREE.MeshPhongMaterial({
            color: 0x1a2030, emissive: 0x060c14, specular: 0x004466, shininess: 80,
        });
        const tealMat = new THREE.MeshPhongMaterial({
            color: 0x00c8a8, emissive: 0x004433, specular: 0x00ffdd, shininess: 200,
        });
        const tealGlow = new THREE.MeshBasicMaterial({ color: 0x00d4b4, side: THREE.DoubleSide });
        const edgeTeal = new THREE.LineBasicMaterial({ color: 0x00d4b4, transparent: true, opacity: 0.7 });
        const edgeDim = new THREE.LineBasicMaterial({ color: 0x334455, transparent: true, opacity: 0.4 });

        // ── HELPERS ──────────────────────────────────────────────
        function roundedRect(w, h, r) {
            const s = new THREE.Shape();
            s.moveTo(-w / 2 + r, -h / 2); s.lineTo(w / 2 - r, -h / 2);
            s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
            s.lineTo(w / 2, h / 2 - r);
            s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
            s.lineTo(-w / 2 + r, h / 2);
            s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
            s.lineTo(-w / 2, -h / 2 + r);
            s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
            return s;
        }
        function makeShieldShape(w, h) {
            const hw = w / 2, r = hw * 0.18;
            const s = new THREE.Shape();
            s.moveTo(-hw + r, h / 2);
            s.quadraticCurveTo(-hw, h / 2, -hw, h / 2 - r);
            s.lineTo(-hw, -h * 0.05);
            s.quadraticCurveTo(-hw * 0.55, -h / 2 * 0.72, 0, -h / 2);
            s.quadraticCurveTo(hw * 0.55, -h / 2 * 0.72, hw, -h * 0.05);
            s.lineTo(hw, h / 2 - r);
            s.quadraticCurveTo(hw, h / 2, hw - r, h / 2);
            s.lineTo(-hw + r, h / 2);
            return s;
        }

        const master = new THREE.Group();

        // ════════════════════════════════════════════════════════
        // SHIELD
        // ════════════════════════════════════════════════════════
        const SW = 4.6, SH = 5.4, SD = 0.65;
        const shieldShape = makeShieldShape(SW, SH);

        const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, {
            depth: SD, bevelEnabled: true,
            bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 5,
        });
        shieldGeo.center();
        master.add(new THREE.Mesh(shieldGeo, darkMat));
        master.add(new THREE.LineSegments(new THREE.EdgesGeometry(shieldGeo, 25), edgeDim));

        // Teal border overlay
        const borderShape = makeShieldShape(SW + 0.22, SH + 0.22);
        const borderGeo = new THREE.ExtrudeGeometry(borderShape, { depth: SD * 0.5, bevelEnabled: false });
        borderGeo.center();
        master.add(new THREE.Mesh(borderGeo,
            new THREE.MeshBasicMaterial({ color: 0x00d4b4, transparent: true, opacity: 0.08, side: THREE.DoubleSide })
        ));
        master.add(new THREE.LineSegments(new THREE.EdgesGeometry(borderGeo, 20), edgeTeal));

        // Teal top accent bar (like reference image)
        const accentShape = (() => {
            const hw = SW / 2 - 0.1;
            const cs = new THREE.Shape();
            cs.moveTo(-hw + 0.35, SH / 2 - 0.05);
            cs.quadraticCurveTo(-hw, SH / 2 - 0.05, -hw, SH / 2 - 0.4);
            cs.lineTo(-hw, SH / 2 - 1.5);
            cs.lineTo(-hw + 0.4, SH / 2 - 1.5);
            cs.lineTo(-hw + 0.4, SH / 2 - 0.4);
            cs.quadraticCurveTo(-hw + 0.4, SH / 2 - 0.45, -hw + 0.7, SH / 2 - 0.45);
            cs.lineTo(hw - 0.35, SH / 2 - 0.45);
            cs.lineTo(hw - 0.35, SH / 2 - 0.05);
            cs.lineTo(-hw + 0.35, SH / 2 - 0.05);
            return cs;
        })();
        const accentMesh = new THREE.Mesh(
            new THREE.ExtrudeGeometry(accentShape, { depth: 0.18, bevelEnabled: false }),
            tealMat
        );
        accentMesh.position.z = SD / 2 - 0.05;
        master.add(accentMesh);

        // Glowing dots on shield face
        [
            [0, 1.8], [-1.4, 0.5], [1.4, 0.5], [-0.8, -1.2], [0.8, -1.2],
            [0, -2.0], [-1.8, -0.4], [1.8, -0.4],
        ].forEach(([x, y]) => {
            const d = new THREE.Mesh(
                new THREE.SphereGeometry(0.06, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0x00d4b4, transparent: true, opacity: 0.7 })
            );
            d.position.set(x, y, SD / 2 + 0.12);
            master.add(d);
        });

        // ════════════════════════════════════════════════════════
        // PADLOCK
        // ════════════════════════════════════════════════════════
        const lockGroup = new THREE.Group();
        const LW = 1.7, LH = 1.55, LD = 0.55;

        const lockBodyGeo = new THREE.ExtrudeGeometry(roundedRect(LW, LH, 0.2), {
            depth: LD, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4,
        });
        lockBodyGeo.center();
        lockGroup.add(new THREE.Mesh(lockBodyGeo, darkMat));
        lockGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(lockBodyGeo, 20), edgeDim));

        // Shackle legs
        const legR = 0.095, legH = 0.9;
        const legGeo = new THREE.CylinderGeometry(legR, legR, legH, 16);
        [-0.38, 0.38].forEach(x => {
            const leg = new THREE.Mesh(legGeo, tealMat);
            leg.position.set(x, LH / 2 + legH / 2, 0);
            lockGroup.add(leg);
            const lw = new THREE.LineSegments(new THREE.EdgesGeometry(legGeo), edgeTeal);
            lw.position.set(x, LH / 2 + legH / 2, 0);
            lockGroup.add(lw);
        });

        // Shackle arch
        const archGeo = new THREE.TorusGeometry(0.38, legR, 16, 60, Math.PI);
        const archMesh = new THREE.Mesh(archGeo, tealMat);
        archMesh.rotation.z = Math.PI;
        archMesh.position.set(0, LH / 2 + legH, 0);
        lockGroup.add(archMesh);
        const archEdge = new THREE.LineSegments(new THREE.EdgesGeometry(archGeo), edgeTeal);
        archEdge.rotation.z = Math.PI;
        archEdge.position.set(0, LH / 2 + legH, 0);
        lockGroup.add(archEdge);

        // Keyhole
        const faceZ = LD / 2 + 0.06;
        const khCirc = new THREE.Mesh(new THREE.CircleGeometry(0.11, 24), tealGlow.clone());
        khCirc.position.set(0, 0.1, faceZ);
        lockGroup.add(khCirc);

        const khDark = new THREE.Mesh(new THREE.CircleGeometry(0.055, 24), new THREE.MeshBasicMaterial({ color: 0x030608 }));
        khDark.position.set(0, 0.1, faceZ + 0.005);
        lockGroup.add(khDark);

        const slotSh = new THREE.Shape();
        slotSh.moveTo(-0.055, 0.1); slotSh.lineTo(-0.055, -0.2);
        slotSh.quadraticCurveTo(0, -0.28, 0.055, -0.2);
        slotSh.lineTo(0.055, 0.1); slotSh.closePath();
        const khSlot = new THREE.Mesh(new THREE.ShapeGeometry(slotSh), tealGlow.clone());
        khSlot.position.set(0, 0, faceZ);
        lockGroup.add(khSlot);

        lockGroup.position.set(0, -0.25, SD / 2 + 0.06);
        master.add(lockGroup);

        scene.add(master);
        master.rotation.set(0.25, -0.35, 0);
        master.position.set(1.2, 0, 0);

        // ════════════════════════════════════════════════════════
        // ORBIT RING
        // ════════════════════════════════════════════════════════
        const orbitGroup = new THREE.Group();

        const orbitPts = Array.from({ length: 129 }, (_, i) => {
            const a = (i / 128) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a) * 3.8, Math.sin(a) * 1.1, 0);
        });
        const orbitCurve = new THREE.CatmullRomCurve3(orbitPts, true);

        const orbitTubeGeo = new THREE.TubeGeometry(orbitCurve, 128, 0.028, 8, true);
        orbitGroup.add(new THREE.Mesh(orbitTubeGeo,
            new THREE.MeshBasicMaterial({ color: 0x00d4b4, transparent: true, opacity: 0.65 })
        ));
        // dim inner ring
        orbitGroup.add(new THREE.Mesh(
            new THREE.TubeGeometry(orbitCurve, 128, 0.012, 8, true),
            new THREE.MeshBasicMaterial({ color: 0x003344, transparent: true, opacity: 0.4 })
        ));

        // Travelling glow dot + trail
        const dotGeo = new THREE.SphereGeometry(0.1, 10, 10);
        const glowDot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        orbitGroup.add(glowDot);

        const trailDots = Array.from({ length: 8 }, (_, i) => {
            const td = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({
                color: 0x00ffdd, transparent: true, opacity: 1 - i * 0.11,
            }));
            td.scale.setScalar(0.85 - i * 0.07);
            orbitGroup.add(td);
            return td;
        });

        orbitGroup.position.set(1.2, 0, 0);
        orbitGroup.rotation.set(0.25, -0.35, 0);
        scene.add(orbitGroup);

        // ── PARTICLES ────────────────────────────────────────────
        const pN = 180;
        const pArr = new Float32Array(pN * 3);
        for (let i = 0; i < pN; i++) {
            pArr[i * 3] = (Math.random() - 0.5) * 20;
            pArr[i * 3 + 1] = (Math.random() - 0.5) * 14;
            pArr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3));
        scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
            color: 0x00aacc, size: 0.07, transparent: true, opacity: 0.55,
        })));

        // ── ANIMATE ──────────────────────────────────────────────
        let frame, t = 0;
        const animate = () => {
            frame = requestAnimationFrame(animate);
            t += 0.012;

            const floatY = Math.sin(t * 0.7) * 0.2;
            master.position.y = floatY;
            orbitGroup.position.y = floatY;

            const sway = Math.sin(t * 0.35) * 0.12;
            master.rotation.y = -0.35 + sway;
            orbitGroup.rotation.y = -0.35 + sway;

            // Orbit dot
            const ot = (t * 0.18) % 1;
            glowDot.position.copy(orbitCurve.getPoint(ot));
            trailDots.forEach((td, i) => {
                td.position.copy(orbitCurve.getPoint(((t * 0.18) - (i + 1) * 0.012 + 10) % 1));
            });

            // Keyhole pulse
            const p = 0.55 + Math.sin(t * 2.8) * 0.45;
            khCirc.material.color.setRGB(0, p, p * 0.88);
            khSlot.material.color.setRGB(0, p, p * 0.88);

            // Light orbit
            orb.position.x = Math.cos(t * 0.5) * 8;
            orb.position.z = Math.sin(t * 0.5) * 8;
            orb2.position.x = Math.cos(t * 0.5 + Math.PI) * 7;
            orb2.position.z = Math.sin(t * 0.5 + Math.PI) * 7;

            renderer.render(scene, camera);
        };
        animate();

        // ── MOUSE ────────────────────────────────────────────────
        const onMouse = (e) => {
            const mx = (e.clientX / window.innerWidth - 0.5);
            const my = (e.clientY / window.innerHeight - 0.5);
            master.rotation.y = -0.35 + mx * 0.4;
            master.rotation.x = 0.25 - my * 0.25;
            orbitGroup.rotation.y = -0.35 + mx * 0.4;
            orbitGroup.rotation.x = 0.25 - my * 0.25;
        };
        window.addEventListener("mousemove", onMouse);

        const onResize = () => {
            const nW = canvas.clientWidth, nH = canvas.clientHeight;
            camera.aspect = nW / nH;
            camera.updateProjectionMatrix();
            renderer.setSize(nW, nH);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", onMouse);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Barlow:wght@300;400;500&display=swap');

        .sec-banner {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(135deg, #0a0e1a 0%, #0d1421 50%, #0a1020 100%);
          font-family: 'Barlow', sans-serif;
        }
        .sec-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,200,180,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          transform: perspective(600px) rotateX(55deg) translateY(40%);
          transform-origin: bottom center;
          pointer-events: none;
          z-index: 0;
        }
        .sec-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(10,14,26,0.88) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .sec-canvas {
          position: absolute;
          top: 0; right: 0;
          width: 58%; height: 100%;
          z-index: 2;
        }
        .sec-content {
          position: relative;
          z-index: 10;
          padding: 90px 0;
        }
        .sec-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #00d4b4;
          margin-bottom: 1.1rem;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.2s;
        }
        .sec-label::before {
          content: '';
          width: 24px; height: 1px;
          background: #00d4b4;
          flex-shrink: 0;
        }
        .sec-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4.6rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.0;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.35s;
        }
        .sec-title-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .sec-accent-line {
          height: 3px;
          width: 55px;
          background: linear-gradient(90deg, #00d4b4, transparent);
          border-radius: 2px;
          flex-shrink: 0;
        }
        .sec-desc {
          font-size: 0.9rem;
          color: rgba(175,200,220,0.62);
          line-height: 1.85;
          max-width: 390px;
          margin: 1.5rem 0 2.2rem;
          font-weight: 300;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.5s;
        }
        .sec-btn {
          display: inline-block;
          padding: 0.7rem 2.2rem;
          border: 1.5px solid #00d4b4;
          color: #00d4b4;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.98rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.65s;
        }
        .sec-btn:hover {
          background: rgba(0,212,180,0.1);
          box-shadow: 0 0 24px rgba(0,212,180,0.28);
          color: #00ffdd;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .sec-canvas { width: 100%; opacity: 0.3; }
          .sec-content { text-align: center; }
          .sec-label   { justify-content: center; }
          .sec-title-row { justify-content: center; }
          .sec-desc { margin-left: auto; margin-right: auto; }
        }
      `}</style>

            <section className="sec-banner">
                <canvas className="sec-canvas" ref={canvasRef} />

                <div className="container sec-content">
                    <div className="row">
                        <div className="col-lg-5 col-md-7">
                            <div className="sec-label">Cyber Protection</div>

                            <h1 className="sec-title">
                                <div>Cyber</div>
                                <div className="sec-title-row">
                                    Audit
                                    <div className="sec-accent-line" />
                                </div>
                            </h1>

                            <p className="sec-desc">
                                Cyber Audit is a process of evaluating an organization's information systems, security policies, and digital infrastructure to identify vulnerabilities, risks, and compliance issues. It helps ensure that data and systems are protected from cyber threats.
                            </p>

                            <a href="#" className="sec-btn">Read more</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}