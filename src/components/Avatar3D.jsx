import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, RoundedBox, Cylinder } from '@react-three/drei';

const Character = () => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 6;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial 
          color="#0a0a0f" 
          metalness={0.9} 
          roughness={0.1}
          distort={0.15}
          speed={2}
        />
      </Sphere>
      
      <RoundedBox args={[1.4, 0.4, 0.5]} position={[0, 0.2, 0.9]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.12, 0.1]} position={[0, 0.2, 1.15]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={3} />
      </RoundedBox>

      <Cylinder args={[1.4, 1.4, 0.05, 32]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} wireframe />
      </Cylinder>
      <Cylinder args={[1.6, 1.6, 0.02, 32]} position={[0, -1.6, 0]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} wireframe />
      </Cylinder>
    </group>
  );
};

const Avatar3D = () => {
  return (
    <div style={{ position: 'absolute', top: 0, right: '-5%', width: '60%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      {/* We set pointerEvents to auto on Canvas so it can track mouse */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'auto' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#c084fc" />
        <pointLight position={[-10, 5, -10]} intensity={1} color="#3b82f6" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Character />
        </Float>
      </Canvas>
    </div>
  );
};

export default Avatar3D;
