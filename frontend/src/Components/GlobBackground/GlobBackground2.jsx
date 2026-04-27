import { useEffect, useRef } from "react";

export default function GlobBackground2() {
    const mountRef = useRef(null);

    useEffect(() => {
        let renderer, scene, camera, animId;
        let scrollY = 0;
        let phase = 0;          // smoothed 0-1 per phase
        let globalT = 0;        // smoothed 0-1 across entire page

        const init = async () => {
            const THREE = await import("three");

            const W = window.innerWidth;
            const H = window.innerHeight;

            // ── Scene ─────────────────────────────────────────────
            scene = new THREE.Scene();
            scene.background = new THREE.Color("#05091a");

            camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 300);
            camera.position.set(0, 0, 7);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(W, H);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;
            if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

            // ── Lights ────────────────────────────────────────────
            const ambient = new THREE.AmbientLight(0x0a1240, 2);
            scene.add(ambient);

            const light1 = new THREE.PointLight(0x233dfe, 10, 40);
            light1.position.set(4, 3, 6);
            scene.add(light1);

            const light2 = new THREE.PointLight(0xff6620, 7, 35);
            light2.position.set(-4, -2, 3);
            scene.add(light2);

            const light3 = new THREE.PointLight(0x00e5ff, 4, 30);
            light3.position.set(0, 5, -2);
            scene.add(light3);

            // ═══════════════════════════════════════════════════════
            // LAYER 1: GLOBE (core + wireframe + atmosphere + spikes)
            // ═══════════════════════════════════════════════════════
            const globeGroup = new THREE.Group();
            scene.add(globeGroup);

            // Core sphere
            const coreMat = new THREE.MeshPhongMaterial({
                color: 0x060e2a,
                emissive: 0x0a1850,
                emissiveIntensity: 0.9,
                shininess: 60,
                transparent: true,
                opacity: 0.96,
            });
            const core = new THREE.Mesh(new THREE.SphereGeometry(1.42, 64, 64), coreMat);
            globeGroup.add(core);

            // Wireframe
            const wireMat = new THREE.MeshBasicMaterial({
                color: 0x233dfe, wireframe: true,
                transparent: true, opacity: 0.12,
            });
            const wire = new THREE.Mesh(new THREE.SphereGeometry(1.44, 28, 28), wireMat);
            globeGroup.add(wire);

            // Atmosphere glow
            const atmMat = new THREE.MeshBasicMaterial({
                color: 0x233dfe, transparent: true, opacity: 0.08, side: THREE.BackSide,
            });
            const atm = new THREE.Mesh(new THREE.SphereGeometry(1.68, 64, 64), atmMat);
            globeGroup.add(atm);

            // Spikes
            const SPIKE_COUNT = 300;
            const spikes = [];
            const spikeColors = [
                new THREE.Color(0xff6620), new THREE.Color(0xffd700),
                new THREE.Color(0x233dfe), new THREE.Color(0x00e5ff),
                new THREE.Color(0xff3300), new THREE.Color(0x00ffcc),
            ];

            for (let i = 0; i < SPIKE_COUNT; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 1.44;
                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(phi);

                const origin = new THREE.Vector3(x, y, z);
                const normal = origin.clone().normalize();
                const height = 0.04 + Math.random() * Math.random() * 2.0;
                const color = spikeColors[Math.floor(Math.random() * spikeColors.length)];
                const w = 0.006 + Math.random() * 0.008;

                const geo = new THREE.BoxGeometry(w, height, w);
                geo.translate(0, height / 2, 0);
                const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
                const spike = new THREE.Mesh(geo, mat);
                spike.position.copy(origin);

                const up = new THREE.Vector3(0, 1, 0);
                spike.setRotationFromQuaternion(
                    new THREE.Quaternion().setFromUnitVectors(up, normal)
                );
                spike.userData = {
                    origin: origin.clone(), normal: normal.clone(),
                    phase: Math.random() * Math.PI * 2,
                    baseHeight: height,
                    scatterDir: normal.clone().multiplyScalar(3 + Math.random() * 5),
                    rotSpeed: (Math.random() - 0.5) * 3,
                };
                globeGroup.add(spike);
                spikes.push(spike);
            }

            // ═══════════════════════════════════════════════════════
            // LAYER 2: NEURAL NETWORK nodes + edges
            // ═══════════════════════════════════════════════════════
            const networkGroup = new THREE.Group();
            networkGroup.visible = false;
            scene.add(networkGroup);

            const NODE_COUNT = 120;
            const nodePositions = [];
            const nodeMeshes = [];

            for (let i = 0; i < NODE_COUNT; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 1.5 + Math.random() * 3.5;
                const pos = new THREE.Vector3(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                );
                nodePositions.push(pos);

                const nMat = new THREE.MeshBasicMaterial({
                    color: Math.random() > 0.6 ? 0x233dfe : 0x00e5ff,
                    transparent: true, opacity: 0.0,
                });
                const size = 0.02 + Math.random() * 0.04;
                const nMesh = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 8), nMat);
                nMesh.position.copy(pos);
                nMesh.userData = { basePos: pos.clone(), phase: Math.random() * Math.PI * 2 };
                networkGroup.add(nMesh);
                nodeMeshes.push(nMesh);
            }

            // Edges between nearby nodes
            const edgeMaterials = [];
            const MAX_DIST = 2.2;
            for (let i = 0; i < NODE_COUNT; i++) {
                for (let j = i + 1; j < NODE_COUNT; j++) {
                    if (nodePositions[i].distanceTo(nodePositions[j]) < MAX_DIST) {
                        const points = [nodePositions[i], nodePositions[j]];
                        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
                        const lineMat = new THREE.LineBasicMaterial({
                            color: 0x233dfe, transparent: true, opacity: 0.0,
                        });
                        const line = new THREE.Line(lineGeo, lineMat);
                        networkGroup.add(line);
                        edgeMaterials.push(lineMat);
                    }
                }
            }

            // ═══════════════════════════════════════════════════════
            // LAYER 3: PARTICLE VORTEX (warp tunnel)
            // ═══════════════════════════════════════════════════════
            const vortexGroup = new THREE.Group();
            vortexGroup.visible = false;
            scene.add(vortexGroup);

            const VORTEX_COUNT = 1800;
            const vortexPositions = new Float32Array(VORTEX_COUNT * 3);
            const vortexData = [];

            for (let i = 0; i < VORTEX_COUNT; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 0.3 + Math.random() * 4.5;
                const z = (Math.random() - 0.5) * 18;
                vortexPositions[i * 3] = Math.cos(angle) * radius;
                vortexPositions[i * 3 + 1] = Math.sin(angle) * radius;
                vortexPositions[i * 3 + 2] = z;
                vortexData.push({
                    angle, radius, z,
                    speed: 0.3 + Math.random() * 1.2,
                    zSpeed: 0.02 + Math.random() * 0.06,
                });
            }

            const vortexGeo = new THREE.BufferGeometry();
            const vortexPosAttr = new THREE.BufferAttribute(vortexPositions, 3);
            vortexGeo.setAttribute("position", vortexPosAttr);
            const vortexMat = new THREE.PointsMaterial({
                color: 0x233dfe, size: 0.025,
                transparent: true, opacity: 0.0,
                sizeAttenuation: true,
            });
            const vortex = new THREE.Points(vortexGeo, vortexMat);
            vortexGroup.add(vortex);

            // Streaks — bright blue lines flying toward camera
            const STREAK_COUNT = 120;
            const streakLines = [];
            for (let i = 0; i < STREAK_COUNT; i++) {
                const angle = Math.random() * Math.PI * 2;
                const r = 0.1 + Math.random() * 3.5;
                const z = (Math.random() - 0.5) * 16;
                const length = 0.15 + Math.random() * 0.6;
                const pts = [
                    new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z),
                    new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z + length),
                ];
                const sGeo = new THREE.BufferGeometry().setFromPoints(pts);
                const sMat = new THREE.LineBasicMaterial({
                    color: Math.random() > 0.5 ? 0x233dfe : 0x00e5ff,
                    transparent: true, opacity: 0.0,
                });
                const streak = new THREE.Line(sGeo, sMat);
                streak.userData = {
                    angle, r, z, length,
                    speed: 0.04 + Math.random() * 0.12,
                };
                vortexGroup.add(streak);
                streakLines.push(streak);
            }

            // ═══════════════════════════════════════════════════════
            // LAYER 4: DEEP SPACE starfield + nebula clouds
            // ═══════════════════════════════════════════════════════
            const spaceGroup = new THREE.Group();
            spaceGroup.visible = false;
            scene.add(spaceGroup);

            const STAR_COUNT = 3000;
            const starPos = new Float32Array(STAR_COUNT * 3);
            const starColors = new Float32Array(STAR_COUNT * 3);
            const starOriginalColors = new Float32Array(STAR_COUNT * 3); // Store original colors
            const starData = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 8 + Math.random() * 30;
                starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                starPos[i * 3 + 2] = r * Math.cos(phi);

                // Color variation: white, blue-white, warm-gold
                const rnd = Math.random();
                let rCol, gCol, bCol;
                if (rnd > 0.7) {
                    rCol = 0.5; gCol = 0.6; bCol = 1.0;
                } else if (rnd > 0.4) {
                    rCol = 1.0; gCol = 0.95; bCol = 0.85;
                } else {
                    rCol = 0.85; gCol = 0.85; bCol = 1.0;
                }
                starColors[i * 3] = rCol;
                starColors[i * 3 + 1] = gCol;
                starColors[i * 3 + 2] = bCol;

                starOriginalColors[i * 3] = rCol;
                starOriginalColors[i * 3 + 1] = gCol;
                starOriginalColors[i * 3 + 2] = bCol;

                starData.push({ phase: Math.random() * Math.PI * 2 });
            }
            const starGeo = new THREE.BufferGeometry();
            starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
            starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
            const starMat = new THREE.PointsMaterial({
                vertexColors: true,
                size: 0.06, transparent: true, opacity: 0.0, sizeAttenuation: true,
            });
            const stars = new THREE.Points(starGeo, starMat);
            spaceGroup.add(stars);

            // Nebula cloud rings
            const NEBULA_RING_COUNT = 6;
            const nebulaRings = [];
            for (let n = 0; n < NEBULA_RING_COUNT; n++) {
                const ringCount = 200 + Math.floor(Math.random() * 300);
                const ringPositions = new Float32Array(ringCount * 3);
                const cx = (Math.random() - 0.5) * 20;
                const cy = (Math.random() - 0.5) * 12;
                const cz = -10 - Math.random() * 20;
                const ringR = 3 + Math.random() * 8;
                for (let i = 0; i < ringCount; i++) {
                    const a = (i / ringCount) * Math.PI * 2;
                    const spread = (Math.random() - 0.5) * ringR * 0.7;
                    ringPositions[i * 3] = cx + (Math.cos(a) * ringR + spread);
                    ringPositions[i * 3 + 1] = cy + (Math.sin(a) * ringR + spread) * 0.4;
                    ringPositions[i * 3 + 2] = cz + (Math.random() - 0.5) * 4;
                }
                const rGeo = new THREE.BufferGeometry();
                rGeo.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
                const blueShift = Math.random();
                const rMat = new THREE.PointsMaterial({
                    color: blueShift > 0.5 ? 0x233dfe : (blueShift > 0.25 ? 0x00e5ff : 0xff6620),
                    size: 0.04, transparent: true, opacity: 0.0, sizeAttenuation: true,
                });
                const ring = new THREE.Points(rGeo, rMat);
                spaceGroup.add(ring);
                nebulaRings.push({ mesh: ring, mat: rMat, rotSpeed: (Math.random() - 0.5) * 0.003 });
            }

            // ═══════════════════════════════════════════════════════
            // Ambient floating particles (always present, fade in/out)
            // ═══════════════════════════════════════════════════════
            const FLOAT_COUNT = 600;
            const floatPos = new Float32Array(FLOAT_COUNT * 3);
            const floatData = [];
            for (let i = 0; i < FLOAT_COUNT; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 1.8 + Math.random() * 5;
                floatPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                floatPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                floatPos[i * 3 + 2] = r * Math.cos(phi);
                floatData.push({ phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.6 });
            }
            const floatGeo = new THREE.BufferGeometry();
            floatGeo.setAttribute("position", new THREE.BufferAttribute(floatPos, 3));
            const floatMat = new THREE.PointsMaterial({
                color: 0x4466ff, size: 0.018, transparent: true, opacity: 0.3,
            });
            const floatParticles = new THREE.Points(floatGeo, floatMat);
            scene.add(floatParticles);

            // ── Utilities ─────────────────────────────────────────
            const lerp = (a, b, t) => a + (b - a) * t;
            const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

            // Smoothed global scroll progress
            let smoothGT = 0;

            // ── Scroll / Resize listeners ─────────────────────────
            const onScroll = () => { scrollY = window.scrollY; };
            const onResize = () => {
                const w = window.innerWidth, h = window.innerHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onResize);

            // ── Clock ─────────────────────────────────────────────
            const clock = new THREE.Clock();

            // ── Animation ─────────────────────────────────────────
            const animate = () => {
                animId = requestAnimationFrame(animate);
                const t = clock.getElapsedTime();

                // Global scroll progress 0→1
                const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
                const rawGT = clamp(scrollY / maxScroll, 0, 1);
                smoothGT += (rawGT - smoothGT) * 0.035;
                const gt = smoothGT;

                // Phase boundaries: 0-0.15 | 0.15-0.35 | 0.35-0.55 | 0.55-0.75 | 0.75-1.0
                const toPhase = (gt, lo, hi) => clamp((gt - lo) / (hi - lo), 0, 1);

                const p0 = 1 - easeInOut(toPhase(gt, 0.0, 0.20));   // globe presence
                const p1 = easeInOut(toPhase(gt, 0.15, 0.38));       // network fade in
                const p1out = 1 - easeInOut(toPhase(gt, 0.38, 0.52)); // network fade out
                const p2 = easeInOut(toPhase(gt, 0.45, 0.62));       // vortex
                const p2out = 1 - easeInOut(toPhase(gt, 0.62, 0.72));
                const p3 = easeInOut(toPhase(gt, 0.68, 0.82));       // deep space

                const networkAlpha = Math.min(p1, p1out);
                const vortexAlpha = Math.min(p2, p2out);
                const spaceAlpha = p3;

                // ── Scene background color shift ─────────────────
                const bgColor = new THREE.Color();
                if (gt < 0.35) {
                    bgColor.setHex(0x05091a); // deep navy
                } else if (gt < 0.62) {
                    // Shift toward very dark teal for vortex
                    bgColor.lerpColors(new THREE.Color(0x05091a), new THREE.Color(0x020d1a), vortexAlpha);
                } else {
                    // Deep black for space
                    bgColor.lerpColors(new THREE.Color(0x020d1a), new THREE.Color(0x000005), spaceAlpha);
                }
                renderer.setClearColor(bgColor);

                // ══════════════════════════════════════════════════
                // PHASE 0: GLOBE
                // ══════════════════════════════════════════════════
                const globeVisible = p0 > 0.01;
                globeGroup.visible = globeVisible;

                if (globeVisible) {
                    const gs = p0;
                    const spinSlowdown = 1 - (1 - gs) * 0.6;

                    core.rotation.y = t * 0.10 * spinSlowdown;
                    wire.rotation.y = t * 0.07 * spinSlowdown;
                    atm.rotation.y = t * 0.05;
                    globeGroup.rotation.x = Math.sin(t * 0.08) * 0.06;

                    const globeScale = lerp(0.85, 1.0, gs);
                    core.scale.setScalar(globeScale);
                    wire.scale.setScalar(globeScale);

                    coreMat.opacity = lerp(0, 0.96, gs);
                    wireMat.opacity = lerp(0, 0.12, gs);
                    atmMat.opacity = lerp(0, 0.08, gs);

                    // Spikes pulse and then scatter outward as globe fades
                    const scatterT = easeInOut(toPhase(gt, 0.08, 0.22));
                    spikes.forEach((spike) => {
                        const ud = spike.userData;
                        const pulse = 1 + 0.07 * Math.sin(t * 1.4 + ud.phase);
                        spike.position.copy(ud.origin)
                            .addScaledVector(ud.normal, scatterT * 5 * (0.4 + Math.random() * 0.0));

                        const spikeOpacity = lerp(0.9, 0, scatterT * scatterT);
                        spike.material.opacity = Math.max(0, spikeOpacity * (0.85 + 0.15 * Math.sin(t * 3 + ud.phase)));
                        spike.scale.y = 1 + scatterT * 3 * pulse;
                    });
                }

                // ══════════════════════════════════════════════════
                // PHASE 1: NEURAL NETWORK
                // ══════════════════════════════════════════════════
                networkGroup.visible = networkAlpha > 0.01;
                if (networkGroup.visible) {
                    nodeMeshes.forEach((nm, i) => {
                        nm.material.opacity = lerp(0, 0.85, networkAlpha);
                        // Gentle float
                        const ud = nm.userData;
                        const drift = 0.06 * Math.sin(t * 0.7 + ud.phase);
                        nm.position.copy(ud.basePos);
                        nm.position.x += drift;
                        nm.position.y += drift * 0.7;
                    });
                    edgeMaterials.forEach((em) => {
                        em.opacity = lerp(0, 0.18, networkAlpha);
                    });
                    // Slowly rotate the network
                    networkGroup.rotation.y = t * 0.04;
                    networkGroup.rotation.x = Math.sin(t * 0.025) * 0.15;
                }

                // ══════════════════════════════════════════════════
                // PHASE 2: VORTEX / WARP TUNNEL
                // ══════════════════════════════════════════════════
                vortexGroup.visible = vortexAlpha > 0.01;
                if (vortexGroup.visible) {
                    vortexMat.opacity = lerp(0, 0.65, vortexAlpha);
                    vortexMat.color.setHex(0x233dfe);

                    const vPA = vortexGeo.attributes.position.array;
                    for (let i = 0; i < VORTEX_COUNT; i++) {
                        const d = vortexData[i];
                        d.angle += d.speed * 0.012;
                        d.z += d.zSpeed;
                        if (d.z > 9) d.z = -9;

                        const warp = 1 + 0.3 * Math.sin(d.z * 0.4 + t);
                        vPA[i * 3] = Math.cos(d.angle) * d.radius * warp;
                        vPA[i * 3 + 1] = Math.sin(d.angle) * d.radius * warp;
                        vPA[i * 3 + 2] = d.z;
                    }
                    vortexGeo.attributes.position.needsUpdate = true;

                    // Animate streaks flying toward viewer
                    streakLines.forEach((streak) => {
                        const ud = streak.userData;
                        ud.z += ud.speed;
                        if (ud.z > 9) ud.z = -9;

                        const pts = streak.geometry.attributes.position.array;
                        pts[2] = ud.z;
                        pts[5] = ud.z + ud.length;
                        streak.geometry.attributes.position.needsUpdate = true;
                        streak.material.opacity = lerp(0, 0.55, vortexAlpha) * (0.5 + 0.5 * Math.abs(ud.z / 9));
                    });

                    // Camera z-drift for warp feel
                    camera.position.z = lerp(7, 5.5, vortexAlpha);
                }

                // ══════════════════════════════════════════════════
                // PHASE 3: DEEP SPACE
                // ══════════════════════════════════════════════════
                spaceGroup.visible = spaceAlpha > 0.01;
                if (spaceGroup.visible) {
                    starMat.opacity = lerp(0, 0.75, spaceAlpha);

                    // Twinkle — use original colors as base, apply modulation
                    const sColors = starGeo.attributes.color.array;
                    starData.forEach((sd, i) => {
                        const twinkle = 0.6 + 0.4 * Math.sin(t * (1.5 + sd.phase % 1.5) + sd.phase);
                        // Apply twinkle to original colors
                        sColors[i * 3] = starOriginalColors[i * 3] * (0.9 + 0.1 * twinkle);
                        sColors[i * 3 + 1] = starOriginalColors[i * 3 + 1] * (0.9 + 0.1 * twinkle);
                        sColors[i * 3 + 2] = starOriginalColors[i * 3 + 2] * (0.9 + 0.1 * twinkle);
                    });
                    starGeo.attributes.color.needsUpdate = true;

                    // Nebula rings rotate and fade in
                    nebulaRings.forEach((nr) => {
                        nr.mesh.rotation.z += nr.rotSpeed;
                        nr.mat.opacity = lerp(0, 0.22, spaceAlpha);
                    });

                    stars.rotation.y = t * 0.008;
                    stars.rotation.x = t * 0.004;
                    camera.position.z = lerp(7, 9, spaceAlpha);
                }

                // ══════════════════════════════════════════════════
                // FLOATING PARTICLES (always on, gentle)
                // ══════════════════════════════════════════════════
                const targetFloatOpacity = gt < 0.45 ? 0.3 : gt < 0.7 ? 0.15 : 0.08;
                floatMat.opacity += (targetFloatOpacity - floatMat.opacity) * 0.05;
                floatParticles.rotation.y = t * 0.018;
                floatParticles.rotation.x = t * 0.009;

                // ── Light animation ───────────────────────────────
                light1.position.x = 5 * Math.cos(t * 0.25);
                light1.position.z = 5 * Math.sin(t * 0.25) + 3;
                light1.intensity = lerp(10, 3, gt) * (0.85 + 0.15 * Math.sin(t * 4));

                light2.position.x = -4 * Math.cos(t * 0.18);
                light2.intensity = lerp(7, 2, gt) * (0.85 + 0.15 * Math.sin(t * 3 + 1));

                light3.position.x = 3 * Math.sin(t * 0.3);
                light3.intensity = lerp(4, 8, spaceAlpha);

                // ── Camera drift ──────────────────────────────────
                if (vortexAlpha < 0.1 && spaceAlpha < 0.1) {
                    // Subtle orbital during globe/network
                    camera.position.x = Math.sin(t * 0.06) * 0.25;
                    camera.position.y = Math.cos(t * 0.05) * 0.15;
                    if (vortexAlpha < 0.1) camera.position.z = lerp(7, 7, 1);
                }

                renderer.render(scene, camera);
            };

            animate();

            // Store cleanup on mount ref
            if (mountRef.current) {
                mountRef.current._cleanup = () => {
                    cancelAnimationFrame(animId);
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("resize", onResize);
                    renderer.dispose();
                };
            }
        };

        init();

        return () => {
            if (mountRef.current) {
                mountRef.current._cleanup?.();
                mountRef.current.querySelector?.("canvas")?.remove();
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        />
    );
}