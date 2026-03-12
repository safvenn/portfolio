import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const Key = ({ position, width = 0.25, color = "#1a1a1a", emissive = "#3b82f6", label = "" }) => {
  const mesh = useRef();
  const [pressed, setPressed] = useState(false);
  
  useFrame((state) => {
    if (Math.random() > 0.999 && !pressed) {
      setPressed(true);
      setTimeout(() => setPressed(false), 150);
    }
    
    if (mesh.current) {
      const targetY = pressed ? -0.08 : 0;
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.2);
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh} castShadow>
        <boxGeometry args={[width, 0.15, 0.25]} />
        <meshStandardMaterial 
          color={color} 
          emissive={emissive} 
          emissiveIntensity={pressed ? 12 : 1.5}
          roughness={0.05}
          metalness={1}
        />
        {label && (
          <Text
            position={[0, 0.081, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.055}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        )}
      </mesh>
    </group>
  );
};

const KeyboardRows = () => {
  const group = useRef();
  const [currentColor, setCurrentColor] = useState('#3b82f6');
  
  const layout = useMemo(() => {
    const keys = [];
    const rows = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
      ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
    ];

    rows.forEach((row, rowIndex) => {
      const stagger = rowIndex * 0.08;
      row.forEach((label, keyIndex) => {
        keys.push({
          label,
          position: [keyIndex * 0.3 - 1.4 + stagger, 0, rowIndex * 0.3 - 0.5],
          width: 0.26,
          color: "#080808"
        });
      });
    });

    keys.push({ label: "ENT", position: [1.8, 0, 0.1], width: 0.6, color: "#1a0b0b", isSpecial: true }); 
    
    return keys;
  }, []);

  useFrame((state) => {
    const scroll = window.scrollY / (Math.max(document.documentElement.scrollHeight - window.innerHeight, 1));
    
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#3b82f6';
    if(themeColor !== currentColor) setCurrentColor(themeColor);

    // Balanced Scale for background presence
    group.current.scale.set(2.2, 2.2, 2.2);

    // Dynamic movement starting from perfect front-facing
    // Starts at 0, rotates into the previous tilted perspective
    group.current.rotation.x = scroll * Math.PI / 2.5; 
    group.current.rotation.y = scroll * Math.PI * 0.4;
    group.current.position.z = -1 + scroll * 6;
    group.current.position.x = 0 - scroll * 4; 
    group.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={group}>
      {layout.map((k, i) => (
        <Key key={i} {...k} emissive={k.isSpecial ? "#ff0000" : currentColor} />
      ))}
      <mesh position={[0.2, -0.12, 0]}>
        <boxGeometry args={[4, 0.1, 1.6]} />
        <meshStandardMaterial color="#020202" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
};

const KeyboardScene = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1, 
      pointerEvents: 'none',
      opacity: 0.7 
    }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 3, 7], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={3} castShadow />
        <pointLight position={[-10, -10, 10]} intensity={1.5} color="#8b5cf6" />
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
          <KeyboardRows />
        </Float>
      </Canvas>
    </div>
  );
};

export default KeyboardScene;
