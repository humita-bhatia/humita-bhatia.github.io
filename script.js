import * as THREE from "three";

/* ==========================================================================
   1. HERO SCULPTURE — PROCEDURAL INTERWOVEN ARCHITECTURAL FORM
   Dual-Ribbon Parametric Flow with Chrome, Crimson & Forest Specular Iridescence
   + Quantum Micro-particulate Cloud & Interactive Physics
   ========================================================================== */

const canvas = document.querySelector("#scene");

if (canvas) {
    const scene = new THREE.Scene();

    // Responsive Camera Setup
    const camera = new THREE.PerspectiveCamera(
        42,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 7.8);

    // High fidelity WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // PROCEDURAL STUDIO ENVIRONMENT MAP (Deep Crimson & Forest Specular Reflections)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x050806);

    // Add radiant colored panels to environment scene for authentic metallic reflection
    const envLight1 = new THREE.Mesh(
        new THREE.SphereGeometry(4, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x228b55 })
    );
    envLight1.position.set(10, 8, -6);
    envScene.add(envLight1);

    const envLight2 = new THREE.Mesh(
        new THREE.SphereGeometry(3.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xc82828 })
    );
    envLight2.position.set(-9, -6, 8);
    envScene.add(envLight2);

    const envLight3 = new THREE.Mesh(
        new THREE.SphereGeometry(3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xdde6e1 })
    );
    envLight3.position.set(2, 12, 10);
    envScene.add(envLight3);

    const envRenderTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envRenderTarget.texture;

    // SCENE LIGHTING RIG: Deep Crimson, Emerald Forest & Cool Chrome Key
    const ambientLight = new THREE.AmbientLight(0x0a120e, 2.2);
    scene.add(ambientLight);

    // Key Light — Cool White Specular
    const keyLight = new THREE.DirectionalLight(0xf2f7f4, 3.4);
    keyLight.position.set(4.5, 6, 6.5);
    scene.add(keyLight);

    // Deep Crimson Rim Light (Dynamic fill from lower left)
    const crimsonLight = new THREE.PointLight(0xd92626, 42, 28);
    crimsonLight.position.set(-4.8, -3.2, 4.0);
    scene.add(crimsonLight);

    // Rich Forest Green Accent Light (Atmospheric backlight from right)
    const forestLight = new THREE.PointLight(0x2fb86c, 34, 28);
    forestLight.position.set(4.8, 3.6, -3.0);
    scene.add(forestLight);

    // Soft Chrome Fill from bottom
    const fillLight = new THREE.PointLight(0x9cb8af, 16, 22);
    fillLight.position.set(0, -5, 3);
    scene.add(fillLight);

    // MASTER SCULPTURE CONTAINER
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    /* -------------------------------------------------------------
       CUSTOM PROCEDURAL FLOW RIBBONS (Parametric Curves)
       An intricate architectural weave: interlocking Trefoil / Lissajous
       curvatures with variable thickness and aerodynamic sweep.
    ------------------------------------------------------------- */
    class ProceduralFlowCurve extends THREE.Curve {
        constructor(scale = 1.0, phase = 0, complexity = 2) {
            super();
            this.scale = scale;
            this.phase = phase;
            this.complexity = complexity;
        }

        getPoint(t, optionalTarget = new THREE.Vector3()) {
            const point = optionalTarget;
            const u = t * Math.PI * 2;
            const p = this.phase;

            // Parametric equations for complex, continuous interwoven knot ribbon
            const x = Math.sin(u * 2 + p) * (1.8 + 0.35 * Math.cos(u * 3));
            const y = Math.cos(u * 3 + p) * (1.3 + 0.45 * Math.sin(u * 2));
            const z = Math.sin(u * 4 + p) * 0.95 + Math.cos(u * 2) * 0.5;

            return point.set(x * this.scale, y * this.scale, z * this.scale);
        }
    }

    class ArchitecturalCoreCurve extends THREE.Curve {
        constructor(scale = 1.0, twist = 1.0) {
            super();
            this.scale = scale;
            this.twist = twist;
        }

        getPoint(t, optionalTarget = new THREE.Vector3()) {
            const point = optionalTarget;
            const u = t * Math.PI * 2;
            // Möbius-like interwoven loop
            const r = 2.0 + 0.5 * Math.sin(3 * u);
            const x = r * Math.cos(2 * u);
            const y = r * Math.sin(2 * u);
            const z = 0.8 * Math.cos(3 * u) * Math.sin(u);

            return point.set(x * this.scale, y * this.scale, z * this.scale);
        }
    }

    // Material 1: Gunmetal Chrome with Deep Crimson Iridescence
    const gunmetalCrimsonMat = new THREE.MeshPhysicalMaterial({
        color: 0x161214,
        emissive: 0x220508,
        roughness: 0.12,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 1.0,
        iridescence: 0.35,
        iridescenceIOR: 1.3,
        specularColor: new THREE.Color(0xff4d4d)
    });

    // Material 2: Deep Lustrous Forest Green & Obsidian Alloy
    const forestObsidianMat = new THREE.MeshPhysicalMaterial({
        color: 0x07150e,
        emissive: 0x021208,
        roughness: 0.15,
        metalness: 0.92,
        clearcoat: 0.95,
        clearcoatRoughness: 0.1,
        reflectivity: 0.95,
        iridescence: 0.28,
        iridescenceIOR: 1.35,
        specularColor: new THREE.Color(0x3df095)
    });

    // Material 3: Mirror Polished Chrome Spine
    const polishedSilverMat = new THREE.MeshStandardMaterial({
        color: 0xd8e3dd,
        roughness: 0.08,
        metalness: 0.98
    });

    // Primary Interwoven Ribbon
    const curve1 = new ProceduralFlowCurve(1.15, 0.0);
    const geom1 = new THREE.TubeGeometry(curve1, 320, 0.088, 20, true);
    const mesh1 = new THREE.Mesh(geom1, gunmetalCrimsonMat);
    masterGroup.add(mesh1);

    // Secondary Counter-weaving Ribbon
    const curve2 = new ProceduralFlowCurve(1.08, Math.PI * 0.65);
    const geom2 = new THREE.TubeGeometry(curve2, 320, 0.076, 20, true);
    const mesh2 = new THREE.Mesh(geom2, forestObsidianMat);
    mesh2.rotation.x = Math.PI * 0.45;
    mesh2.rotation.y = Math.PI * 0.25;
    masterGroup.add(mesh2);

    // Architectural Spine (Third interlock)
    const curve3 = new ArchitecturalCoreCurve(0.92, 1.2);
    const geom3 = new THREE.TubeGeometry(curve3, 280, 0.054, 16, true);
    const mesh3 = new THREE.Mesh(geom3, polishedSilverMat);
    mesh3.rotation.z = Math.PI * 0.35;
    masterGroup.add(mesh3);

    // Deliberate Geometric Meridian Ring (Thin architectural orbit)
    const ringGeom = new THREE.TorusGeometry(2.7, 0.009, 12, 180);
    const ringMat = new THREE.MeshStandardMaterial({
        color: 0x5b7063,
        roughness: 0.3,
        metalness: 0.9,
        transparent: true,
        opacity: 0.55
    });
    const meridianRing = new THREE.Mesh(ringGeom, ringMat);
    meridianRing.rotation.x = 1.35;
    meridianRing.rotation.y = 0.4;
    masterGroup.add(meridianRing);

    /* -------------------------------------------------------------
       ATMOSPHERIC MICRO-PARTICULATE DUST FIELD
       Organic subtle particles floating in the ambient space
       reflecting forest emerald and crimson wavelengths.
    ------------------------------------------------------------- */
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBasePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCrimson = new THREE.Color(0xd92b2b);
    const cEmerald = new THREE.Color(0x34c776);
    const cSilver = new THREE.Color(0xb5c7be);

    for (let i = 0; i < particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.0 + Math.cbrt(Math.random()) * 3.2;

        const px = r * Math.sin(phi) * Math.cos(theta);
        const py = r * Math.sin(phi) * Math.sin(theta);
        const pz = r * Math.cos(phi);

        particlePositions[i * 3] = px;
        particlePositions[i * 3 + 1] = py;
        particlePositions[i * 3 + 2] = pz;

        particleBasePositions[i * 3] = px;
        particleBasePositions[i * 3 + 1] = py;
        particleBasePositions[i * 3 + 2] = pz;

        // Subtle randomized velocity
        particleVelocities[i * 3] = (Math.random() - 0.5) * 0.008;
        particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
        particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

        const pick = Math.random();
        let selectedColor = cSilver;
        if (pick < 0.40) selectedColor = cCrimson;
        else if (pick < 0.75) selectedColor = cEmerald;

        particleColors[i * 3] = selectedColor.r;
        particleColors[i * 3 + 1] = selectedColor.g;
        particleColors[i * 3 + 2] = selectedColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.042,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particleCloud);

    /* -------------------------------------------------------------
       INTERACTIVE POINTER PHYSICS & SMOOTH DAMPING
    ------------------------------------------------------------- */
    const pointer = {
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0
    };

    let isPointerOver = false;

    window.addEventListener("pointermove", (e) => {
        // Track pointer relative to window coordinates for fluid response
        pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        isPointerOver = true;
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
        pointer.targetX = 0;
        pointer.targetY = 0;
        isPointerOver = false;
    });

    // Touch support for mobile devices
    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            pointer.targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
            pointer.targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
        }
    }, { passive: true });

    // SCROLL PARALLAX TRACKING
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    window.addEventListener("scroll", () => {
        targetScrollY = window.scrollY;
    }, { passive: true });

    // RESIZE OBSERVER & ORIENTATION HANDLING
    function handleResize() {
        const wrapper = canvas.parentElement;
        const width = wrapper.clientWidth || window.innerWidth;
        const height = wrapper.clientHeight || window.innerHeight;

        if (width === 0 || height === 0) return;

        camera.aspect = width / height;

        // Dynamic camera distance according to screen width
        if (width < 640) {
            camera.position.z = 9.8;
            masterGroup.position.y = 0.35;
        } else if (width < 1024) {
            camera.position.z = 8.6;
            masterGroup.position.y = 0.2;
        } else {
            camera.position.z = 7.4;
            masterGroup.position.y = 0;
        }

        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement);
    handleResize();

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* -------------------------------------------------------------
       CONTINUOUS ANIMATION LOOP
    ------------------------------------------------------------- */
    const clock = new THREE.Clock();

    function renderFrame() {
        const time = clock.getElapsedTime();

        // Cursor lerping with inertia
        const lerpFactor = 0.045;
        pointer.currentX += (pointer.targetX - pointer.currentX) * lerpFactor;
        pointer.currentY += (pointer.targetY - pointer.currentY) * lerpFactor;

        // Smooth scroll damping for parallax
        scrollY += (targetScrollY - scrollY) * 0.05;
        const scrollOffset = scrollY / window.innerHeight;

        if (!prefersReducedMotion) {
            // Fluid multi-axis rotation combining continuous float, mouse tilt, and subtle scroll parallax
            masterGroup.rotation.y = time * 0.22 + pointer.currentX * 0.75 + scrollOffset * 0.45;
            masterGroup.rotation.x = Math.sin(time * 0.18) * 0.15 - pointer.currentY * 0.55 - scrollOffset * 0.25;
            masterGroup.rotation.z = Math.cos(time * 0.14) * 0.08;

            // Scroll-linked elevation drift
            masterGroup.position.y = (window.innerWidth < 640 ? 0.35 : 0) - scrollOffset * 1.6;

            // Individual ribbon differential movements for organic aliveness
            mesh1.rotation.y = Math.sin(time * 0.15) * 0.12;
            mesh2.rotation.z = Math.PI * 0.45 + Math.cos(time * 0.2) * 0.1;
            mesh3.rotation.x = Math.sin(time * 0.25) * 0.08;

            // Micro breathing scale
            const breath = 1.0 + Math.sin(time * 0.8) * 0.018;
            masterGroup.scale.set(breath, breath, breath);

            // Orbit & wave particles through the sculpture
            particleCloud.rotation.y = -time * 0.08;
            particleCloud.rotation.x = time * 0.04;

            const positions = particleGeometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const idx = i * 3;
                positions[idx + 1] = particleBasePositions[idx + 1] + Math.sin(time * 1.2 + particleBasePositions[idx]) * 0.18;
                positions[idx] = particleBasePositions[idx] + Math.cos(time * 0.9 + particleBasePositions[idx + 2]) * 0.12;
            }
            particleGeometry.attributes.position.needsUpdate = true;

            // Dynamic light pulsation & orbital sway
            crimsonLight.intensity = 36 + Math.sin(time * 1.5) * 12;
            forestLight.intensity = 28 + Math.cos(time * 1.2) * 10;
            crimsonLight.position.x = -4.8 + Math.sin(time * 0.8) * 0.8;
            forestLight.position.x = 4.8 + Math.cos(time * 0.7) * 0.8;
        } else {
            // Static but rendered orientation
            masterGroup.rotation.y = 0.4 + pointer.currentX * 0.3;
            masterGroup.rotation.x = -0.2 - pointer.currentY * 0.2;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(renderFrame);
    }

    requestAnimationFrame(renderFrame);
}


/* ==========================================================================
   2. SCROLL PROGRESS INDICATOR
   ========================================================================== */
const progressBar = document.querySelector("#progress");

function onWindowScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;
    const progressPercent = totalHeight > 0 ? (scrollPos / totalHeight) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
}

window.addEventListener("scroll", onWindowScroll, { passive: true });
onWindowScroll();


/* ==========================================================================
   3. REFINED CINEMATIC CURSOR & MAGNETIC INTERACTIONS
   ========================================================================== */
const cursorGlow = document.querySelector("#cursorGlow");
const cursorDot = document.querySelector("#cursorDot");
const cursorRing = document.querySelector("#cursorRing");

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!isTouchDevice && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let dotX = mouseX;
    let dotY = mouseY;

    let ringX = mouseX;
    let ringY = mouseY;
    let ringSize = 32;
    let targetRingSize = 32;

    let glowX = mouseX;
    let glowY = mouseY;

    let isVisible = false;

    window.addEventListener("pointermove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            cursorDot.style.opacity = "1";
            cursorRing.style.opacity = "1";
            if (cursorGlow) cursorGlow.style.opacity = "1";
        }
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
        isVisible = false;
        cursorDot.style.opacity = "0";
        cursorRing.style.opacity = "0";
        if (cursorGlow) cursorGlow.style.opacity = "0";
    });

    window.addEventListener("mousedown", () => {
        document.body.classList.add("cursor-active");
    });

    window.addEventListener("mouseup", () => {
        document.body.classList.remove("cursor-active");
    });

    // Interactive Hover Elements (Buttons, Links, Cards, Nav items)
    const hoverTargets = document.querySelectorAll(`
        a, button, .btn-primary, .btn-ghost, .nav-item, .nav-cta,
        .project-showcase, .publication-card, .podium-card, .degree-card,
        .cs-discipline-item, .cert-item, .mini-cert-card, .evidence-link
    `);

    hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
            targetRingSize = 56;
        });

        target.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
            targetRingSize = 32;
        });
    });

    // Magnetic Button Interactions for Important CTAs
    const magneticButtons = document.querySelectorAll(".btn-primary, .btn-ghost, .nav-cta, .brand");

    magneticButtons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.28;
            const deltaY = (e.clientY - centerY) * 0.28;

            btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
        });
    });

    // Continuous Cursor Physics Animation Loop
    function updateCursor() {
        if (!prefersReduced) {
            // Precision dot follows pointer closely with light damping
            dotX += (mouseX - dotX) * 0.45;
            dotY += (mouseY - dotY) * 0.45;

            // Fluid trailing aura with natural spring inertia
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;

            ringSize += (targetRingSize - ringSize) * 0.18;

            // Ambient glow follows softly behind
            glowX += (mouseX - glowX) * 0.06;
            glowY += (mouseY - glowY) * 0.06;
        } else {
            dotX = mouseX;
            dotY = mouseY;
            ringX = mouseX;
            ringY = mouseY;
            glowX = mouseX;
            glowY = mouseY;
        }

        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        cursorRing.style.width = `${ringSize}px`;
        cursorRing.style.height = `${ringSize}px`;

        if (cursorGlow) {
            cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
        }

        requestAnimationFrame(updateCursor);
    }

    requestAnimationFrame(updateCursor);
}


/* ==========================================================================
   4. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
const menuToggle = document.querySelector("#menu");
const navContainer = document.querySelector("#nav");

if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navContainer.classList.toggle("open");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-locked", isOpen);
    });

    // Close when clicking nav anchor
    navContainer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navContainer.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("nav-locked");
        });
    });
}


/* ==========================================================================
   5. REFINED INTERSECTION OBSERVER FOR EDITORIAL REVEALS
   ========================================================================== */
const revealTargets = document.querySelectorAll(`
    .section-badge,
    .editorial-grid,
    .section-head-split,
    .project-showcase,
    .research-layout,
    .experience-showcase,
    .achievements-wrap,
    .foundations-grid,
    .contact-card
`);

revealTargets.forEach((el) => {
    el.classList.add("reveal-ready");
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
});

revealTargets.forEach((el) => {
    revealObserver.observe(el);
});


/* ==========================================================================
   6. INTERACTIVE SPECULAR TILT ON PROJECT CARDS
   ========================================================================== */
const cards = document.querySelectorAll(".project-showcase, .publication-card, .podium-card, .degree-card");

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});
