"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];
const ICE = "#eff7f9";
const PALE = "#d7e8ed";
const STEEL = "#b7ced6";
const BLUE = "#19d4ef";
const SIGNAL = "#5948ff";
const CORAL = "#ff665d";

function Box({ position, scale, color = ICE, rotation = [0, 0, 0] }: { position: Vec3; scale: Vec3; color?: string; rotation?: Vec3 }) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow><boxGeometry args={scale}/><meshStandardMaterial color={color} roughness={0.68} metalness={0.04}/></mesh>;
}

function Road({ position, scale, rotation = 0 }: { position: Vec3; scale: Vec3; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box position={[0, 0, 0]} scale={scale} color="#c9dce2" />
      {Array.from({ length: 10 }).map((_, i) => <Box key={i} position={[(i - 4.5) * (scale[0] / 10), 0.016, 0]} scale={[scale[0] / 18, 0.015, 0.035]} color="#f7fbfc" />)}
    </group>
  );
}

function Worker({ position, vest = false }: { position: Vec3; vest?: boolean }) {
  return (
    <group position={position}>
      <mesh position={[0, .28, 0]} castShadow><capsuleGeometry args={[.065, .27, 4, 8]}/><meshStandardMaterial color={vest ? CORAL : "#c9dce3"}/></mesh>
      <mesh position={[0, .52, 0]} castShadow><sphereGeometry args={[.075, 12, 12]}/><meshStandardMaterial color="#f7fbfc"/></mesh>
      <Box position={[0, .57, 0]} scale={[.17, .04, .17]} color={vest ? "#ffffff" : "#b8ced6"}/>
    </group>
  );
}

function Building({ position, size = [2.8, 2.2, 2.4], marked = false }: { position: Vec3; size?: Vec3; marked?: boolean }) {
  const windows = [-.34, 0, .34];
  return (
    <group position={position}>
      <Box position={[0, size[1] / 2, 0]} scale={size}/>
      <Box position={[0, size[1] + .16, 0]} scale={[size[0] * .82, .32, size[2] * .82]} color="#deebef"/>
      {windows.map((x) => <Box key={x} position={[x * size[0], size[1] * .57, size[2] / 2 + .018]} scale={[size[0] * .17, .27, .035]} color="#b9d3dc"/>)}
      {[[-.25, -.25], [.25, -.25], [-.25, .25], [.25, .25]].map(([x, z], i) => <mesh key={i} position={[x * size[0], size[1] + .48, z * size[2]]}><cylinderGeometry args={[.1, .13, .64, 12]}/><meshStandardMaterial color={PALE}/></mesh>)}
      {marked && <group position={[0, size[1] * .62, size[2] / 2 + .04]}>{[[-.21, .12], [0, .12], [.21, .12], [0, -.09], [0, -.3]].map(([x, y], i) => <mesh key={i} position={[x, y, 0]}><boxGeometry args={[.16, .16, .045]}/><meshBasicMaterial color={i < 3 ? SIGNAL : BLUE}/></mesh>)}</group>}
    </group>
  );
}

function CoolingTower({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  const points = useMemo(() => [new THREE.Vector2(.75, 0), new THREE.Vector2(.63, .28), new THREE.Vector2(.43, 1.2), new THREE.Vector2(.5, 1.85), new THREE.Vector2(.66, 2.2)], []);
  return <mesh position={position} scale={scale} castShadow receiveShadow><latheGeometry args={[points, 40]}/><meshStandardMaterial color={ICE} roughness={.76}/></mesh>;
}

function Tank({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, .7, 0]} castShadow><cylinderGeometry args={[.72, .72, 1.4, 32]}/><meshStandardMaterial color={ICE} roughness={.66}/></mesh>
      <mesh position={[0, 1.42, 0]} castShadow><sphereGeometry args={[.72, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]}/><meshStandardMaterial color={ICE}/></mesh>
      <Line points={[[0, 1.45, 0], [0, 1.85, 0], [.7, 1.85, 0]]} color={STEEL} lineWidth={1.2}/>
    </group>
  );
}

function PipeRack({ position, rotation = 0 }: { position: Vec3; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[-2, -1, 0, 1, 2].map((x) => <group key={x} position={[x, 0, 0]}><Box position={[0, .8, -.48]} scale={[.09, 1.6, .09]} color={STEEL}/><Box position={[0, .8, .48]} scale={[.09, 1.6, .09]} color={STEEL}/><Box position={[0, 1.55, 0]} scale={[.09, .09, 1.05]} color={STEEL}/></group>)}
      {[-.32, 0, .32].map((z, i) => <mesh key={z} position={[0, 1.43 - i * .16, z]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.07, .07, 4.2, 12]}/><meshStandardMaterial color={i === 1 ? "#e1f7fa" : PALE}/></mesh>)}
    </group>
  );
}

function Substation({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <Building position={[0, 0, 0]} size={[3.8, 1.55, 2.8]}/>
      {[-1.35, -.45, .45, 1.35].map((x) => <group key={x} position={[x, 0, 2]}><mesh position={[0, .8, 0]}><cylinderGeometry args={[.09, .14, 1.6, 12]}/><meshStandardMaterial color={STEEL}/></mesh><mesh position={[0, 1.72, 0]}><coneGeometry args={[.17, .4, 12]}/><meshStandardMaterial color={ICE}/></mesh><Line points={[[-.35, 1.5, 0], [.35, 1.5, 0]]} color="#a7c1ca" lineWidth={1}/></group>)}
    </group>
  );
}

function Pylon({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Line points={[[-.7, 0, 0], [-.25, 3.2, 0], [.25, 3.2, 0], [.7, 0, 0], [-.7, 0, 0]]} color="#adc6cf" lineWidth={1}/>
      {[.8, 1.55, 2.3].map((y, i) => <Line key={y} points={[[-.58 + i * .1, y, 0], [.58 - i * .1, y, 0]]} color="#adc6cf" lineWidth={1}/>) }
      <Line points={[[-.62, 2.6, 0], [.62, 2.6, 0]]} color="#adc6cf" lineWidth={1}/>
      <Line points={[[-.45, 1.85, 0], [.45, 1.85, 0]]} color="#adc6cf" lineWidth={1}/>
    </group>
  );
}

function Truck({ position, rotation = 0, signal = false }: { position: Vec3; rotation?: number; signal?: boolean }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box position={[-.24, .42, 0]} scale={[1.2, .65, .75]} color={signal ? "#e4fbfd" : ICE}/><Box position={[.68, .37, 0]} scale={[.58, .53, .7]} color={signal ? BLUE : PALE}/>
      {[-.52, .52].flatMap((x) => [-.38, .38].map((z) => <mesh key={`${x}-${z}`} position={[x, .12, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.14, .14, .08, 14]}/><meshStandardMaterial color="#8eabb5"/></mesh>))}
    </group>
  );
}

function SolarField({ position }: { position: Vec3 }) {
  return <group position={position} rotation={[0, -.25, 0]}>{Array.from({ length: 7 }).map((_, r) => Array.from({ length: 7 }).map((__, c) => <mesh key={`${r}-${c}`} position={[(c - 3) * .82, .12, (r - 3) * .82]} rotation={[-.08, 0, 0]} castShadow><boxGeometry args={[.68, .1, .68]}/><meshStandardMaterial color={(r + c) % 6 === 0 ? "#cdfaff" : "#e7f2f5"} emissive={(r + c) % 6 === 0 ? BLUE : "#000"} emissiveIntensity={(r + c) % 6 === 0 ? .8 : 0}/></mesh>))}</group>;
}

function PixelArrow({ position }: { position: Vec3 }) {
  const cells = [[-2, 0], [-1, 0], [0, 0], [1, 0], [0, -1], [1, -1], [2, -1], [1, -2]];
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (group.current) group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2) * .1; });
  return <group ref={group} position={position} rotation={[0, -.25, 0]}>{cells.map(([x, z], i) => <mesh key={i} position={[x * .78, 0, z * .78]} castShadow><boxGeometry args={[.65, .28, .65]}/><meshStandardMaterial color={i === 2 || i === 5 ? "#d6fcff" : ICE} emissive={i === 2 || i === 5 ? BLUE : "#000"} emissiveIntensity={i === 2 || i === 5 ? 2.4 : 0}/></mesh>)}</group>;
}

function Route({ points, color, active, delay = 0 }: { points: Vec3[]; color: string; active: boolean; delay?: number }) {
  const pulse = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), [points]);
  useFrame(({ clock }) => { if (pulse.current) pulse.current.position.copy(curve.getPointAt((clock.elapsedTime * .12 + delay) % 1)); });
  return (
    <group>
      <Line points={points} color={active ? color : "#a9c8d2"} lineWidth={active ? 3.2 : 1} dashed dashScale={2.3} dashSize={.72} gapSize={.28} transparent opacity={active ? .98 : .24}/>
      <mesh ref={pulse} visible={active}><sphereGeometry args={[.105, 16, 16]}/><meshBasicMaterial color={color}/><pointLight color={color} intensity={2.4} distance={1.8}/></mesh>
    </group>
  );
}

const stops = [
  { pos: new THREE.Vector3(18, 17, 24), look: new THREE.Vector3(-1, 0, 0) },
  { pos: new THREE.Vector3(7, 11, 15), look: new THREE.Vector3(-8, 0, -4) },
  { pos: new THREE.Vector3(3, 10, 13), look: new THREE.Vector3(1, 0, 2) },
  { pos: new THREE.Vector3(-3, 12, 13), look: new THREE.Vector3(10, 0, -1) },
  { pos: new THREE.Vector3(15, 13, 18), look: new THREE.Vector3(15, 0, 8) },
];

function CameraRig({ progress }: { progress: number }) {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3());
  useFrame(() => {
    const raw = THREE.MathUtils.clamp(progress * 4, 0, 3.999);
    const index = Math.floor(raw);
    const mix = THREE.MathUtils.smoothstep(raw - index, 0, 1);
    const next = Math.min(index + 1, stops.length - 1);
    const target = stops[index].pos.clone().lerp(stops[next].pos, mix);
    target.x += pointer.x * .28; target.y += pointer.y * .18;
    const targetLook = stops[index].look.clone().lerp(stops[next].look, mix);
    camera.position.lerp(target, .045); look.current.lerp(targetLook, .06); camera.lookAt(look.current);
  });
  return null;
}

function World({ progress, active }: { progress: number; active: number }) {
  const routeA: Vec3[] = [[-18, .12, -8], [-14, .12, -7], [-11, .12, -5], [-8, .12, -4]];
  const routeB: Vec3[] = [[-8, .14, -4], [-5, .14, -1], [-2, .14, 1], [2, .14, 2], [5, .14, 2.2]];
  const routeC: Vec3[] = [[5, .16, 2.2], [7, .16, .2], [9, .16, -.5], [11, .16, -1.2]];
  const routeD: Vec3[] = [[11, .18, -1.2], [12.5, .18, 2], [13.2, .18, 5], [14.5, .18, 8.2], [20, .18, 8.2]];
  return (
    <>
      <color attach="background" args={["#d9eaf0"]}/><fog attach="fog" args={["#d9eaf0", 23, 52]}/>
      <ambientLight intensity={1.9}/><hemisphereLight args={["#ffffff", "#9dbbc6", 1.35]}/><directionalLight position={[8, 18, 10]} intensity={3.2} color="#ffffff" castShadow shadow-mapSize={[2048, 2048]}/>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -.08, 0]}><planeGeometry args={[68, 50]}/><meshStandardMaterial color="#d9eaf0" roughness={.98}/></mesh>
      <gridHelper args={[64, 64, "#bfd7df", "#cfe1e7"]} position={[0, -.04, 0]}/>
      <Road position={[0, .01, 4.2]} scale={[38, .025, 2.1]}/><Road position={[4.6, .012, 0]} scale={[30, .026, 1.8]} rotation={Math.PI / 2}/>

      <Building position={[-9, 0, -4.8]} marked/><Building position={[-13, 0, -1]} size={[2, 4, 2]}/><Building position={[-5, 0, -8]} size={[2.6, 4.9, 2.4]}/>
      <PipeRack position={[-11, 0, -8]} rotation={.1}/><Tank position={[-15, 0, -6]}/><Tank position={[-13.3, 0, -6.2]} scale={.75}/><Truck position={[-6.4, 0, 4.2]} rotation={-.2} signal/>

      <CoolingTower position={[-1, 0, -.4]} scale={1.22}/><CoolingTower position={[2, 0, 1]} scale={.94}/><Substation position={[5, 0, 2.2]}/><PipeRack position={[2, 0, -4]} rotation={Math.PI / 2}/>
      <Building position={[0, 0, 6.8]} size={[3.4, 1.8, 2.8]}/><Building position={[4.7, 0, 7.4]} size={[2.2, 1.25, 3]}/><Truck position={[7.4, 0, 5.8]} rotation={.8}/>

      <Building position={[11, 0, -1.2]} size={[4.8, 2.6, 3.8]}/><Building position={[16, 0, -4]} size={[2.9, 3.3, 2.8]}/><Tank position={[14.5, 0, -6]} scale={1.1}/><CoolingTower position={[13.5, 0, 2]} /><CoolingTower position={[16.2, 0, 1.4]} scale={.72}/>
      <Pylon position={[18, 0, -8]}/><Pylon position={[10, 0, -8]} scale={.8}/><SolarField position={[15.2, 0, 8.7]}/><PixelArrow position={[14.5, .55, 8.4]}/>

      {Array.from({ length: 34 }).map((_, i) => <Worker key={i} position={[-15 + ((i * 17) % 33), 0, -9 + ((i * 11) % 19)]} vest={i % 7 === 0}/>) }
      <Route active={active === 0} color={CORAL} points={routeA}/><Route active={active === 1} color={BLUE} points={routeB} delay={.18}/><Route active={active === 2} color={SIGNAL} points={routeC} delay={.34}/><Route active={active === 3} color={BLUE} points={routeD} delay={.52}/>
      <CameraRig progress={progress}/>
    </>
  );
}

export default function IndustrialWorld({ progress, active }: { progress: number; active: number }) {
  return <Canvas dpr={[1, 1.65]} camera={{ position: [18, 17, 24], fov: 35, near: .1, far: 110 }} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} shadows><World progress={progress} active={active}/></Canvas>;
}
