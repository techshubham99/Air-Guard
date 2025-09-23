import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple earth-like gradient
      const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, '#4a90e2');
      gradient.addColorStop(0.3, '#2c5aa0');
      gradient.addColorStop(0.7, '#1e3a8a');
      gradient.addColorStop(1, '#0f172a');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add some continents-like shapes
      ctx.fillStyle = '#10b981';
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(150, 200, 60, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(350, 150, 40, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(200, 350, 80, 40, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <Sphere ref={meshRef} args={[2, 64, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        map={earthTexture}
        distort={0.1}
        speed={1}
        roughness={0.2}
        metalness={0.1}
      />
    </Sphere>
  );
}

const Earth3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
      <Earth />
    </Canvas>
  );
};

export default Earth3D;