import React from "react";
import styles from "./Block.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

export const Block = () => {
  const gifs = [
    "/gif/1.gif",
    "/gif/2.gif",
    "/gif/3.gif",
    "/gif/4.gif",
    "/gif/5.gif",
    "/gif/6.gif",
    "/gif/7.gif",
    "/gif/8.gif",
    "/gif/9.gif",
    "/gif/10.gif",
    "/gif/11.gif",
    "/gif/12.gif",
    "/gif/13.gif",
    "/gif/14.gif",
    "/gif/15.gif",
    "/gif/16.gif",
  ];

  return (
    <div className={styles.gridContainer}>
      {gifs.map((src, index) => {
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
              unoptimized
              className={styles.image}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
