import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const CameraMovement = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime();
    camera.position.x = Math.sin(time * 0.15) * 1.5;
    camera.position.y = Math.sin(time * 0.1) * 1;
    camera.lookAt(0, 10, -10);
  });

  return <group ref={groupRef} />;
};
