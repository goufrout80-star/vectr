"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];

const WHITE = "#edf6f9";
const BLUE = "#3ee8ff";
const CORAL = "#ff6b65";

function Box({
  position,
  scale,
  color = WHITE,
}: {
  position: Vec3;
  scale: Vec3;
  color?: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} roughness={0.72} metalness={0.02} />
    </mesh>
  );
}

function Worker({ position, color = "#dbe8ed" }: { position: Vec3; color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.24, 0]} castShadow>
        <capsuleGeometry args={[0.065, 0.23, 4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.48, 0]} castShadow>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshStandardMaterial color="#f6fafb" />
      </mesh>
    </group>
  );
}

function Building({ position, size = [2.3, 2.2, 2.3], mark = false }: { position: Vec3; size?: Vec3; mark?: boolean }) {
  return (
    <group position={position}>
      <Box position={[0, size[1] / 2, 0]} scale={size} />
      <Box position={[0, size[1] + 0.18, 0]} scale={[size[0] * 0.78, 0.35, size[2] * 0.78]} color="#e5f0f4" />
      <Box position={[-size[0] * 0.28, size[1] + 0.46, 0]} scale={[0.22, 0.55, 0.22]} color="#d2e3ea" />
      <Box position={[size[0] * 0.28, size[1] + 0.46, 0]} scale={[0.22, 0.55, 0.22]} color="#d2e3ea" />
      {mark && (
        <group position={[0, size[1] * 0.58, size[2] / 2 + 0.014]}>
          {[[-0.19, 0.13], [0, 0.13], [0.19, 0.13], [0, -0.06], [0, -0.25]].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0]}>
              <boxGeometry args={[0.16, 0.16, 0.04]} />
              <meshBasicMaterial color={i < 3 ? "#7147ff" : "#3ee8ff"} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

function CoolingTower({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  const points = useMemo(
    () => [
      new THREE.Vector2(0.72, 0),
      new THREE.Vector2(0.62, 0.25),
      new THREE.Vector2(0.44, 1.1),
      new THREE.Vector2(0.52, 1.8),
      new THREE.Vector2(0.64, 2.1),
    ],
    [],
  );
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <latheGeometry args={[points, 32]} />
      <meshStandardMaterial color={WHITE} roughness={0.76} />
    </mesh>
  );
}

function Truck({ position, rotation = 0 }: { position: Vec3; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box position={[0, 0.42, 0]} scale={[1.45, 0.62, 0.72]} />
      <Box position={[0.74, 0.36, 0]} scale={[0.55, 0.5, 0.68]} color="#d8e7ed" />
      {[-0.52, 0.62].flatMap((x) =>
        [-0.39, 0.39].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.11, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 12]} />
            <meshStandardMaterial color="#a8bec8" />
          </mesh>
        )),
      )}
    </group>
  );
}

function SolarField({ position }: { position: Vec3 }) {
  return (
    <group position={position} rotation={[0, -0.2, 0]}>
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, column) => {
          const gap = Math.abs(row - 3.5) + Math.abs(column - 3.5);
          return (
            <mesh
              key={`${row}-${column}`}
              position={[(column - 3.5) * 0.88, gap < 1.2 ? 0.22 : 0.08, (row - 3.5) * 0.88]}
              rotation={[-0.04, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.72, 0.12, 0.72]} />
              <meshStandardMaterial color={gap < 1.2 ? "#dffcff" : "#edf5f8"} emissive={gap < 1.2 ? BLUE : "#000000"} emissiveIntensity={gap < 1.2 ? 1.5 : 0} />
            </mesh>
          );
        }),
      )}
    </group>
  );
}

function Substation({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <Building position={[0, 0, 0]} size={[3.6, 1.65, 3]} />
      {[-1.15, -0.38, 0.38, 1.15].map((x) => (
        <group key={x} position={[x, 0, 2.15]}>
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 1.8, 12]} />
            <meshStandardMaterial color="#d2e2e8" />
          </mesh>
          <mesh position={[0, 1.83, 0]}>
            <coneGeometry args={[0.19, 0.38, 12]} />
            <meshStandardMaterial color={WHITE} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PixelArrow({ position }: { position: Vec3 }) {
  const cells = [
    [-2, 0], [-1, 0], [0, 0], [1, 0],
    [0, -1], [1, -1], [2, -1],
    [1, -2],
  ];
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.1) * 0.12;
  });
  return (
    <group ref={group} position={position} rotation={[0, -0.25, 0]}>
      {cells.map(([x, z], index) => (
        <mesh key={index} position={[x * 0.82, 0, z * 0.82]} castShadow>
          <boxGeometry args={[0.68, 0.32, 0.68]} />
          <meshStandardMaterial
            color={index === 2 || index === 5 ? "#d9fbff" : WHITE}
            emissive={index === 2 || index === 5 ? BLUE : "#000000"}
            emissiveIntensity={index === 2 || index === 5 ? 2.2 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Route({ points, color, active }: { points: Vec3[]; color: string; active: boolean }) {
  return (
    <Line
      points={points}
      color={active ? color : "#b9d2dc"}
      lineWidth={active ? 3 : 1.2}
      dashed
      dashScale={2.1}
      dashSize={0.72}
      gapSize={0.32}
      transparent
      opacity={active ? 0.95 : 0.38}
    />
  );
}

const cameraStops = [
  { pos: new THREE.Vector3(18, 19, 24), look: new THREE.Vector3(-2, 0, 0) },
  { pos: new THREE.Vector3(8, 13, 16), look: new THREE.Vector3(-7, 0, -3) },
  { pos: new THREE.Vector3(4, 12, 13), look: new THREE.Vector3(0, 0, 2) },
  { pos: new THREE.Vector3(-5, 14, 13), look: new THREE.Vector3(8, 0, -1) },
  { pos: new THREE.Vector3(16, 15, 17), look: new THREE.Vector3(14, 0, 8) },
];

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3());
  useFrame(() => {
    const scaled = Math.min(progress * 4, 3.999);
    const index = Math.floor(scaled);
    const mix = scaled - index;
    const next = Math.min(index + 1, cameraStops.length - 1);
    const targetPos = cameraStops[index].pos.clone().lerp(cameraStops[next].pos, mix);
    const targetLook = cameraStops[index].look.clone().lerp(cameraStops[next].look, mix);
    camera.position.lerp(targetPos, 0.055);
    look.current.lerp(targetLook, 0.07);
    camera.lookAt(look.current);
  });
  return null;
}

function World({ progress, active }: { progress: number; active: number }) {
  return (
    <>
      <color attach="background" args={["#dcecf3"]} />
      <fog attach="fog" args={["#dcecf3", 22, 48]} />
      <ambientLight intensity={2.25} />
      <hemisphereLight args={["#ffffff", "#a7c3cf", 1.5]} />
      <directionalLight position={[9, 18, 12]} intensity={2.8} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.04, 0]}>
        <planeGeometry args={[60, 46]} />
        <meshStandardMaterial color="#dcecf3" roughness={0.98} />
      </mesh>

      <Building position={[-8, 0, -4]} mark />
      <Building position={[-12, 0, -1]} size={[1.8, 3.8, 1.8]} />
      <Building position={[-4.6, 0, -7.5]} size={[2.4, 4.8, 2.4]} />
      <Building position={[-15, 0, -6]} size={[2.2, 1.6, 3.4]} />
      <CoolingTower position={[-1, 0, 0]} scale={1.2} />
      <CoolingTower position={[2, 0, 1.2]} scale={0.95} />
      <Truck position={[-6.2, 0, 4.2]} rotation={-0.25} />

      <Substation position={[4.7, 0, 2.2]} />
      <Building position={[0, 0, 6.6]} size={[3.2, 1.7, 2.7]} />
      <Building position={[4.5, 0, 7.2]} size={[2.1, 1.2, 2.8]} />
      <Truck position={[7.3, 0, 5.7]} rotation={0.8} />
      <Truck position={[10.8, 0, -5.5]} rotation={-0.6} />

      <Building position={[10.5, 0, -1.2]} size={[4.5, 2.5, 3.6]} />
      <Building position={[15.5, 0, -3.8]} size={[2.8, 3.2, 2.8]} />
      <CoolingTower position={[13.2, 0, 2]} />
      <CoolingTower position={[16.1, 0, 1.4]} scale={0.72} />
      <SolarField position={[15, 0, 8.5]} />
      <PixelArrow position={[14.3, 0.55, 8.2]} />

      {Array.from({ length: 23 }).map((_, i) => (
        <Worker
          key={i}
          position={[
            -12 + ((i * 17) % 29),
            0,
            -8 + ((i * 11) % 17),
          ]}
          color={i % 5 === 0 ? "#c4dbe5" : "#e7f1f4"}
        />
      ))}

      <Route
        active={active === 0}
        color={CORAL}
        points={[[-18, 0.12, -8], [-13, 0.12, -7], [-11, 0.12, -5], [-8, 0.12, -4]]}
      />
      <Route
        active={active === 1}
        color={BLUE}
        points={[[-8, 0.15, -4], [-5, 0.15, -1], [-2, 0.15, 1], [2, 0.15, 2], [4.7, 0.15, 2.2]]}
      />
      <Route
        active={active === 2}
        color={BLUE}
        points={[[4.7, 0.17, 2.2], [7, 0.17, 0], [9, 0.17, -0.5], [10.5, 0.17, -1.2]]}
      />
      <Route
        active={active === 3}
        color={BLUE}
        points={[[10.5, 0.2, -1.2], [12.5, 0.2, 2], [13, 0.2, 5], [14.3, 0.2, 8.2], [20, 0.2, 8.2]]}
      />
      <CameraRig progress={progress} />
    </>
  );
}

export default function IndustrialWorld({ progress, active }: { progress: number; active: number }) {
  return (
    <Canvas
      dpr={[1, 1.65]}
      camera={{ position: [18, 19, 24], fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      shadows
    >
      <World progress={progress} active={active} />
    </Canvas>
  );
}
