import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

function PredictionBars({ forecastData }: { forecastData: any[] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {forecastData.map((data, index) => (
        <Box
          key={index}
          position={[index * 0.8 - 4, data.aqi / 50, 0]}
          args={[0.6, data.aqi / 25, 0.6]}
        >
          <meshStandardMaterial color={data.aqi > 75 ? '#EF4444' : data.aqi > 50 ? '#F59E0B' : '#10B981'} />
        </Box>
      ))}
    </group>
  );
}

const PredictionVisualization = ({ forecastData }: { forecastData: any[] }) => {
  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} />
      <PredictionBars forecastData={forecastData} />
    </Canvas>
  );
};

export default PredictionVisualization;