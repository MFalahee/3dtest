import React, { useRef, useEffect, Suspense } from "react";
import { Loader, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "react-three-fiber";
import { Canvas, useFrame } from "react-three-fiber";
import { useBox } from "@react-three/cannon";
import { useSphere } from "@react-three/cannon";
import OfficeModel from "./OfficeModel";
// import Model from "./Model";

const Scene = () => {
  function PreLoadScene() {
    useGLTF.preload("/office.glb");
    return null;
  }
  function SetupCamera() {
    const { camera } = useThree();
    camera.position.set(0, 0, 0);
    useFrame((state, delta) => {
      console.log("camera", camera.position);
    });
    camera.lookAt(2, 0, -2);
    return null;
  }
  return (
    <>
      <Canvas
        frameloop="always"
        // list of props:
        //
        //
        //
        //
        camera={{ position: [2, 0, 0], fov: 50 }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.setClearColor("white");
          console.log(gl);
        }}
      >
        <Suspense fallback={null}>
          <SetupCamera />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} />
          <OfficeModel />
          <PreLoadScene />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default Scene;
