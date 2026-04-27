import { useEffect, useRef } from "react";

export default function VortexBackground() {
    const mountRef = useRef(null);

    useEffect(() => {
        let renderer, scene, camera, animId;
        let scrollY = 0;

        const init = async () => {
            const THREE = await import("three");

            const W = window.innerWidth;
            const H = window.innerHeight;

            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color("#020d1a");

            camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 300);
            camera.position.set(0, 0, 5.5);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(W, H);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;
            if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

            // Lights - subtle for vortex
            const ambient = new THREE.AmbientLight(0x102040, 1.5);
            scene.add(ambient);

            const light1 = new THREE.PointLight(0x233dfe, 8, 30);
            light1.position.set(3, 2, 4);
            scene.add(light1);

            const light2 = new THREE.PointLight(0x00e5ff, 5, 25);
            light2.position.set(-3, -1, 2);
            scene.add(light2);

            // ═══════════════════════════════════════════════════════
            // VORTEX / WARP TUNNEL - SLOWED DOWN
            // ═══════════════════════════════════════════════════════
            const vortexGroup = new THREE.Group();
            scene.add(vortexGroup);

            // Main vortex particles
            const VORTEX_COUNT = 2500;
            const vortexPositions = new Float32Array(VORTEX_COUNT * 3);
            const vortexData = [];

            for (let i = 0; i < VORTEX_COUNT; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 0.3 + Math.random() * 4.5;
                const z = (Math.random() - 0.5) * 20;

                vortexPositions[i * 3] = Math.cos(angle) * radius;
                vortexPositions[i * 3 + 1] = Math.sin(angle) * radius;
                vortexPositions[i * 3 + 2] = z;

                vortexData.push({
                    angle,
                    radius,
                    z,
                    speed: 0.08 + Math.random() * 0.25,      // REDUCED (was 0.3-1.5)
                    zSpeed: 0.008 + Math.random() * 0.02,    // REDUCED (was 0.03-0.08)
                    radiusSpeed: (Math.random() - 0.5) * 0.005,
                    phase: Math.random() * Math.PI * 2
                });
            }

            const vortexGeo = new THREE.BufferGeometry();
            vortexGeo.setAttribute("position", new THREE.BufferAttribute(vortexPositions, 3));

            const vortexMat = new THREE.PointsMaterial({
                color: 0x3d5afe,
                size: 0.03,
                transparent: true,
                opacity: 0.65,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending
            });

            const vortex = new THREE.Points(vortexGeo, vortexMat);
            vortexGroup.add(vortex);

            // Inner core particles (brighter, slightly faster)
            const CORE_COUNT = 800;
            const corePositions = new Float32Array(CORE_COUNT * 3);
            const coreData = [];

            for (let i = 0; i < CORE_COUNT; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 0.1 + Math.random() * 2.0;
                const z = (Math.random() - 0.5) * 18;

                corePositions[i * 3] = Math.cos(angle) * radius;
                corePositions[i * 3 + 1] = Math.sin(angle) * radius;
                corePositions[i * 3 + 2] = z;

                coreData.push({
                    angle,
                    radius,
                    z,
                    speed: 0.15 + Math.random() * 0.4,      // REDUCED (was 0.6-2.0)
                    zSpeed: 0.012 + Math.random() * 0.03,    // REDUCED (was 0.05-0.12)
                });
            }

            const coreGeo = new THREE.BufferGeometry();
            coreGeo.setAttribute("position", new THREE.BufferAttribute(corePositions, 3));

            const coreMat = new THREE.PointsMaterial({
                color: 0x00e5ff,
                size: 0.02,
                transparent: true,
                opacity: 0.8,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending
            });

            const core = new THREE.Points(coreGeo, coreMat);
            vortexGroup.add(core);

            // Streaks — bright blue lines flying toward camera
            const STREAK_COUNT = 200;
            const streakLines = [];

            for (let i = 0; i < STREAK_COUNT; i++) {
                const angle = Math.random() * Math.PI * 2;
                const r = 0.1 + Math.random() * 4.0;
                const z = (Math.random() - 0.5) * 18;
                const length = 0.2 + Math.random() * 0.8;

                const pts = [
                    new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z),
                    new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z + length),
                ];

                const sGeo = new THREE.BufferGeometry().setFromPoints(pts);
                const sMat = new THREE.LineBasicMaterial({
                    color: Math.random() > 0.4 ? 0x3d5afe : 0x00e5ff,
                    transparent: true,
                    opacity: 0.55,
                    blending: THREE.AdditiveBlending
                });

                const streak = new THREE.Line(sGeo, sMat);
                streak.userData = {
                    angle,
                    r,
                    z,
                    length,
                    speed: 0.015 + Math.random() * 0.04,     // REDUCED (was 0.06-0.15)
                    pulsePhase: Math.random() * Math.PI * 2
                };

                vortexGroup.add(streak);
                streakLines.push(streak);
            }

            // Distant glow rings
            const RING_COUNT = 5;
            const rings = [];

            for (let i = 0; i < RING_COUNT; i++) {
                const ringRadius = 2.5 + i * 1.2;
                const ringPoints = [];
                const segments = 80;

                for (let j = 0; j <= segments; j++) {
                    const angle = (j / segments) * Math.PI * 2;
                    ringPoints.push(new THREE.Vector3(
                        Math.cos(angle) * ringRadius,
                        Math.sin(angle) * ringRadius,
                        -5 + i * 2.5
                    ));
                }

                const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
                const ringMat = new THREE.LineBasicMaterial({
                    color: 0x233dfe,
                    transparent: true,
                    opacity: 0.08 + i * 0.03,
                    blending: THREE.AdditiveBlending
                });

                const ring = new THREE.Line(ringGeo, ringMat);
                ring.userData = {
                    baseZ: -5 + i * 2.5,
                    speed: 0.005 + i * 0.002,               // REDUCED (was 0.02-0.05)
                    radius: ringRadius
                };

                vortexGroup.add(ring);
                rings.push(ring);
            }

            // Scroll handling
            const onScroll = () => { scrollY = window.scrollY; };
            const onResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onResize);

            // Animation clock
            const clock = new THREE.Clock();

            // Animation loop
            const animate = () => {
                animId = requestAnimationFrame(animate);
                const delta = clock.getDelta();
                const elapsedTime = clock.getElapsedTime();

                // Scroll-based intensity and speed - REDUCED MULTIPLIER
                const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
                const scrollProgress = Math.min(scrollY / maxScroll, 1);

                // Speed multiplier based on scroll (much gentler)
                const speedMultiplier = 1 + scrollProgress * 0.5;    // REDUCED (was 1 + scrollProgress * 2)

                // Update main vortex particles
                const vPA = vortexGeo.attributes.position.array;
                for (let i = 0; i < VORTEX_COUNT; i++) {
                    const d = vortexData[i];

                    // Spiral motion - slowed
                    d.angle += d.speed * 0.008 * speedMultiplier;    // REDUCED (was 0.015)
                    d.z += d.zSpeed * speedMultiplier;

                    // Wrap around
                    if (d.z > 10) d.z = -10;
                    if (d.z < -10) d.z = 10;

                    // Radius pulsing - slower
                    const radiusPulse = d.radius * (1 + 0.05 * Math.sin(elapsedTime * 1 + d.phase));  // REDUCED amplitude and speed

                    vPA[i * 3] = Math.cos(d.angle) * radiusPulse;
                    vPA[i * 3 + 1] = Math.sin(d.angle) * radiusPulse;
                    vPA[i * 3 + 2] = d.z;
                }
                vortexGeo.attributes.position.needsUpdate = true;

                // Update core particles (faster, tighter spiral) - slowed
                const cPA = coreGeo.attributes.position.array;
                for (let i = 0; i < CORE_COUNT; i++) {
                    const d = coreData[i];

                    d.angle += d.speed * 0.012 * speedMultiplier;    // REDUCED (was 0.02)
                    d.z += d.zSpeed * speedMultiplier;

                    if (d.z > 10) d.z = -10;
                    if (d.z < -10) d.z = 10;

                    cPA[i * 3] = Math.cos(d.angle) * d.radius;
                    cPA[i * 3 + 1] = Math.sin(d.angle) * d.radius;
                    cPA[i * 3 + 2] = d.z;
                }
                coreGeo.attributes.position.needsUpdate = true;

                // Animate streaks flying toward viewer - slowed
                streakLines.forEach((streak) => {
                    const ud = streak.userData;

                    ud.z += ud.speed * speedMultiplier;

                    // Wrap around
                    if (ud.z > 10) {
                        ud.z = -10;
                        // Randomize when resetting for variety
                        ud.angle = Math.random() * Math.PI * 2;
                        ud.r = 0.1 + Math.random() * 4.0;
                    }

                    // Update streak geometry
                    const pts = streak.geometry.attributes.position.array;
                    pts[0] = Math.cos(ud.angle) * ud.r;
                    pts[1] = Math.sin(ud.angle) * ud.r;
                    pts[2] = ud.z;

                    pts[3] = Math.cos(ud.angle) * ud.r;
                    pts[4] = Math.sin(ud.angle) * ud.r;
                    pts[5] = ud.z + ud.length;

                    streak.geometry.attributes.position.needsUpdate = true;

                    // Pulse opacity - slower pulse
                    const zFactor = 0.5 + 0.5 * Math.abs(ud.z / 10);
                    const pulse = 0.7 + 0.3 * Math.sin(elapsedTime * 2 + ud.pulsePhase);  // REDUCED pulse speed (was 5)
                    streak.material.opacity = 0.55 * zFactor * pulse * (0.8 + 0.2 * scrollProgress);
                });

                // Animate rings - slowed
                rings.forEach((ring, index) => {
                    ring.position.z += ring.userData.speed * speedMultiplier;

                    if (ring.position.z > 8) {
                        ring.position.z = -8;
                    }

                    // Rotate rings - slower
                    ring.rotation.z += 0.0015 * speedMultiplier;    // REDUCED (was 0.005)

                    // Pulse opacity - slower
                    ring.material.opacity = (0.08 + index * 0.03) * (0.7 + 0.3 * Math.sin(elapsedTime * 1));  // REDUCED pulse speed (was 2)
                });

                // Camera effects - gentler
                camera.position.z = 5.5 + Math.sin(elapsedTime * 0.3) * 0.1;  // REDUCED amplitude and speed

                // Subtle camera rotation based on scroll
                camera.position.x = Math.sin(elapsedTime * 0.1) * 0.15 * scrollProgress;    // REDUCED
                camera.position.y = Math.cos(elapsedTime * 0.08) * 0.1 * scrollProgress;    // REDUCED
                camera.lookAt(0, 0, 0);

                // Light animation - slower
                light1.position.x = 4 * Math.cos(elapsedTime * 0.15);    // REDUCED (was 0.3)
                light1.position.z = 4 * Math.sin(elapsedTime * 0.15) + 2;
                light1.intensity = 8 * (0.7 + 0.15 * Math.sin(elapsedTime * 2));  // REDUCED pulse (was 4)

                light2.position.x = -3 * Math.cos(elapsedTime * 0.12);   // REDUCED (was 0.25)
                light2.intensity = 5 * (0.7 + 0.15 * Math.sin(elapsedTime * 1.5));  // REDUCED

                // Background color subtle shift with scroll
                const bgColor = new THREE.Color(0x020d1a);
                bgColor.lerp(new THREE.Color(0x030b1a), scrollProgress * 0.3);
                renderer.setClearColor(bgColor);

                renderer.render(scene, camera);
            };

            animate();

            // Cleanup
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