import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle system for atmospheric effects
function AtmosphericParticles({ aqi }: { aqi: number }) {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 2000;
  
  const particles = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      temp[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = radius * Math.cos(phi);
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  const getParticleColor = (aqi: number) => {
    if (aqi <= 50) return '#10B981';
    if (aqi <= 100) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={getParticleColor(aqi)}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Earth core
function EarthCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 32, 32]}>
      <meshPhongMaterial
        color="#4F46E5"
        shininess={100}
        specular="#ffffff"
        opacity={0.9}
        transparent
      />
    </Sphere>
  );
}

// Atmospheric layers
function AtmosphericLayers({ aqi }: { aqi: number }) {
  const troposphereRef = useRef<THREE.Mesh>(null);
  const stratosphereRef = useRef<THREE.Mesh>(null);
  const mesosphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (troposphereRef.current) {
      troposphereRef.current.rotation.y += 0.008;
    }
    if (stratosphereRef.current) {
      stratosphereRef.current.rotation.y -= 0.006;
    }
    if (mesosphereRef.current) {
      mesosphereRef.current.rotation.y += 0.004;
    }
  });

  const getLayerColor = (aqi: number, layer: string) => {
    const baseColors = {
      troposphere: aqi <= 50 ? '#10B981' : aqi <= 100 ? '#F59E0B' : '#EF4444',
      stratosphere: '#3B82F6',
      mesosphere: '#8B5CF6'
    };
    return baseColors[layer as keyof typeof baseColors];
  };

  return (
    <>
      {/* Troposphere */}
      <Sphere ref={troposphereRef} args={[2, 32, 32]}>
        <MeshDistortMaterial
          color={getLayerColor(aqi, 'troposphere')}
          distort={0.4}
          speed={1.5}
          roughness={0.3}
          metalness={0.1}
          opacity={0.3}
          transparent
        />
      </Sphere>
      
      {/* Stratosphere */}
      <Sphere ref={stratosphereRef} args={[2.8, 32, 32]}>
        <MeshDistortMaterial
          color={getLayerColor(aqi, 'stratosphere')}
          distort={0.2}
          speed={1}
          roughness={0.4}
          metalness={0.2}
          opacity={0.2}
          transparent
        />
      </Sphere>
      
      {/* Mesosphere */}
      <Sphere ref={mesosphereRef} args={[3.6, 32, 32]}>
        <MeshDistortMaterial
          color={getLayerColor(aqi, 'mesosphere')}
          distort={0.1}
          speed={0.5}
          roughness={0.5}
          metalness={0.3}
          opacity={0.1}
          transparent
        />
      </Sphere>
    </>
  );
}

// Pollution clouds based on AQI
function PollutionClouds({ aqi }: { aqi: number }) {
  const cloudRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    cloudRefs.current.forEach((cloud, index) => {
      if (cloud) {
        cloud.rotation.y += (0.01 + index * 0.005) * (aqi / 100);
        cloud.position.y = Math.sin(state.clock.elapsedTime + index) * 0.3;
      }
    });
  });

  const cloudCount = Math.min(Math.floor(aqi / 15), 8);
  
  return (
    <>
      {Array.from({ length: cloudCount }, (_, i) => (
        <Sphere
          key={i}
          ref={(ref) => {
            if (ref && cloudRefs.current) {
              cloudRefs.current[i] = ref;
            }
          }}
          args={[0.3 + Math.random() * 0.2, 16, 16]}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 6
          ]}
        >
          <meshLambertMaterial
            color={aqi > 100 ? '#DC2626' : aqi > 50 ? '#D97706' : '#6B7280'}
            opacity={0.4}
            transparent
          />
        </Sphere>
      ))}
    </>
  );
}

const AtmosphereVisualization = ({ aqi }: { aqi: number }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        {/* Enhanced lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />
        
        {/* Earth and atmosphere layers */}
        <EarthCore />
        <AtmosphericLayers aqi={aqi} />
        <AtmosphericParticles aqi={aqi} />
        <PollutionClouds aqi={aqi} />
      </Canvas>
      
      {/* Overlay information */}
      <div className="absolute top-4 left-4 text-white">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <div className="text-sm font-medium mb-1">Atmospheric Status</div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: aqi <= 50 ? '#10B981' : aqi <= 100 ? '#F59E0B' : '#EF4444' }}
            />
            <span className="text-xs">AQI: {aqi}</span>
          </div>
        </div>
      </div>
      
      {/* Layer legend */}
      <div className="absolute bottom-4 right-4 text-white">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs font-medium mb-2">Atmospheric Layers</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Troposphere</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Stratosphere</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Mesosphere</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtmosphereVisualization;