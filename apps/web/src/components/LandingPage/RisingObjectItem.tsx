import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

type Props = {
  object: THREE.Object3D;
};

export const RisingObjectItem = ({ object }: Props) => {
  const ref = useRef<THREE.Object3D>(null);
  const [hovered, setHovered] = useState(false);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = object.position.y + object.userData.hoverYOffset;
      if (hovered && !isDragging.current) {
        ref.current.rotation.y += 0.03;
      }
    }
  });

  return (
    <primitive
      ref={ref}
      object={object}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        isDragging.current = false;
      }}
      onPointerDown={(e) => {
        isDragging.current = true;
        lastPointerX.current = e.clientX;
        object.userData.jumpVelocity = 0.1;
        e.stopPropagation();
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerMove={(e) => {
        if (isDragging.current && ref.current) {
          const deltaX = e.clientX - lastPointerX.current;
          ref.current.rotation.y += deltaX * 0.005;
          lastPointerX.current = e.clientX;
        }
      }}
      cursor={hovered ? 'grab' : 'pointer'}
    />
  );
};
