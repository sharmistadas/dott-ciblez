import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./SciFiTunnel.css";

export default function SciFiTunnel() {
    const mountRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const W = mount.clientWidth;
        const H = mount.clientHeight;

        /* ── Renderer ─────────────────────────────── */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000510, 1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        mount.appendChild(renderer.domElement);

        /* ── Scene / Camera ───────────────────────── */
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000510, 0.018);

        const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 300);
        camera.position.set(0, 0, 0);

        /* ── Tunnel path (helix) ──────────────────── */
        const TUNNEL_RADIUS = 5;
        const TUNNEL_LENGTH = 200;
        const HELIX_AMPLITUDE = 0;           // 0 = straight corkscrew
        const points = [];
        for (let i = 0; i <= 400; i++) {
            const t = (i / 400) * TUNNEL_LENGTH;
            points.push(new THREE.Vector3(0, 0, -t));
        }
        const path = new THREE.CatmullRomCurve3(points);

        /* ── HEX ring helper ──────────────────────── */
        function makeHexRing(ringRadius, z, rotOffset, opacity, emissiveIntensity) {
            const group = new THREE.Group();
            const sides = 6;
            const angleStep = (Math.PI * 2) / sides;

            for (let s = 0; s < sides; s++) {
                const a0 = s * angleStep + rotOffset;
                const a1 = (s + 1) * angleStep + rotOffset;

                const x0 = Math.cos(a0) * ringRadius;
                const y0 = Math.sin(a0) * ringRadius;
                const x1 = Math.cos(a1) * ringRadius;
                const y1 = Math.sin(a1) * ringRadius;

                /* panel face */
                const panelGeo = new THREE.BufferGeometry();
                const verts = new Float32Array([
                    x0, y0, -0.15,
                    x1, y1, -0.15,
                    x1, y1, 0.15,
                    x0, y0, 0.15,
                ]);
                const idx = [0, 1, 2, 0, 2, 3];
                panelGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
                panelGeo.setIndex(idx);
                panelGeo.computeVertexNormals();

                const panelMat = new THREE.MeshStandardMaterial({
                    color: 0x003366,
                    emissive: 0x0044cc,
                    emissiveIntensity,
                    metalness: 0.9,
                    roughness: 0.2,
                    transparent: true,
                    opacity,
                    side: THREE.DoubleSide,
                });

                const panel = new THREE.Mesh(panelGeo, panelMat);
                panel.position.z = z;
                group.add(panel);

                /* edge glow lines */
                const lineGeo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x0, y0, z - 0.15),
                    new THREE.Vector3(x1, y1, z - 0.15),
                    new THREE.Vector3(x1, y1, z + 0.15),
                    new THREE.Vector3(x0, y0, z + 0.15),
                    new THREE.Vector3(x0, y0, z - 0.15),
                ]);
                const lineMat = new THREE.LineBasicMaterial({
                    color: 0x00aaff,
                    transparent: true,
                    opacity: Math.min(1, opacity + 0.3),
                    linewidth: 1,
                });
                group.add(new THREE.Line(lineGeo, lineMat));
            }
            return group;
        }

        /* ── Build rings along the tunnel ────────── */
        const rings = [];
        const ringGroups = new THREE.Group();
        scene.add(ringGroups);

        const RING_COUNT = 120;
        const RING_SPACING = TUNNEL_LENGTH / RING_COUNT;
        const TWIST_PER_RING = (Math.PI * 2) / 18; // corkscrew twist

        for (let i = 0; i < RING_COUNT; i++) {
            const z = -i * RING_SPACING;
            const twist = i * TWIST_PER_RING;
            const distFade = 1 - (i / RING_COUNT) * 0.6;
            const ring = makeHexRing(
                TUNNEL_RADIUS,
                0,
                twist,
                0.65 * distFade,
                0.6 * distFade,
            );
            ring.position.z = z;
            ringGroups.add(ring);
            rings.push({ group: ring, baseZ: z, twist });
        }

        /* ── Inner hexagon connectors (corkscrew spine) ── */
        const spinePoints = [];
        for (let i = 0; i < RING_COUNT; i++) {
            const z = -i * RING_SPACING;
            const twist = i * TWIST_PER_RING;
            const x = Math.cos(twist) * (TUNNEL_RADIUS * 0.55);
            const y = Math.sin(twist) * (TUNNEL_RADIUS * 0.55);
            spinePoints.push(new THREE.Vector3(x, y, z));
        }
        const spineGeo = new THREE.BufferGeometry().setFromPoints(spinePoints);
        const spineMat = new THREE.LineBasicMaterial({
            color: 0x00ccff,
            transparent: true,
            opacity: 0.55,
        });
        scene.add(new THREE.Line(spineGeo, spineMat));

        /* second spiral (offset 180°) */
        const spine2Points = spinePoints.map(p => {
            const z = p.z;
            const idx = Math.round((-z / RING_SPACING));
            const twist = idx * TWIST_PER_RING + Math.PI;
            return new THREE.Vector3(
                Math.cos(twist) * (TUNNEL_RADIUS * 0.55),
                Math.sin(twist) * (TUNNEL_RADIUS * 0.55),
                z
            );
        });
        const spine2Geo = new THREE.BufferGeometry().setFromPoints(spine2Points);
        scene.add(new THREE.Line(spine2Geo, spineMat.clone()));

        /* ── Particle field ───────────────────────── */
        const PARTICLE_COUNT = 3000;
        const pPositions = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = 1.0 + Math.random() * (TUNNEL_RADIUS - 1.2);
            pPositions[i * 3 + 0] = Math.cos(angle) * r;
            pPositions[i * 3 + 1] = Math.sin(angle) * r;
            pPositions[i * 3 + 2] = -(Math.random() * TUNNEL_LENGTH);
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0x88ddff,
            size: 0.04,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        /* ── Lighting ─────────────────────────────── */
        scene.add(new THREE.AmbientLight(0x001133, 0.8));

        const frontLight = new THREE.PointLight(0x0066ff, 3, 25);
        frontLight.position.set(0, 0, 2);
        scene.add(frontLight);

        const backLight = new THREE.PointLight(0x00aaff, 1.5, 40);
        backLight.position.set(0, 0, -30);
        scene.add(backLight);

        /* ── Animate ──────────────────────────────── */
        let t = 0;
        const SPEED = 0.012;

        function animate() {
            animRef.current = requestAnimationFrame(animate);
            t += SPEED;

            /* camera flies through tunnel */
            const progress = (t % RING_COUNT) / RING_COUNT;
            camera.position.z = -t * RING_SPACING;

            /* gentle camera drift */
            camera.position.x = Math.sin(t * 0.07) * 0.4;
            camera.position.y = Math.cos(t * 0.09) * 0.3;
            camera.lookAt(
                camera.position.x * 0.5,
                camera.position.y * 0.5,
                camera.position.z - 20
            );

            /* move point lights with camera */
            frontLight.position.z = camera.position.z + 4;
            backLight.position.z = camera.position.z - 25;

            /* pulse emissive on each ring */
            rings.forEach(({ group, baseZ }, i) => {
                const relZ = baseZ - camera.position.z;
                const dist = Math.abs(relZ);
                const pulse = Math.sin(t * 2 + i * 0.15) * 0.15 + 0.5;

                group.children.forEach(child => {
                    if (child.material && child.material.emissiveIntensity !== undefined) {
                        const fade = Math.max(0, 1 - dist / 60);
                        child.material.emissiveIntensity = pulse * fade * 0.8;
                        child.material.opacity = 0.55 + pulse * 0.2 * fade;
                    }
                });

                /* recycle rings that are behind camera */
                if (relZ > 8) {
                    group.position.z = baseZ - RING_COUNT * RING_SPACING;
                    rings[i].baseZ = group.position.z;
                }
            });

            /* particle drift */
            const pos = particleGeo.attributes.position.array;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                pos[i * 3 + 2] += SPEED * RING_SPACING * 0.5;
                if (pos[i * 3 + 2] > camera.position.z + 5) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = 1 + Math.random() * (TUNNEL_RADIUS - 1.3);
                    pos[i * 3 + 0] = Math.cos(angle) * r;
                    pos[i * 3 + 1] = Math.sin(angle) * r;
                    pos[i * 3 + 2] = camera.position.z - TUNNEL_LENGTH * 0.8;
                }
            }
            particleGeo.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        }
        animate();

        /* ── Resize ───────────────────────────────── */
        const onResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);

        /* ── Cleanup ──────────────────────────────── */
        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="tunnel-page">
            {/* Canvas container */}
            <div ref={mountRef} className="tunnel-canvas" />

            {/* Overlay UI */}
            <div className="tunnel-overlay">
                <div className="tunnel-hud-top">
                    <div className="hud-line hud-line-left" />
                    <div className="hud-badge">
                        <span className="hud-dot" />
                        SCI-FI CORRIDOR — ACTIVE
                    </div>
                    <div className="hud-line hud-line-right" />
                </div>

                <div className="tunnel-center-text">
                    <h1 className="tunnel-heading">
                        ENTER THE <span>NEXUS</span>
                    </h1>
                    <p className="tunnel-subtext">
                        Hexagonal geometry · Corkscrew traverse · Deep transit
                    </p>
                </div>

                <div className="tunnel-hud-bottom">
                    <div className="hud-stat">
                        <span className="hud-stat-label">VELOCITY</span>
                        <span className="hud-stat-val">∞ c</span>
                    </div>
                    <div className="hud-stat">
                        <span className="hud-stat-label">DEPTH</span>
                        <span className="hud-stat-val">— km</span>
                    </div>
                    <div className="hud-stat">
                        <span className="hud-stat-label">INTEGRITY</span>
                        <span className="hud-stat-val">98.7 %</span>
                    </div>
                </div>
            </div>

            {/* Corner brackets */}
            <div className="corner-tl" /><div className="corner-tr" />
            <div className="corner-bl" /><div className="corner-br" />
        </div>
    );
}