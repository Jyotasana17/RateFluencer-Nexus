"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

type Node = {
  position: [number, number, number];
  color: string;
  size: number;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function InfluenceGraph({ compact = false }: { compact?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo<Node[]>(() => {
    const colors = ["#6D5DFC", "#00E5FF", "#14F195", "#FF4D8D"];
    return Array.from({ length: compact ? 32 : 54 }, (_, index) => {
      const radius = compact ? 3.6 : 5.2;
      const angle = index * 1.618;
      const y = Math.sin(index * 0.71) * (compact ? 1.9 : 2.7);
      return {
        position: [
          Math.cos(angle) * (radius + Math.sin(index) * 1.15),
          y,
          Math.sin(angle) * (radius + Math.cos(index * 0.7) * 1.15)
        ],
        color: colors[index % colors.length],
        size: 0.045 + (index % 6) * 0.015
      };
    });
  }, [compact]);

  const lines = useMemo(() => {
    const segments: [Node, Node][] = [];
    nodes.forEach((node, index) => {
      segments.push([node, nodes[(index + 7) % nodes.length]]);
      if (index % 3 === 0) segments.push([node, nodes[(index + 13) % nodes.length]]);
    });
    return segments;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.075;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.4}>
      <group ref={group}>
        {lines.map(([a, b], index) => (
          <GraphLine key={index} start={a.position} end={b.position} />
        ))}
        {nodes.map((node, index) => (
          <mesh key={index} position={node.position}>
            <sphereGeometry args={[node.size, 20, 20]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
        ))}
        <mesh>
          <sphereGeometry args={[compact ? 1.05 : 1.4, 48, 48]} />
          <meshBasicMaterial color="#6D5DFC" transparent opacity={0.08} wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function GraphLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...start), new THREE.Vector3(...end)]);
    const material = new THREE.LineBasicMaterial({ color: "#6D5DFC", transparent: true, opacity: 0.12 });
    return new THREE.Line(geometry, material);
  }, [start, end]);

  return <primitive object={line} />;
}

export function InfluenceHeroScene({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[300px] bg-[#050816] rounded-2xl" />;
  }

  return (
    <Canvas camera={{ position: [0, 0.4, compact ? 7 : 8.5], fov: 54 }} dpr={[1, 1.6]} gl={{ antialias: true, preserveDrawingBuffer: true }}>
      <color attach="background" args={["#050816"]} />
      <ambientLight intensity={0.75} />
      <pointLight position={[4, 4, 4]} intensity={12} color="#00E5FF" />
      <pointLight position={[-5, -2, 3]} intensity={10} color="#FF4D8D" />
      <Stars radius={70} depth={35} count={compact ? 900 : 1600} factor={3.2} saturation={0} fade speed={0.45} />
      <InfluenceGraph compact={compact} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.25} />
    </Canvas>
  );
}

function GalaxyStars() {
  const points = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const palette = ["#6D5DFC", "#00E5FF", "#14F195", "#FF4D8D", "#FFFFFF"];
    for (let i = 0; i < 1400; i += 1) {
      const arm = i % 5;
      const angle = i * 0.08 + arm * 1.26;
      const radius = Math.sqrt(i / 1400) * 8.5;
      const spread = (seededRandom(i + 1) - 0.5) * 0.72;
      positions.push(
        Math.cos(angle) * radius + spread,
        (seededRandom(i + 1401) - 0.5) * 0.7,
        Math.sin(angle) * radius + spread
      );
      const color = new THREE.Color(palette[i % palette.length]);
      colors.push(color.r, color.g, color.b);
    }
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.045;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[points.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.88} sizeAttenuation />
    </points>
  );
}

export function InfluenceUniverseScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[400px] bg-[#050816] rounded-3xl" />;
  }

  return (
    <Canvas camera={{ position: [0, 5.2, 11], fov: 52 }} dpr={[1, 1.6]} gl={{ preserveDrawingBuffer: true }}>
      <color attach="background" args={["#050816"]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 5, 0]} intensity={20} color="#00E5FF" />
      <GalaxyStars />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.2, 0.01, 10, 140]} />
        <meshBasicMaterial color="#6D5DFC" transparent opacity={0.26} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6.7, 0.01, 10, 160]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.18} />
      </mesh>
      <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={16} />
    </Canvas>
  );
}
