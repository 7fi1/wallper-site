"use client";
import { motion } from "framer-motion";
import React, { Suspense, useEffect } from "react";
import styles from "./Hero.module.css";
import { FaChevronRight } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import PrimaryButton from "@/src/app/ui/primaryButton";
import SecondaryButton from "@/src/app/ui/secondaryButton";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Hero = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  function Model() {
    const gltf = useGLTF("/models/hero.glb");

    useEffect(() => {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (
                mat instanceof THREE.MeshStandardMaterial ||
                mat instanceof THREE.MeshPhysicalMaterial
              ) {
                mat.roughness = 0;
                mat.metalness = 1;
                mat.needsUpdate = true;
              }
            });
          } else {
            const mat = mesh.material;
            if (
              mat instanceof THREE.MeshStandardMaterial ||
              mat instanceof THREE.MeshPhysicalMaterial
            ) {
              mat.roughness = 0;
              mat.metalness = 1;
              mat.needsUpdate = true;
            }
          }
        }
      });
    }, [gltf]);

    return (
      <primitive object={gltf.scene} scale={2.5} position={[1.5, -1, 0]} />
    );
  }

  function SetExposure() {
    const { gl } = useThree();
    useEffect(() => {
      gl.toneMappingExposure = 1;
    }, [gl]);
    return null;
  }

  return (
    <section className={styles.top}>
      <motion.div
        className={styles.greed}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.text}>
          <button className={styles.vote}>
            Help Wallper on Product Hunt{" "}
            <FaChevronRight color="#70757e" size={10} />
          </button>
          <motion.h1 layout>
            <span>Live Wallpapers</span>
            <div className={styles.flex_row}>
              <span>now for your Mac</span>
              <motion.div
                className={styles.title_box}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              ></motion.div>
            </div>
          </motion.h1>

          <motion.p layout>
            A collection of powerful productivity tools all within an extendable
            launcher. Fast, ergonomic and reliable.
          </motion.p>

          <motion.div
            className={styles.container_greed}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className={styles.buttons}>
              <PrimaryButton
                text="Get started"
                icon="FaChevronRight"
                iconPosition="right"
                iconSize={10}
                buttonSize={48}
                fontSize={16}
                fontWeight={500}
                iconColor="#70757e"
              />
              <SecondaryButton
                text="PRO for 9.99$"
                icon="FaChevronRight"
                iconPosition="right"
                iconSize={10}
                buttonSize={48}
                fontSize={16}
                fontWeight={500}
                iconColor="#70757e"
                onClick={async () => {
                  const res = await fetch("/api/checkout_session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  });

                  const data = await res.json();

                  const stripe = await stripePromise;
                  await stripe?.redirectToCheckout({
                    sessionId: data.sessionId,
                  });
                }}
              />
            </div>
            <motion.div className={styles.spans} layout>
              <span>v1.0.0 release</span>
              <span>macOS 14+</span>
              <span>App Store soon!</span>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.model_wrapper}>
          <Canvas
            camera={{ position: [5, 2, 5], fov: 50 }}
            shadows
            gl={{
              toneMapping: THREE.ACESFilmicToneMapping,
              outputColorSpace: THREE.SRGBColorSpace,
            }}
          >
            <SetExposure />
            <ambientLight intensity={10} />
            <directionalLight
              castShadow
              position={[5, 10, 5]}
              intensity={2000}
              color={"#fff"}
            />

            <pointLight
              position={[-10, 10, -10]}
              intensity={0.4}
              color="#red"
            />
            <spotLight
              position={[0, 20, 0]}
              angle={0.3}
              penumbra={1}
              intensity={10}
              castShadow
            />
            <Suspense fallback={null}>
              <Model />
              <Environment preset="lobby" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              target={[1.5, -1, 0]}
              autoRotate
              autoRotateSpeed={2}
            />
          </Canvas>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
