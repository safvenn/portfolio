import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, MeshDistortMaterial, Trail } from '@react-three/drei';
import * as THREE from 'three';

const CodeLine = ({ position, color, speed }) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.position.y += speed;
    if (ref.current.position.y > 1) ref.current.position.y = -1;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.4, 0.02, 0.01]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
    </mesh>
  );
};

const CodingHologram = () => {
  const group = useRef();
  
  // Create animated "code" particles
  const lines = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 0.5],
      color: Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6",
      speed: 0.005 + Math.random() * 0.01
    }));
  }, []);

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={group}>
      {/* Futuristic Monitor/Screen */}
      <RoundedBox args={[1.8, 1.2, 0.05]} radius={0.05} smoothness={4}>
        <MeshDistortMaterial
          color="#111"
          speed={2}
          distort={0.1}
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.4}
        />
      </RoundedBox>
      
      {/* Light coming from screen */}
      <rectAreaLight width={2} height={1.5} intensity={5} color="#3b82f6" position={[0, 0, 0.1]} />

      {/* Floating Code Lines */}
      {lines.map((line, i) => (
        <CodeLine key={i} {...line} />
      ))}

      {/* Screen Frame Glow */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[1.85, 1.25, 0.02]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
};

const DeveloperScene = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#8b5cf6" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <CodingHologram />
        </Float>
      </Canvas>
    </div>
  );
};

export default DeveloperScene;
