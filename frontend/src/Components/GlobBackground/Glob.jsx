import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./Global.css";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────
// 🌍 Scattering Globe Component
// ─────────────────────────────────────────────────────
const ScatteringGlobe = ({ scatterProgress }) => {
    const earthRef = useRef();
    const particlesRef = useRef();
    const fragmentsRef = useRef([]);

    // Create globe fragments
    const fragments = useRef(
        Array.from({ length: 100 }, (_, i) => ({
            id: i,
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5
            ),
            rotation: new THREE.Euler(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            scale: Math.random() * 0.3 + 0.1
        }))
    ).current;

    // Create particle system for glowing effects
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Spherical distribution
        const radius = 2.5 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Colors: orange/yellow/red for glow effect
        colors[i3] = 1; // R
        colors[i3 + 1] = 0.4 + Math.random() * 0.4; // G
        colors[i3 + 2] = 0.1 + Math.random() * 0.2; // B

        sizes[i] = Math.random() * 0.05;
    }

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Rotate earth slowly when not scattering
        if (earthRef.current && scatterProgress < 0.1) {
            earthRef.current.rotation.y += 0.001;
        }

        // Animate particles
        if (particlesRef.current) {
            particlesRef.current.rotation.y = time * 0.05;

            // Update particle positions based on scatter progress
            const positionsArray = particlesRef.current.geometry.attributes.position.array;

            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                const originalX = positions[i3];
                const originalY = positions[i3 + 1];
                const originalZ = positions[i3 + 2];

                // Scatter effect
                const scatterFactor = scatterProgress * 3;
                const noise = Math.sin(time + i) * 0.1 * scatterProgress;

                positionsArray[i3] = originalX + (originalX * scatterFactor) + noise;
                positionsArray[i3 + 1] = originalY + (originalY * scatterFactor) + noise;
                positionsArray[i3 + 2] = originalZ + (originalZ * scatterFactor) + noise;
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Animate fragments
        if (scatterProgress > 0) {
            fragments.current.forEach((fragment, i) => {
                if (fragmentsRef.current[i]) {
                    const mesh = fragmentsRef.current[i];

                    // Move fragment outward
                    const direction = fragment.position.clone().normalize();
                    const scatterDistance = scatterProgress * 10;

                    mesh.position.copy(fragment.position).add(
                        direction.multiplyScalar(scatterDistance)
                    );

                    // Rotate fragment
                    mesh.rotation.x += fragment.velocity.x * 10;
                    mesh.rotation.y += fragment.velocity.y * 10;

                    // Scale based on scatter
                    const scale = fragment.scale * (1 - scatterProgress * 0.5);
                    mesh.scale.set(scale, scale, scale);
                }
            });
        }
    });

    return (
        <group>
            {/* Main Earth Sphere */}
            <mesh
                ref={earthRef}
                scale={[1 - scatterProgress * 0.3, 1 - scatterProgress * 0.3, 1 - scatterProgress * 0.3]}
                opacity={1 - scatterProgress}
                transparent
            >
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshStandardMaterial
                    color="#1a3a52"
                    roughness={0.6}
                    metalness={0.4}
                    emissive="#0a1628"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Glowing Particle Network */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particlesCount}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particlesCount}
                        array={colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.8 * (1 - scatterProgress * 0.5)}
                    blending={THREE.AdditiveBlending}
                    sizeAttenuation
                />
            </points>

            {/* Scattering Fragments */}
            {scatterProgress > 0.01 && fragments.map((fragment, i) => (
                <mesh
                    key={fragment.id}
                    ref={(el) => (fragmentsRef.current[i] = el)}
                    position={fragment.position}
                    rotation={[0, 0, 0]}
                    scale={[fragment.scale, fragment.scale, fragment.scale]}
                >
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? "#ff6b6b" : "#feca57"}
                        emissive={i % 2 === 0 ? "#ff6b6b" : "#feca57"}
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.8 * (1 - scatterProgress * 0.3)}
                    />
                </mesh>
            ))}

            {/* Radiating Lines Effect */}
            {scatterProgress > 0.1 && (
                <group>
                    {Array.from({ length: 50 }, (_, i) => {
                        const angle = (i / 50) * Math.PI * 2;
                        const height = (Math.random() - 0.5) * 4;
                        const length = 3 + Math.random() * 5 * scatterProgress;

                        return (
                            <mesh
                                key={i}
                                position={[
                                    Math.cos(angle) * 2.6,
                                    height,
                                    Math.sin(angle) * 2.6
                                ]}
                                rotation={[0, angle, 0]}
                            >
                                <cylinderGeometry args={[0.01, 0.01, length, 8]} />
                                <meshBasicMaterial
                                    color={i % 3 === 0 ? "#ff6b6b" : i % 3 === 1 ? "#feca57" : "#48dbfb"}
                                    transparent
                                    opacity={0.6 * scatterProgress}
                                />
                            </mesh>
                        );
                    })}
                </group>
            )}
        </group>
    );
};

// ─────────────────────────────────────────────────────
//  Main Scene Component
// ─────────────────────────────────────────────────────
const Scene = ({ scatterProgress }) => {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "radial-gradient(circle at center, #0a0e27 0%, #000 100%)" }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 3, 5]} intensity={1.5} />
            <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#48dbfb" />
            <pointLight position={[0, -10, 0]} intensity={0.5} color="#ff6b6b" />

            <ScatteringGlobe scatterProgress={scatterProgress} />

            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />

            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={15}
                autoRotate={!scatterProgress}
                autoRotateSpeed={0.5}
            />
        </Canvas>
    );
};

// ─────────────────────────────────────────────────────
// 📱 Main App Component
// ─────────────────────────────────────────────────────
function Global() {
    const [scatterProgress, setScatterProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Hide loading screen
        setTimeout(() => setLoading(false), 1500);

        // GSAP ScrollTrigger for scatter animation
        gsap.to({}, {
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                onUpdate: (self) => {
                    setScatterProgress(self.progress);
                },
            },
        });

        // Animate content on scroll
        const sections = document.querySelectorAll(".scroll-section");
        sections.forEach((section, index) => {
            const heading = section.querySelector("h1");
            const paragraph = section.querySelector("p");

            if (heading && paragraph) {
                gsap.to([heading, paragraph], {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 60%",
                        end: "top 40%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                });
            }
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <>
            {/* Scroll Progress Bar */}
            <div
                className="scroll-progress"
                style={{ width: `${scatterProgress * 100}%` }}
            />

            {/* Fixed 3D Canvas */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: 1
            }}>
                <Scene scatterProgress={scatterProgress} />
            </div>

            {/* Scroll Content */}
            <div className="scroll-container" ref={containerRef}>
                {/* Section 1: Introduction */}
                <section className="scroll-section">
                    <div className="content-overlay">
                        <h1 className="glow-text">🌍 Interactive Globe</h1>
                        <p>
                            Scroll down to watch the world scatter into fragments.
                            Experience the power of WebGL and smooth scroll animations.
                        </p>
                    </div>
                    <div className="section-label">Scroll to Explore ↓</div>
                </section>

                {/* Section 2: Network Effect */}
                <section className="scroll-section">
                    <div className="content-overlay">
                        <h1 className="glow-text"> Global Network</h1>
                        <p>
                            Witness the glowing particle network representing global connections.
                            Each point is a node in our interconnected world.
                        </p>
                    </div>
                    <div className="section-label">Keep Scrolling ↓</div>
                </section>

                {/* Section 3: Explosion */}
                <section className="scroll-section">
                    <div className="content-overlay">
                        <h1 className="glow-text">💥 Scattering Effect</h1>
                        <p>
                            The globe breaks apart into radiant fragments.
                            Watch as geometry disperses into space with realistic physics.
                        </p>
                    </div>
                    <div className="section-label">Almost There ↓</div>
                </section>

                {/* Section 4: Conclusion */}
                <section className="scroll-section">
                    <div className="content-overlay">
                        <h1 className="glow-text">✨ The Journey Continues</h1>
                        <p>
                            Built with React Three Fiber, GSAP, and Lenis.
                            A perfect blend of 3D graphics and smooth user experience.
                        </p>
                    </div>
                    <div className="section-label">↑ Scroll Back Up</div>
                </section>
            </div>
        </>
    );
}

export default Global;