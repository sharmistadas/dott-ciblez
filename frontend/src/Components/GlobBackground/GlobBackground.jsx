import { useEffect, useRef } from "react";

export default function GlobBackground() {
    const mountRef = useRef(null);

    useEffect(() => {
        let renderer, scene, camera, animId;
        let scrollY = 0;

        const init = async () => {
            const THREE = await import("three");

            const W = window.innerWidth;
            const H = window.innerHeight;

            // --- Scene with deep purple/black background for better contrast ---
            scene = new THREE.Scene();
            scene.background = new THREE.Color("#070a20"); // very dark purple

            camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
            camera.position.set(0, 0, 5);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(W, H);
            if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

            // --- Lights with vibrant colors ---
            scene.add(new THREE.AmbientLight(0x404060, 0.5)); // subtle fill

            // Main colored point lights
            const light1 = new THREE.PointLight(0xff3366, 8, 30); // hot pink
            light1.position.set(4, 4, 4);
            scene.add(light1);

            const light2 = new THREE.PointLight(0x33ccff, 7, 25); // cyan
            light2.position.set(-4, -3, 3);
            scene.add(light2);

            const light3 = new THREE.PointLight(0xffaa00, 6, 20); // amber
            light3.position.set(0, 5, -2);
            scene.add(light3);

            const light4 = new THREE.PointLight(0xaa80ff, 5, 20); // lavender
            light4.position.set(3, -2, 5);
            scene.add(light4);

            const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
            dirLight.position.set(5, 10, 5);
            scene.add(dirLight);

            // --- Main morphing glob (now with hot pink / magenta) ---
            const globGeo = new THREE.SphereGeometry(1.5, 128, 128);
            const origPos = new Float32Array(globGeo.attributes.position.array);

            const globMat = new THREE.MeshPhongMaterial({
                color: 0xff3366,        // hot pink base
                emissive: 0xcc0066,     // deep magenta glow
                emissiveIntensity: 0.7,
                shininess: 150,
                specular: 0xffccaa,
                transparent: true,
                opacity: 0.95,
            });

            const glob = new THREE.Mesh(globGeo, globMat);
            scene.add(glob);

            // --- Wireframe shell (softer, complementary color) ---
            const wireGeo = new THREE.SphereGeometry(1.53, 32, 32);
            const wireMat = new THREE.MeshBasicMaterial({
                color: 0xffaa88,
                wireframe: true,
                transparent: true,
                opacity: 0.15,
            });
            scene.add(new THREE.Mesh(wireGeo, wireMat));

            // --- Outer glow shell (pulsing cyan) ---
            const glowGeo = new THREE.SphereGeometry(1.9, 64, 64);
            const glowMat = new THREE.MeshBasicMaterial({
                color: 0x33ccff,
                transparent: true,
                opacity: 0.1,
                side: THREE.BackSide,
            });
            const glowMesh = new THREE.Mesh(glowGeo, glowMat);
            scene.add(glowMesh);

            // --- Floating orbs with vibrant rainbow colors ---
            const orbDefs = [
                { color: 0xff6699, r: 2.9, size: 0.14 }, // pink
                { color: 0xffaa00, r: 3.1, size: 0.10 }, // orange
                { color: 0xccff66, r: 2.7, size: 0.12 }, // lime
                { color: 0x66f0ff, r: 3.3, size: 0.09 }, // cyan
                { color: 0xbf7fff, r: 2.8, size: 0.16 }, // purple
                { color: 0xff9966, r: 3.0, size: 0.08 }, // coral
            ];

            const orbs = orbDefs.map((def, i) => {
                const angle = (i / orbDefs.length) * Math.PI * 2;
                const geo = new THREE.SphereGeometry(def.size, 16, 16);
                const mat = new THREE.MeshPhongMaterial({
                    color: def.color,
                    emissive: def.color,
                    emissiveIntensity: 0.8,
                    shininess: 200,
                    transparent: true,
                    opacity: 0.95,
                });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(
                    Math.cos(angle) * def.r,
                    (Math.random() - 0.5) * 2.5,
                    Math.sin(angle) * def.r
                );
                mesh.userData = { angle, radius: def.r, speed: 0.003 + i * 0.0005, yBase: mesh.position.y };
                scene.add(mesh);
                return mesh;
            });

            // --- Rings with vivid colors and higher opacity ---
            const addRing = (radius, tube, color, opacity, rotX, rotZ) => {
                const geo = new THREE.TorusGeometry(radius, tube, 16, 120);
                const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.rotation.x = rotX;
                mesh.rotation.z = rotZ;
                scene.add(mesh);
                return mesh;
            };

            const ring1 = addRing(2.2, 0.012, 0xff6699, 0.35, Math.PI / 2.8, 0);
            const ring2 = addRing(2.55, 0.008, 0x66f0ff, 0.25, Math.PI / 2, 0.4);
            const ring3 = addRing(3.0, 0.005, 0xffaa00, 0.20, 0.8, 1.2);

            // --- Particles (now larger and with color variation) ---
            const pCount = 600;
            const pPos = new Float32Array(pCount * 3);
            const pColors = new Float32Array(pCount * 3); // for vertex colors
            for (let i = 0; i < pCount; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 1.6 + Math.random() * 4;
                pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                pPos[i * 3 + 2] = r * Math.cos(phi);

                // random pastel color
                const col = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
                pColors[i * 3] = col.r;
                pColors[i * 3 + 1] = col.g;
                pColors[i * 3 + 2] = col.b;
            }
            const pGeo = new THREE.BufferGeometry();
            pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
            pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
            const particles = new THREE.Points(
                pGeo,
                new THREE.PointsMaterial({
                    size: 0.035,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.7,
                    blending: THREE.AdditiveBlending, // makes particles glow
                })
            );
            scene.add(particles);

            // --- Event listeners ---
            const onScroll = () => {
                scrollY = window.scrollY;
            };
            const onResize = () => {
                const w = window.innerWidth,
                    h = window.innerHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onResize);

            // --- Animation loop with color shifts ---
            const clock = new THREE.Clock();

            const animate = () => {
                animId = requestAnimationFrame(animate);
                const t = clock.getElapsedTime();
                const sp = scrollY / (document.body.scrollHeight - window.innerHeight || 1);

                // Morph glob surface (same as before)
                const pos = globGeo.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    const ox = origPos[i * 3];
                    const oy = origPos[i * 3 + 1];
                    const oz = origPos[i * 3 + 2];
                    const n =
                        0.14 * Math.sin(ox * 2.8 + t * 0.85) *
                        Math.cos(oy * 2.8 + t * 0.65) *
                        Math.sin(oz * 2.8 + t * 0.55);
                    const s = 1 + n;
                    pos.setXYZ(i, ox * s, oy * s, oz * s);
                }
                pos.needsUpdate = true;
                globGeo.computeVertexNormals();

                // Rotate
                glob.rotation.y = t * 0.18 + sp * Math.PI * 1.2;
                glob.rotation.x = t * 0.07;
                glob.rotation.z = sp * 0.5;

                // --- Dynamic color cycling on main sphere ---
                const hue = (t * 0.05) % 1; // slowly cycle through hues
                const baseColor = new THREE.Color().setHSL(hue, 0.9, 0.6);
                const emissiveColor = new THREE.Color().setHSL(hue, 0.9, 0.4);
                globMat.color.set(baseColor);
                globMat.emissive.set(emissiveColor);

                // Glow pulse
                glowMat.opacity = 0.08 + 0.06 * Math.sin(t * 1.8);
                glowMesh.scale.setScalar(1 + 0.06 * Math.sin(t * 0.9));
                glowMesh.rotation.y = t * 0.12;

                // Orbs orbit with slight color shimmer (optional)
                orbs.forEach((orb) => {
                    orb.userData.angle += orb.userData.speed;
                    orb.position.x = Math.cos(orb.userData.angle) * orb.userData.radius;
                    orb.position.z = Math.sin(orb.userData.angle) * orb.userData.radius;
                    orb.position.y = orb.userData.yBase + 0.35 * Math.sin(t * 0.7 + orb.userData.angle * 2);
                });

                // Rings
                ring1.rotation.z = t * 0.14;
                ring2.rotation.y = t * 0.09;
                ring3.rotation.x += 0.003;
                ring3.rotation.y += 0.002;

                // Particles
                particles.rotation.y = t * 0.045;
                particles.rotation.x = t * 0.02;

                // Lights animate with color changes
                light1.position.x = 4 * Math.cos(t * 0.38);
                light1.position.z = 4 * Math.sin(t * 0.38);
                light2.position.x = -4 * Math.cos(t * 0.28);
                light2.position.y = -3 + Math.sin(t * 0.45);

                // Scroll camera drift
                camera.position.y = -sp * 1.2;

                renderer.render(scene, camera);
            };

            animate();

            // Store cleanup
            mountRef.current._threeCleanup = () => {
                cancelAnimationFrame(animId);
                window.removeEventListener("scroll", onScroll);
                window.removeEventListener("resize", onResize);
                renderer.dispose();
                globGeo.dispose();
                globMat.dispose();
            };
        };

        init();

        return () => {
            if (mountRef.current?._threeCleanup) {
                mountRef.current._threeCleanup();
            }
            const canvas = mountRef.current?.querySelector("canvas");
            if (canvas) canvas.remove();
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
                marginTop: "90px",
            }}
        />
    );
}