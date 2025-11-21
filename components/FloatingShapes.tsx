"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaLaravel,
  FaVuejs,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";

const techIcons = [
  { icon: SiTypescript, color: "#3178c6", name: "TypeScript" },
  { icon: FaReact, color: "#61dafb", name: "React" },
  { icon: SiNextdotjs, color: "#ffffff", name: "Next.js" },
  { icon: FaNodeJs, color: "#339933", name: "Node.js" },
  { icon: SiTailwindcss, color: "#06b6d4", name: "Tailwind" },
  { icon: SiPostgresql, color: "#336791", name: "PostgreSQL" },
  { icon: FaDocker, color: "#2496ed", name: "Docker" },
  { icon: FaLaravel, color: "#ff2d20", name: "Laravel" },
  { icon: FaVuejs, color: "#4fc08d", name: "Vue.js" },
];

function FloatingIcon({
  position,
  icon: Icon,
  color,
  delay,
}: {
  position: [number, number, number];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  delay: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime + delay;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Html transform scale={0.5} distanceFactor={8}>
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-background/20 backdrop-blur-sm border border-white/10 shadow-lg">
            <Icon style={{ color, fontSize: "2rem" }} />
          </div>
        </Html>
      </Float>
    </group>
  );
}

function GlowingSphere({
  position,
  color,
  scale = 0.3,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.scale.setScalar(scale + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

function Particles() {
  const count = 80;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 8 - 2,
        scale: Math.random() * 0.03 + 0.01,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      positions.forEach((pos, i) => {
        const matrix = new THREE.Matrix4();
        matrix.setPosition(
          pos.x + Math.sin(time * pos.speed + i) * 0.2,
          pos.y + Math.cos(time * pos.speed + i * 0.5) * 0.2,
          pos.z
        );
        matrix.scale(new THREE.Vector3(pos.scale, pos.scale, pos.scale));
        meshRef.current!.setMatrixAt(i, matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
    </instancedMesh>
  );
}


export default function FloatingShapes() {
  const iconPositions: [number, number, number][] = [
    [-4.5, 2, -1],
    [-3, -1.5, -2],
    [-1.5, 2.5, -1.5],
    [0, -2, -1],
    [1.5, 1.5, -2],
    [3, -1, -1],
    [4.5, 2.5, -1.5],
    [-2, 0.5, -2.5],
    [2.5, -2.5, -2],
  ];

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />

        {/* Floating Tech Icons */}
        {techIcons.map((tech, index) => (
          <FloatingIcon
            key={tech.name}
            position={iconPositions[index]}
            icon={tech.icon}
            color={tech.color}
            delay={index * 0.5}
          />
        ))}

        {/* Glowing spheres for ambient effect */}
        <GlowingSphere position={[-3, 1, -3]} color="#6366f1" scale={0.8} />
        <GlowingSphere position={[3, -1, -4]} color="#8b5cf6" scale={0.6} />
        <GlowingSphere position={[0, 2, -5]} color="#a855f7" scale={1} />


        {/* Floating particles */}
        <Particles />
      </Canvas>
    </div>
  );
}
