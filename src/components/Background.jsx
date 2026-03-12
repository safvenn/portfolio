import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleField = ({ color, size, speed, radius, count }) => {
  const ref = useRef();
  const spheres = useMemo(() => random.inSphere(new Float32Array(count), { radius }), [radius, count]);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / (10 * speed);
    ref.current.rotation.y -= delta / (15 * speed);
    
    // Add subtle floating motion
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={spheres} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending for glow
        />
      </Points>
    </group>
  );
};

const BackgroundScene = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <fog attach="fog" args={['#020204', 0, 2]} />
        <color attach="background" args={['#010103']} />
        <ParticleField color="#3b82f6" size={0.005} speed={1} radius={1.5} count={4000} />
        <ParticleField color="#8b5cf6" size={0.003} speed={0.5} radius={1.2} count={2000} />
        <ParticleField color="#ffffff" size={0.002} speed={2} radius={1.8} count={1000} />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
