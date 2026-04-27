import { useEffect, useRef } from "react";


export default function BgAnimation() {
    const mountRef = useRef(null);

    useEffect(() => {
        let renderer, scene, camera, animId;
        let scrollY = 0;
        let smoothScatter = 0;

        const init = async () => {
            const THREE = await import("three");

            const W = window.innerWidth;
            const H = window.innerHeight;

            // ── Renderer ──────────────────────────────────────────
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(W, H);
            renderer.setClearColor(0x020914, 1);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.5;
            if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

            // ── Scene & Camera ────────────────────────────────────
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 500);
            camera.position.set(0, 0, 8);

            // ── Helpers ───────────────────────────────────────────
            const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
            const lerp = (a, b, t) => a + (b - a) * t;
            const easeOut = (t) => 1 - Math.pow(1 - t, 4);
            const easeIn = (t) => t * t * t;
            const PI2 = Math.PI * 2;

            // ── Brand Colors ──────────────────────────────────────
            const C_BLUE = 0x233dfe;   // Dott Ciblez brand blue
            const C_CYAN = 0x00e5ff;   // electric cyan
            const C_WHITE = 0xffffff;
            const C_TEAL = 0x00c8d4;   // mid teal
            const C_INDIGO = 0x4455ff;   // softer blue
            const C_ORANGE = 0xff6820;   // accent spark

            const coreGroup = new THREE.Group();
            scene.add(coreGroup);

            const coreInner = new THREE.Mesh(
                new THREE.SphereGeometry(0.28, 32, 32),
                new THREE.MeshBasicMaterial({ color: C_WHITE, transparent: true, opacity: 1.0 })
            );
            const coreMid = new THREE.Mesh(
                new THREE.SphereGeometry(0.50, 32, 32),
                new THREE.MeshBasicMaterial({ color: C_CYAN, transparent: true, opacity: 0.55, side: THREE.BackSide })
            );
            const coreOuter = new THREE.Mesh(
                new THREE.SphereGeometry(0.90, 32, 32),
                new THREE.MeshBasicMaterial({ color: C_BLUE, transparent: true, opacity: 0.18, side: THREE.BackSide })
            );
            const coreAtm = new THREE.Mesh(
                new THREE.SphereGeometry(1.5, 32, 32),
                new THREE.MeshBasicMaterial({ color: C_BLUE, transparent: true, opacity: 0.05, side: THREE.BackSide })
            );
            coreGroup.add(coreInner, coreMid, coreOuter, coreAtm);

            const coreScatterTo = new THREE.Vector3(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 20,
                8 + Math.random() * 10
            );

            // ════════════════════════════════════════════════════
            // 2. DNA / DATA HELIX STREAMS
            //    Two counter-rotating helices of particles — like
            //    data flowing through fiber optic cables
            // ════════════════════════════════════════════════════
            const DNA_COUNT = 280;   // per strand
            const DNA_STRANDS = 2;
            const helixGroups = [];

            for (let s = 0; s < DNA_STRANDS; s++) {
                const pos = new Float32Array(DNA_COUNT * 3);
                const data = [];
                const phaseOffset = s * Math.PI; // 180° apart

                for (let i = 0; i < DNA_COUNT; i++) {
                    const t0 = (i / DNA_COUNT) * PI2 * 4; // 4 full turns
                    const radius = 1.2 + 0.15 * Math.sin(t0 * 2);
                    const z = lerp(-9, 9, i / DNA_COUNT);
                    const bx = Math.cos(t0 + phaseOffset) * radius;
                    const by = Math.sin(t0 + phaseOffset) * radius;

                    pos[i * 3] = bx;
                    pos[i * 3 + 1] = by;
                    pos[i * 3 + 2] = z;

                    data.push({
                        t0, radius, z, bx, by,
                        phase: t0 + phaseOffset,
                        zOffset: 0,
                        scatterX: bx * (5 + Math.random() * 4) + (Math.random() - 0.5) * 8,
                        scatterY: by * (5 + Math.random() * 4) + (Math.random() - 0.5) * 8,
                        scatterZ: z * 1.5 + (Math.random() - 0.5) * 6,
                    });
                }

                const geo = new THREE.BufferGeometry();
                geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

                const mat = new THREE.PointsMaterial({
                    color: s === 0 ? C_CYAN : C_BLUE,
                    size: 0.032,
                    transparent: true,
                    opacity: 0.85,
                    sizeAttenuation: true,
                });

                const pts = new THREE.Points(geo, mat);
                scene.add(pts);
                helixGroups.push({ geo, mat, data, pos, strand: s, baseOpacity: 0.85 });
            }

            // Helix cross-links (bridge segments between the two strands)
            const LINK_COUNT = 40;
            const linkLines = [];
            for (let i = 0; i < LINK_COUNT; i++) {
                const frac = i / LINK_COUNT;
                const t0 = frac * PI2 * 4;
                const radius = 1.2;
                const z = lerp(-9, 9, frac);

                const ax = Math.cos(t0) * radius;
                const ay = Math.sin(t0) * radius;
                const bx = Math.cos(t0 + Math.PI) * radius;
                const by = Math.sin(t0 + Math.PI) * radius;

                const pts = [new THREE.Vector3(ax, ay, z), new THREE.Vector3(bx, by, z)];
                const geo = new THREE.BufferGeometry().setFromPoints(pts);
                const mat = new THREE.LineBasicMaterial({
                    color: C_TEAL, transparent: true, opacity: 0.22,
                });
                const line = new THREE.Line(geo, mat);
                linkLines.push({
                    line, mat, ax, ay, bx, by, z, t0,
                    scatterAX: ax * 5, scatterAY: ay * 5,
                    scatterBX: bx * 5, scatterBY: by * 5,
                    scatterZ: z * 1.5,
                });
                scene.add(line);
            }

            // ════════════════════════════════════════════════════
            // 3. VORTEX TUNNEL — 3 concentric particle rings
            //    The warp-speed cylinder from Phase 3
            // ════════════════════════════════════════════════════
            const tunnelRings = [
                { count: 600, rMin: 0.1, rMax: 1.2, color: C_CYAN, size: 0.020, zR: 14, baseOp: 0.75, speedMul: 1.5 },
                { count: 800, rMin: 1.0, rMax: 2.8, color: C_BLUE, size: 0.016, zR: 20, baseOp: 0.65, speedMul: 1.0 },
                { count: 420, rMin: 2.5, rMax: 4.8, color: C_INDIGO, size: 0.013, zR: 26, baseOp: 0.45, speedMul: 0.7 },
            ];
            const tData = [], tMats = [], tGeos = [];

            tunnelRings.forEach((ring, ri) => {
                const N = ring.count;
                const pos = new Float32Array(N * 3);
                const dat = [];

                for (let i = 0; i < N; i++) {
                    const angle = Math.random() * PI2;
                    const radius = ring.rMin + Math.random() * (ring.rMax - ring.rMin);
                    const z = (Math.random() - 0.5) * ring.zR;
                    const bx = Math.cos(angle) * radius;
                    const by = Math.sin(angle) * radius;
                    pos[i * 3] = bx; pos[i * 3 + 1] = by; pos[i * 3 + 2] = z;
                    dat.push({
                        angle, radius, z, zHalf: ring.zR / 2,
                        speed: (0.25 + Math.random() * 0.9) * ring.speedMul,
                        zSpeed: 0.012 + Math.random() * 0.048,
                        scatterX: bx * (5 + Math.random() * 5) + (Math.random() - 0.5) * 12,
                        scatterY: by * (5 + Math.random() * 5) + (Math.random() - 0.5) * 12,
                        scatterZ: z * (2 + Math.random()) + (Math.random() - 0.5) * 8,
                    });
                }

                const geo = new THREE.BufferGeometry();
                geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
                const mat = new THREE.PointsMaterial({
                    color: ring.color, size: ring.size,
                    transparent: true, opacity: ring.baseOp, sizeAttenuation: true,
                });
                scene.add(new THREE.Points(geo, mat));
                tData.push(dat); tMats.push({ mat, baseOp: ring.baseOp }); tGeos.push(geo);
            });

            // ════════════════════════════════════════════════════
            // 4. HYPERSPACE STREAKS — high-speed light lines
            //    Brand colors: blue, cyan, white, with varied length
            // ════════════════════════════════════════════════════
            const STREAK_N = 200;
            const streaks = [];
            const sColPool = [C_BLUE, C_CYAN, C_WHITE, C_TEAL, C_INDIGO];

            for (let i = 0; i < STREAK_N; i++) {
                const angle = Math.random() * PI2;
                const r = 0.05 + Math.random() * 4.5;
                const z = (Math.random() - 0.5) * 20;
                const length = 0.08 + Math.random() * 1.1;
                const bx = Math.cos(angle) * r;
                const by = Math.sin(angle) * r;

                const pts = [new THREE.Vector3(bx, by, z), new THREE.Vector3(bx, by, z + length)];
                const geo = new THREE.BufferGeometry().setFromPoints(pts);
                const mat = new THREE.LineBasicMaterial({
                    color: sColPool[Math.floor(Math.random() * sColPool.length)],
                    transparent: true, opacity: 0.6,
                });
                const line = new THREE.Line(geo, mat);
                line.userData = {
                    bx, by, z, length, angle, r,
                    speed: 0.04 + Math.random() * 0.18,
                    baseOp: 0.38 + Math.random() * 0.45,
                    scatterX: bx * (7 + Math.random() * 5) + (Math.random() - 0.5) * 10,
                    scatterY: by * (7 + Math.random() * 5) + (Math.random() - 0.5) * 10,
                    scatterZ: z * 2 + (Math.random() - 0.5) * 12,
                };
                scene.add(line);
                streaks.push(line);
            }

            // ════════════════════════════════════════════════════
            // 5. CONCENTRIC TECH ORBIT RINGS
            //    5 glowing rings rotating at different speeds/angles
            // ════════════════════════════════════════════════════
            const orbitData = [
                { r: 1.5, color: C_CYAN, op: 0.50, tiltX: 0.30, rotZ: 0.0050 },
                { r: 2.4, color: C_BLUE, op: 0.32, tiltX: 0.55, rotZ: 0.0035 },
                { r: 3.4, color: C_INDIGO, op: 0.22, tiltX: 0.75, rotZ: -0.0025 },
                { r: 4.5, color: C_BLUE, op: 0.14, tiltX: 1.00, rotZ: 0.0018 },
                { r: 6.0, color: C_ORANGE, op: 0.08, tiltX: 1.20, rotZ: -0.0012 },
            ];
            const orbitRings = [];

            orbitData.forEach((od) => {
                const segs = 128;
                const pts = [];
                for (let i = 0; i <= segs; i++) {
                    const a = (i / segs) * PI2;
                    pts.push(new THREE.Vector3(Math.cos(a) * od.r, Math.sin(a) * od.r, 0));
                }
                const geo = new THREE.BufferGeometry().setFromPoints(pts);
                const mat = new THREE.LineBasicMaterial({
                    color: od.color, transparent: true, opacity: od.op,
                });
                const ring = new THREE.LineLoop(geo, mat);
                ring.rotation.x = od.tiltX;
                scene.add(ring);
                orbitRings.push({ mesh: ring, mat, baseOp: od.op, rotZ: od.rotZ, r: od.r });
            });

            // ════════════════════════════════════════════════════
            // 6. MICRO-DOT CLOUD — 400 tiny orbiting brand particles
            //    They create a soft haze around the whole scene
            // ════════════════════════════════════════════════════
            const MICRO_N = 400;
            const microPos = new Float32Array(MICRO_N * 3);
            const microDat = [];

            for (let i = 0; i < MICRO_N; i++) {
                const theta = Math.random() * PI2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 2.5 + Math.random() * 5.5;
                const bx = r * Math.sin(phi) * Math.cos(theta);
                const by = r * Math.sin(phi) * Math.sin(theta);
                const bz = r * Math.cos(phi);
                microPos[i * 3] = bx; microPos[i * 3 + 1] = by; microPos[i * 3 + 2] = bz;
                microDat.push({
                    bx, by, bz, phase: Math.random() * PI2,
                    orbitSpeed: 0.003 + Math.random() * 0.008,
                    scatterX: bx * 3 + (Math.random() - 0.5) * 10,
                    scatterY: by * 3 + (Math.random() - 0.5) * 10,
                    scatterZ: bz * 2,
                });
            }
            const microGeo = new THREE.BufferGeometry();
            microGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(microPos), 3));
            const microMat = new THREE.PointsMaterial({
                color: C_BLUE, size: 0.028, transparent: true, opacity: 0.35, sizeAttenuation: true,
            });
            const microCloud = new THREE.Points(microGeo, microMat);
            scene.add(microCloud);

            // ════════════════════════════════════════════════════
            // SCROLL CONFIG — scatter starts at exactly 500px
            // ════════════════════════════════════════════════════
            const SCATTER_START = 500;    // px — fully assembled until here
            const SCATTER_END = 1800;   // px — fully scattered here

            const onScroll = () => { scrollY = window.scrollY; };
            const onResize = () => {
                const w = window.innerWidth, h = window.innerHeight;
                camera.aspect = w / h; camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onResize);

            const clock = new THREE.Clock();

            // ════════════════════════════════════════════════════
            // ANIMATION LOOP
            // ════════════════════════════════════════════════════
            const animate = () => {
                animId = requestAnimationFrame(animate);
                const t = clock.getElapsedTime();

                // ── Scatter 0→1 (starts at 500px, ends at 1600px) ─
                const rawSc = clamp((scrollY - SCATTER_START) / (SCATTER_END - SCATTER_START), 0, 1);
                smoothScatter += (rawSc - smoothScatter) * 0.05;
                const sc = smoothScatter;
                const scE = easeOut(sc);          // position lerp
                const assE = 1 - easeIn(sc);       // opacity fade
                const assembled = 1 - sc;

                // ══════════════════════════════════════════════
                // 1. CENTRAL ORB
                // ══════════════════════════════════════════════
                const pulse = 0.82 + 0.18 * Math.sin(t * 4.2);
                const breathe = 0.92 + 0.08 * Math.sin(t * 1.8);
                coreInner.scale.setScalar(pulse);
                coreMid.scale.setScalar(breathe * (1 + 0.1 * Math.sin(t * 2.5)));
                coreOuter.scale.setScalar(breathe);
                coreAtm.scale.setScalar(1 + 0.05 * Math.sin(t * 1.2));

                coreInner.material.opacity = 1.0 * assE * pulse;
                coreMid.material.opacity = 0.55 * assE * breathe;
                coreOuter.material.opacity = 0.18 * assE;
                coreAtm.material.opacity = 0.05 * assE;

                // Gentle bob
                coreGroup.position.x = lerp(0, coreScatterTo.x, scE);
                coreGroup.position.y = lerp(Math.sin(t * 0.7) * 0.05, coreScatterTo.y, scE);
                coreGroup.position.z = lerp(0, coreScatterTo.z, scE);
                coreGroup.rotation.y = t * 0.4;

                // ══════════════════════════════════════════════
                // 2. DNA HELIX
                // ══════════════════════════════════════════════
                helixGroups.forEach(({ geo, mat, data, strand, baseOpacity }) => {
                    const pos = geo.attributes.position.array;
                    const dir = strand === 0 ? 1 : -1;
                    const phaseOffset = strand * Math.PI;

                    data.forEach((d, i) => {
                        // Helix rotates over time
                        const currentAngle = d.t0 + phaseOffset + t * 0.35 * dir;
                        const warpR = d.radius * (1 + 0.12 * Math.sin(d.z * 0.4 + t));
                        const lx = Math.cos(currentAngle) * warpR;
                        const ly = Math.sin(currentAngle) * warpR;

                        pos[i * 3] = lerp(lx, lx + d.scatterX, scE);
                        pos[i * 3 + 1] = lerp(ly, ly + d.scatterY, scE);
                        pos[i * 3 + 2] = lerp(d.z, d.z + d.scatterZ, scE);
                    });
                    geo.attributes.position.needsUpdate = true;

                    const helixPulse = 0.80 + 0.20 * Math.sin(t * 1.6 + strand * 1.5);
                    mat.opacity = baseOpacity * assE * helixPulse;
                });

                // DNA cross-links rotate with helix
                linkLines.forEach(({ line, mat, t0, ax, ay, bx, by, z,
                    scatterAX, scatterAY, scatterBX, scatterBY, scatterZ }) => {
                    const rot = t * 0.35;
                    const r = 1.2;
                    const lax = Math.cos(t0 + rot) * r;
                    const lay = Math.sin(t0 + rot) * r;
                    const lbx = Math.cos(t0 + rot + Math.PI) * r;
                    const lby = Math.sin(t0 + rot + Math.PI) * r;
                    const arr = line.geometry.attributes.position.array;
                    arr[0] = lerp(lax, lax + scatterAX, scE);
                    arr[1] = lerp(lay, lay + scatterAY, scE);
                    arr[2] = lerp(z, z + scatterZ, scE);
                    arr[3] = lerp(lbx, lbx + scatterBX, scE);
                    arr[4] = lerp(lby, lby + scatterBY, scE);
                    arr[5] = arr[2];
                    line.geometry.attributes.position.needsUpdate = true;
                    mat.opacity = 0.22 * assE;
                });

                // ══════════════════════════════════════════════
                // 3. VORTEX TUNNEL
                // ══════════════════════════════════════════════
                tunnelRings.forEach((ring, ri) => {
                    const dat = tData[ri];
                    const geo = tGeos[ri];
                    const { mat, baseOp } = tMats[ri];
                    const pos = geo.attributes.position.array;

                    for (let i = 0; i < ring.count; i++) {
                        const d = dat[i];
                        d.angle += d.speed * 0.010 * assembled;
                        d.z += d.zSpeed * assembled;
                        if (d.z > d.zHalf) d.z = -d.zHalf;

                        const warp = 1 + 0.20 * Math.sin(d.z * 0.32 + t + ri * 1.4);
                        const lx = Math.cos(d.angle) * d.radius * warp;
                        const ly = Math.sin(d.angle) * d.radius * warp;
                        pos[i * 3] = lerp(lx, lx + d.scatterX, scE);
                        pos[i * 3 + 1] = lerp(ly, ly + d.scatterY, scE);
                        pos[i * 3 + 2] = lerp(d.z, d.z + d.scatterZ, scE);
                    }
                    geo.attributes.position.needsUpdate = true;

                    const ringPulse = 0.85 + 0.15 * Math.sin(t * 2.0 + ri * 2.4);
                    mat.opacity = baseOp * assE * ringPulse;
                });

                // ══════════════════════════════════════════════
                // 4. STREAKS
                // ══════════════════════════════════════════════
                streaks.forEach((streak) => {
                    const ud = streak.userData;
                    ud.z += ud.speed * assembled;
                    if (ud.z > 10) ud.z = -10;

                    const arr = streak.geometry.attributes.position.array;
                    arr[0] = lerp(ud.bx, ud.bx + ud.scatterX, scE);
                    arr[1] = lerp(ud.by, ud.by + ud.scatterY, scE);
                    arr[2] = lerp(ud.z, ud.z + ud.scatterZ, scE);
                    arr[3] = arr[0]; arr[4] = arr[1];
                    arr[5] = lerp(ud.z + ud.length, ud.z + ud.length + ud.scatterZ, scE);
                    streak.geometry.attributes.position.needsUpdate = true;

                    const depth = clamp((ud.z + 10) / 20, 0, 1);
                    streak.material.opacity = ud.baseOp * assE * (0.3 + 0.7 * depth);
                });

                // ══════════════════════════════════════════════
                // 5. ORBIT RINGS
                // ══════════════════════════════════════════════
                orbitRings.forEach((or, oi) => {
                    or.mesh.rotation.z += or.rotZ;
                    // Gentle tilt oscillation
                    or.mesh.rotation.x = orbitData[oi].tiltX + Math.sin(t * 0.12 + oi) * 0.06;
                    // Subtle scale breathe
                    const orScale = 1 + 0.015 * Math.sin(t * 0.9 + oi * 1.2);
                    or.mesh.scale.setScalar(lerp(orScale, orScale * (1 + scE * or.r * 0.2), scE));
                    or.mat.opacity = or.baseOp * assE;
                });

                // ══════════════════════════════════════════════
                // 6. MICRO-DOT CLOUD
                // ══════════════════════════════════════════════
                const mArr = microGeo.attributes.position.array;
                microDat.forEach((d, i) => {
                    // Slow orbital drift
                    const orb = t * d.orbitSpeed;
                    const nx = d.bx * Math.cos(orb) - d.by * Math.sin(orb);
                    const ny = d.bx * Math.sin(orb) + d.by * Math.cos(orb);
                    mArr[i * 3] = lerp(nx, nx + d.scatterX, scE);
                    mArr[i * 3 + 1] = lerp(ny + Math.sin(t * 0.5 + d.phase) * 0.08, ny + d.scatterY, scE);
                    mArr[i * 3 + 2] = lerp(d.bz, d.bz + d.scatterZ, scE);
                });
                microGeo.attributes.position.needsUpdate = true;
                microMat.opacity = 0.35 * assE;
                microCloud.rotation.y = t * 0.008;

                // ══════════════════════════════════════════════
                // CAMERA
                // ══════════════════════════════════════════════
                camera.position.z = lerp(8, 22, scE * 0.55);
                camera.position.x = Math.sin(t * 0.05) * 0.40 * assembled;
                camera.position.y = Math.cos(t * 0.04) * 0.25 * assembled;
                camera.lookAt(0, 0, 0);

                // ══════════════════════════════════════════════
                // BACKGROUND — deep navy fades toward black
                // ══════════════════════════════════════════════
                const bgR = lerp(0x02, 0x00, scE) / 255;
                const bgG = lerp(0x09, 0x01, scE) / 255;
                const bgB = lerp(0x14, 0x06, scE) / 255;
                renderer.setClearColor(new THREE.Color(bgR, bgG, bgB), 1);

                renderer.render(scene, camera);
            };

            animate();

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