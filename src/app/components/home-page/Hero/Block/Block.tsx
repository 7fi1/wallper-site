import React from "react";
import styles from "./Block.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

export const Block = () => {
  const jpgs = [
    "/jpg/1.jpg",
    "/jpg/2.jpg",
    "/jpg/3.jpg",
    "/jpg/4.jpg",
    "/jpg/5.jpg",
    "/jpg/6.jpg",
    "/jpg/7.jpg",
    "/jpg/8.jpg",
    "/jpg/9.jpg",
    "/jpg/10.jpg",
    "/jpg/11.jpg",
    "/jpg/12.jpg",
    "/jpg/13.jpg",
    "/jpg/14.jpg",
    "/jpg/15.jpg",
    "/jpg/16.jpg",
  ];

  return (
    <div className={styles.gridContainer}>
      {jpgs.map((src, index) => {
        const randomDelay = Math.random() * 0.6;
        const randomRotate = (Math.random() - 0.5) * 10; // rotate between -5 and +5 degrees

        return (
          <motion.div
            key={index}
            className={styles.imageContainer}
            initial={{
              opacity: 0,
              y: -150,
              rotate: randomRotate,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: randomDelay,
              type: "spring",
              stiffness: 90,
              damping: 14,
            }}
          >
            <Image
              src={src}
              width={1920}
              height={1080}
              quality={70}
              alt={`Mod ${index + 1}`}
              className={styles.image}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
