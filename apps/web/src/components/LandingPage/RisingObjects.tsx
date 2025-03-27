import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { RisingObjectItem } from '@web/components/LandingPage/RisingObjectItem';

const modelPaths = [
  '/assets/3d/test2.glb',
  '/assets/3d/test3.glb',
  '/assets/3d/test4.glb',
];

type Props = {
  count?: number;
};

export const RisingObjects = ({ count = 15 }: Props) => {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const models = useMemo(() => {
    return modelPaths.map((path) => useGLTF(path).scene.clone());
  }, []);

  const objects = useMemo(() => {
    const widthFactor = 20;
    const depthFactor = 30;
    const heightFactor = 15;

    return Array.from({ length: count }, () => {
      const model = models[Math.floor(Math.random() * models.length)].clone();
      const xPos = (Math.random() - 0.5) * widthFactor * 3;
      const zPos = (Math.random() - 0.5) * depthFactor * 2;
      const yPos = (Math.random() - 0.5) * heightFactor * 2;

      model.position.set(xPos, yPos, zPos);
      model.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      model.userData = {
        riseSpeed: 0.2 + Math.random() * 0.3,
        driftX: (Math.random() - 0.5) * 0.03,
        driftZ: (Math.random() - 0.5) * 0.03,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        maxHeight: 25 + Math.random() * 10,
        originalX: xPos,
        hoverYOffset: 0,
        jumpVelocity: 0,
      };

      return model;
    });
  }, [models, count, viewport]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (!groupRef.current) return;

    objects.forEach((obj) => {
      const userData = obj.userData;

      obj.position.y += userData.riseSpeed * 0.1;
      obj.position.x += Math.sin(time * 0.5 + obj.position.z) * userData.driftX;
      obj.position.z += Math.cos(time * 0.5 + obj.position.x) * userData.driftZ;

      obj.rotation.x += userData.rotationSpeed.x;
      obj.rotation.y += userData.rotationSpeed.y;
      obj.rotation.z += userData.rotationSpeed.z;

      if (userData.hoverYOffset > 0 || userData.jumpVelocity > 0) {
        userData.jumpVelocity -= 0.03;
        userData.hoverYOffset += userData.jumpVelocity;

        if (userData.hoverYOffset < 0) {
          userData.hoverYOffset = 0;
          userData.jumpVelocity = 0;
        }
      }

      if (obj.position.y > userData.maxHeight) {
        obj.position.y = -15 - Math.random() * 10;
        obj.position.x = userData.originalX + (Math.random() - 0.5) * 2;
        obj.position.z = (Math.random() - 0.5) * 30 - 8;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <RisingObjectItem key={i} object={obj} />
      ))}
    </group>
  );
};
