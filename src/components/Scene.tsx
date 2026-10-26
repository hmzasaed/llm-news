import { useEffect, useRef } from "react";
import * as THREE from "three";

const LABELS = [
  { name: "Opus 5.5", score: "86.7", color: "#d9a786", pos: [1.35, 0.98, 0.35] },
  { name: "GPT-6.1 Sol", score: "84.2", color: "#27b591", pos: [1.72, -0.28, 0.12] },
  { name: "Gemini 4 Argon", score: "82.9", color: "#8ab4f8", pos: [0.55, 1.72, 0.15] },
  { name: "Kimi K3", score: "76.2", color: "#a78bfa", pos: [-1.5, 0.55, 0.5] },
  { name: "GPT-6 Luna", score: "66.6", color: "#67e8f9", pos: [-1.1, -1.3, -0.2] },
];

function makeGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.18, "rgba(255,255,255,0.85)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.28)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      host.classList.add("scene-failed");
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 60);
    camera.position.set(0, 0, 6.2);

    const parallax = new THREE.Group();
    const root = new THREE.Group();
    root.position.y = -0.05;
    parallax.add(root);
    scene.add(parallax);

    const wireMaterial = new THREE.LineBasicMaterial({
      color: "#7fc8e8",
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending,
    });
    const wireGeometry = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.55, 2));
    const wire = new THREE.LineSegments(wireGeometry, wireMaterial);
    wire.rotation.set(0.18, 0.2, -0.1);
    root.add(wire);

    const outerWireGeometry = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.1, 1));
    const outerWire = new THREE.LineSegments(
      outerWireGeometry,
      new THREE.LineBasicMaterial({
        color: "#52a4d8",
        transparent: true,
        opacity: 0.04,
        blending: THREE.AdditiveBlending,
      }),
    );
    outerWire.rotation.set(-0.35, 0.5, 0.3);
    root.add(outerWire);

    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions: number[] = [];
    const baseIcosahedron = new THREE.IcosahedronGeometry(1.55, 2);
    const basePositions = baseIcosahedron.attributes.position.array;
    for (let index = 0; index < basePositions.length; index += 3) {
      nodePositions.push(basePositions[index], basePositions[index + 1], basePositions[index + 2]);
    }
    baseIcosahedron.dispose();
    nodeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3));
    const nodes = new THREE.Points(
      nodeGeometry,
      new THREE.PointsMaterial({
        color: "#d6ff91",
        size: 0.022,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    root.add(nodes);

    const shellCount = isMobile ? 650 : 1350;
    const shellPositions = new Float32Array(shellCount * 3);
    const shellColors = new Float32Array(shellCount * 3);
    const lime = new THREE.Color("#c9ff4d");
    const cyan = new THREE.Color("#54e1ee");
    const violet = new THREE.Color("#9586ff");
    const tempColor = new THREE.Color();
    for (let index = 0; index < shellCount; index += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.05 + Math.pow(Math.random(), 1.6) * 1.55;
      shellPositions[index * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      shellPositions[index * 3 + 1] = Math.cos(phi) * radius * 0.88;
      shellPositions[index * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius * 0.8;
      const t = (shellPositions[index * 3 + 1] / radius + 1) * 0.5;
      tempColor.copy(cyan).lerp(lime, t);
      if (Math.random() > 0.86) tempColor.lerp(violet, 0.65);
      shellColors[index * 3] = tempColor.r;
      shellColors[index * 3 + 1] = tempColor.g;
      shellColors[index * 3 + 2] = tempColor.b;
    }
    const shellGeometry = new THREE.BufferGeometry();
    shellGeometry.setAttribute("position", new THREE.BufferAttribute(shellPositions, 3));
    shellGeometry.setAttribute("color", new THREE.BufferAttribute(shellColors, 3));
    const shell = new THREE.Points(
      shellGeometry,
      new THREE.PointsMaterial({
        size: isMobile ? 0.026 : 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0.74,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    root.add(shell);

    const connectionPositions: number[] = [];
    const candidates: THREE.Vector3[] = [];
    for (let index = 0; index < 120; index += 1) {
      const pointIndex = Math.floor(Math.random() * shellCount);
      candidates.push(
        new THREE.Vector3(
          shellPositions[pointIndex * 3],
          shellPositions[pointIndex * 3 + 1],
          shellPositions[pointIndex * 3 + 2],
        ),
      );
    }
    for (let index = 0; index < candidates.length; index += 1) {
      for (let next = index + 1; next < Math.min(index + 8, candidates.length); next += 1) {
        if (candidates[index].distanceTo(candidates[next]) < 0.72 && connectionPositions.length < 600) {
          connectionPositions.push(
            candidates[index].x,
            candidates[index].y,
            candidates[index].z,
            candidates[next].x,
            candidates[next].y,
            candidates[next].z,
          );
        }
      }
    }
    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connectionPositions, 3),
    );
    root.add(
      new THREE.LineSegments(
        connectionGeometry,
        new THREE.LineBasicMaterial({
          color: "#2f7382",
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );

    const glowTexture = makeGlowTexture();

    const coreUniforms = {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#c9ff4d") },
      uColorB: { value: new THREE.Color("#1cc7b0") },
    };
    const coreGeometry = new THREE.IcosahedronGeometry(0.64, 5);
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: coreUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec3 displaced = position;
          float wave = sin(position.x * 6.0 + uTime * 0.8) *
                       sin(position.y * 5.0 - uTime * 0.62) *
                       sin(position.z * 4.0 + uTime * 0.4);
          displaced += normal * wave * 0.024;
          vec4 modelView = modelViewMatrix * vec4(displaced, 1.0);
          vView = normalize(-modelView.xyz);
          gl_Position = projectionMatrix * modelView;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          float fresnel = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0), 2.6);
          vec3 color = mix(uColorA, uColorB, smoothstep(-0.8, 0.8, vNormal.y));
          float alpha = 0.035 + fresnel * 0.62;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(core);

    const coreWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.82, 1)),
      new THREE.LineBasicMaterial({
        color: "#d9ff9e",
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
      }),
    );
    coreWire.rotation.set(0.4, 0.2, 0.1);
    root.add(coreWire);

    const coreGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: "#3fe0b0",
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    coreGlow.scale.set(3.4, 3.4, 1);
    root.add(coreGlow);

    const orbitConfigs = [
      { radius: 1.94, tilt: -0.32, roll: 0.62, speed: 0.14, color: "#c9ff4d" },
      { radius: 2.32, tilt: 1.18, roll: -0.35, speed: -0.09, color: "#67e8f9" },
      { radius: 2.7, tilt: -1.02, roll: 0.95, speed: 0.055, color: "#9d8cff" },
    ];
    const orbitPivots: THREE.Group[] = [];
    orbitConfigs.forEach((config, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(config.radius, 0.0028, 3, 220),
        new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: 0.24,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      ring.rotation.x = Math.PI / 2 + config.tilt;
      ring.rotation.z = config.roll;
      root.add(ring);

      const pivot = new THREE.Group();
      pivot.rotation.x = config.tilt;
      pivot.rotation.z = config.roll;
      const satellite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          color: config.color,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      satellite.position.set(config.radius, 0, 0);
      satellite.scale.set(0.34, 0.34, 1);
      pivot.add(satellite);
      pivot.userData.speed = config.speed;
      pivot.userData.phase = index * 2.1;
      root.add(pivot);
      orbitPivots.push(pivot);
    });

    const starCount = isMobile ? 80 : 220;
    const starPositions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      starPositions[index * 3] = (Math.random() - 0.5) * 12;
      starPositions[index * 3 + 1] = (Math.random() - 0.5) * 9;
      starPositions[index * 3 + 2] = -2 - Math.random() * 6;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: "#b8d3e1",
        size: 0.014,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    );
    scene.add(stars);

    const pointer = { x: 0, y: 0 };
    let scrollFactor = 0;
    let visible = true;
    let frame = 0;
    const clock = new THREE.Clock();
    const projected = new THREE.Vector3();
    const projectLabels = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      const hostRect = host.getBoundingClientRect();
      LABELS.forEach((label, index) => {
        const element = labelRefs.current[index];
        if (!element) return;
        projected.set(label.pos[0], label.pos[1], label.pos[2]);
        projected.applyMatrix4(root.matrixWorld).project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        const inView =
          projected.z < 0.999 &&
          projected.z > -1 &&
          hostRect.left + x > 8 &&
          hostRect.left + x < window.innerWidth - 8;
        const flip = hostRect.left + x + element.offsetWidth + 24 > window.innerWidth;
        const offset = flip ? -element.offsetWidth - 16 : 16;
        element.style.opacity = String(inView ? 1 : 0);
        element.style.transform = `translate3d(${x + offset}px, ${y}px, 0) translateY(-50%)`;
      });
    };

    const render = () => {
      renderer.render(scene, camera);
      projectLabels();
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!visible) return;
      const time = clock.getElapsedTime();
      if (!reduceMotion) {
        root.rotation.y = time * 0.055;
        root.rotation.x = Math.sin(time * 0.12) * 0.05;
        coreUniforms.uTime.value = time;
        coreWire.rotation.y = time * 0.08;
        coreWire.rotation.z = time * 0.03;
        shell.rotation.y = -time * 0.008;
        stars.rotation.y = time * 0.003;
        orbitPivots.forEach((pivot) => {
          pivot.rotation.y = time * (pivot.userData.speed as number) + (pivot.userData.phase as number);
        });
      }
      parallax.rotation.y += (pointer.x * 0.16 - parallax.rotation.y) * 0.035;
      parallax.rotation.x += (pointer.y * 0.1 - parallax.rotation.x) * 0.035;
      camera.position.z = 6.2 + scrollFactor * 1.15;
      camera.position.y = -scrollFactor * 0.28;
      parallax.position.x = pointer.x * 0.1;
      parallax.position.y = -pointer.y * 0.06;
      render();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const handleScroll = () => {
      scrollFactor = Math.min(window.scrollY / window.innerHeight, 1);
    };
    const handleResize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reduceMotion) render();
    };
    let hostVisible = true;
    const handleVisibility = () => {
      visible = document.visibilityState === "visible" && hostVisible;
    };

    const intersection = new IntersectionObserver(
      (entries) => {
        hostVisible = entries[0]?.isIntersecting ?? true;
        visible = hostVisible && document.visibilityState === "visible";
      },
      { threshold: 0.02 },
    );
    intersection.observe(host);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(host);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    handleScroll();
    if (reduceMotion) {
      handleResize();
      render();
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material?.dispose());
        }
      });
      glowTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="scene-glow" />
      <div ref={hostRef} className="scene-canvas" />
      <div className="scene-coordinates mono">
        <span className="live-dot" />
        COMPOSITE FIELD / 20 NODES
      </div>
      <div className="scene-grid-markers" />
      {LABELS.map((label, index) => (
        <div
          key={label.name}
          ref={(element) => {
            labelRefs.current[index] = element;
          }}
          className="scene-label"
        >
          <span className="scene-label-dot" style={{ background: label.color }} />
          <span className="scene-label-copy">
            <strong>{label.name}</strong>
            <span className="mono">
              LATTICE <b>{label.score}</b>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
