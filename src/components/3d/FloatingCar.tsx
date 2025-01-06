import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';

export function FloatingCar() {
  const carRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!carRef.current) return;
    carRef.current.rotation.y += 0.01;
    carRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={carRef}>
      <Box args={[3, 1, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00b4d8" />
      </Box>
      <Sphere args={[0.3, 16, 16]} position={[-1, -0.5, 0.6]}>
        <meshStandardMaterial color="#333" />
      </Sphere>
      <Sphere args={[0.3, 16, 16]} position={[1, -0.5, 0.6]}>
        <meshStandardMaterial color="#333" />
      </Sphere>
      <Sphere args={[0.3, 16, 16]} position={[-1, -0.5, -0.6]}>
        <meshStandardMaterial color="#333" />
      </Sphere>
      <Sphere args={[0.3, 16, 16]} position={[1, -0.5, -0.6]}>
        <meshStandardMaterial color="#333" />
      </Sphere>
    </group>
  );
}