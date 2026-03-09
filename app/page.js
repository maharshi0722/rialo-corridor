"use client";
import React, { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ========= CONFIG ========= */
const CW = 4.6;
const CH = 3.9;
const SEG = 9;
const POOL = 12;
const SPEED = 5;

/* ========= DATA ========= */
const HELPERS = [
  { id: "00", name: "RialORCA", img: "/images/00.png" },
  { id: "01", name: "EricArgent", img: "/images/0.png" },
  { id: "02", name: "AQCCapital", img: "/images/1.png" },
  { id: "03", name: "Ali LY", img: "/images/2.png" },
  { id: "04", name: "DR1MMER", img: "/images/3.png" },
  { id: "05", name: "Flippedface", img: "/images/4.png" },
  { id: "06", name: "Gatoverde", img: "/images/5.png" },
  { id: "07", name: "Ishu", img: "/images/6.png" },
  { id: "08", name: "JEAMS", img: "/images/7.png" },
  { id: "09", name: "K.Gufran", img: "/images/8.png" },
  { id: "10", name: "Keep", img: "/images/9.png" },
  { id: "11", name: "KingJ", img: "/images/10.png" },
  { id: "12", name: "Koushik Núr", img: "/images/11.png" },
  { id: "13", name: "LongLife", img: "/images/12.png" },
  { id: "14", name: "Luka", img: "/images/13.png" },
  { id: "15", name: "MS DHONI", img: "/images/14.png" },
  { id: "16", name: "l0oble", img: "/images/15.png" },
  { id: "17", name: "Richard12", img: "/images/16.png" },
  { id: "18", name: "Rollins", img: "/images/17.png" },
  { id: "19", name: "Süleyman", img: "/images/18.png" },
  { id: "20", name: "VibeVortex", img: "/images/19.png" },
  { id: "21", name: "Yozi柚子", img: "/images/20.png" },
  { id: "22", name: "alextine", img: "/images/21.png" },
  { id: "23", name: "silverwave", img: "/images/22.png" },
  { id: "24", name: "DORA", img: "/images/23.png" }
];

/* ========= TEXTURE HOOK ========= */
const loader = new THREE.TextureLoader();
const cache = new Map();
function useTexture(url) {
  const { gl } = useThree();
  const [tex, setTex] = useState(null);
  useEffect(() => {
    if (cache.has(url)) return setTex(cache.get(url));
    loader.load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.flipY = true;
      t.generateMipmaps = true;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.anisotropy = gl.capabilities.getMaxAnisotropy();
      cache.set(url, t);
      setTex(t);
    });
  }, [url, gl]);
  return tex;
}

/* ========= LABEL TEXTURE ========= */
function makeLabelTexture(text) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#101320";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 5;
  ctx.strokeRect(6, 6, c.width - 12, c.height - 12);
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 42px Inter, system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, c.width / 2, c.height / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ========= FRAME ========= */
function Frame({ pos, rotY, imgSrc, title }) {
  const tex = useTexture(imgSrc);
  const [label, setLabel] = useState(null);
  const ref = useRef();
  useEffect(() => setLabel(makeLabelTexture(title)), [title]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        pos[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    }
  });

  if (!tex || !label) return null;

  return (
    <group ref={ref} position={pos} rotation={[0, rotY, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.2, 0.12]} />
        <meshStandardMaterial color="#000000" metalness={0.2} roughness={0.6} />
      </mesh>

      <mesh position={[0, 0.12, 0.07]} receiveShadow>
        <planeGeometry args={[1.32, 1.72]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>

      <mesh position={[0, -0.95, 0.08]}>
        <planeGeometry args={[1.32, 0.38]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ========= SEGMENT ========= */
function Segment({ z, left, right, setRef, runwayTex }) {
  const hw = CW / 2;
  const hh = CH / 2;
  const frameZ = -SEG / 2 + 5;

  return (
    <group ref={setRef} position={[0, 0, z]}>
      {/* walls */}
      <mesh position={[-hw, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[SEG, CH]} />
        <meshStandardMaterial color="#2b2a3c" />
      </mesh>
      <mesh position={[hw, 0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[SEG, CH]} />
        <meshStandardMaterial color="#2b2a3c" />
      </mesh>

      {/* ceiling */}
      <mesh position={[0, hh, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[CW, SEG]} />
        <meshStandardMaterial color="#323146" />
      </mesh>

      {/* base floor */}
      <mesh position={[0, -hh, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[CW, SEG]} />
        <meshStandardMaterial color="#211f30" />
      </mesh>

      {/* red runway with texture */}
      <mesh position={[0, -hh + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.9, SEG]} />
        <meshStandardMaterial
          map={runwayTex}
          color="#d72638"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* yellow rails */}
      <mesh position={[0, -hh + 0.0055, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.98, SEG]} />
        <meshStandardMaterial color="#ffd438" roughness={1} transparent opacity={0.95} />
      </mesh>

      {/* frame pairs */}
      <Frame
        pos={[-hw + 0.14, 0.42, frameZ]}
        rotY={Math.PI / 2}
        imgSrc={left.img}
        title={left.name}
      />
      <Frame
        pos={[hw - 0.14, 0.42, frameZ]}
        rotY={-Math.PI / 2}
        imgSrc={right.img}
        title={right.name}
      />
    </group>
  );
}

/* ========= CEILING LIGHT STRIPS ========= */
function CeilingLights() {
  const { camera } = useThree();
  const refs = useRef([]);
  const count = 12;              // how many panels to keep ahead
  const gap = 6;                 // spacing between panels
  const offset = 3;              // initial forward offset

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      const m = refs.current[i];
      if (!m) continue;
      // position panels in front of the camera continuously
      m.position.z = camera.position.z - offset - i * gap;
    }
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={[0, CH / 2 - 0.01, -offset - i * gap]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.1, 2.2]} />
          <meshBasicMaterial color="#ffffff" /> {/* self-lit, won't darken */}
        </mesh>
      ))}
    </group>
  );
}

/* ========= LOGO PORTAL ========= */
function LogoPortal() {
  const { camera } = useThree();
  const tex = useTexture("/images/logo2.svg");
  const ref = useRef();

  useFrame(() => {
    if (!ref.current || !tex) return;
    const targetZ = camera.position.z - 40;
    ref.current.position.set(0, 0.05, targetZ);
    ref.current.lookAt(camera.position.x, camera.position.y, camera.position.z);
  });

  if (!tex) return null;

  // Keep logo sharp
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;

  return (
    <group ref={ref}>
      {/* subtle dark plate */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.9, 1.9]} />
        <meshBasicMaterial color="rgba(0,0,0,0.55)" transparent />
      </mesh>

      {/* logo */}
      <mesh>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial
          map={tex}
          transparent
          alphaTest={0.02}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* halo */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial
          color="#ff87a0"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight position={[0, 0, 0.2]} intensity={4.5} distance={16} color="#ffffff" />
    </group>
  );
}

/* ========= SCENE ========= */
function Scene() {
  const { camera, gl } = useThree();
  const refs = useRef([]);
  const pos = useRef(Array.from({ length: POOL }, (_, i) => -(i * SEG + SEG / 2)));
  const camZ = useRef(-1.2);

  const runwayTex = useTexture("/images/runway.png");

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.antialias = true;
    gl.physicallyCorrectLights = true;
  }, [gl]);

  const pairs = useMemo(
    () =>
      HELPERS.map((_, i) => ({
        L: HELPERS[(i * 2) % HELPERS.length],
        R: HELPERS[(i * 2 + 1) % HELPERS.length]
      })),
    []
  );

  useFrame((state, d) => {
    camZ.current += d * SPEED;
    camera.position.z = -camZ.current;
    camera.position.y = 0.32 + Math.sin(state.clock.elapsedTime * 0.18) * 0.04;

    const recycle = camera.position.z + SEG * 1.4;
    for (let i = 0; i < POOL; i++) {
      const g = refs.current[i];
      if (!g) continue;
      if (pos.current[i] + SEG / 2 > recycle) {
        const m = Math.min(...pos.current);
        pos.current[i] = m - SEG;
        g.position.z = pos.current[i];
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.72} color="#f5f7ff" />
      <directionalLight
        position={[6, 7, 5]}
        intensity={1.25}
        color="#dbe2ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[0, 6, 2]}
        intensity={0.55}
        angle={0.5}
        penumbra={0.5}
        color="#a9baff"
        castShadow
      />

      <CeilingLights />
      <LogoPortal />

      {pairs.slice(0, POOL).map((p, i) => (
        <Segment
          key={i}
          z={pos.current[i]}
          left={p.L}
          right={p.R}
          setRef={(e) => (refs.current[i] = e)}
          runwayTex={runwayTex}
        />
      ))}
    </>
  );
}

/* ========= PAGE ========= */
export default function RialoGallery() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1f1e2f", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0.35, 2], fov: 70 }}
        shadows
        gl={{ antialias: true, preserveDrawingBuffer: false }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* top overlay title */}
      <div className="p-20"
        style={{
          position: "absolute",
          top: 14,
          left: 0,
          width: "100%",
          textAlign: "center",
          pointerEvents: "none",
          color: "#f8fafc",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontSize: "20px",
          textShadow: "0 2px 6px rgba(0,0,0,0.35)"
       
        }}
      >
Rialo Builderverse
      </div>
    </div>
  );
}