import React from "react";
import { motion } from "framer-motion";
import styles from "./Metrics.module.css";

const blockVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Metrics = () => {
  const blocks = [
    {
      class: styles.apple,
      image: styles.apple_image,
      title: "GPU Accelerated",
      text: "Seamless playback of 4K video and interactive scenes",
    },
    {
      class: styles.usage,
      image: styles.usage_image,
      title: "Live Stats",
      text: "Real-time performance monitoring built in",
    },
    {
      class: styles.native,
      image: styles.native_image,
      title: "macOS Native",
      text: "Crafted with SwiftUI and Metal — no Electron",
    },
    {
      class: styles.opensource,
      image: styles.opensource_image,
      title: "Open Source",
      text: "Built in public — free to explore on GitHub",
    },
  ];

  return (
    <section className={styles.metrics}>
      <div className={styles.container}>
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            className={`${styles.block} ${block.class}`}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={blockVariants}
          >
            <div className={`${block.image} ${styles.image}`}></div>
            <h1>{block.title}</h1>
            <span>{block.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Metrics;
