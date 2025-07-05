import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Ui.module.css";
import { HoverBloсkProps } from "../types";
import Link from "next/link";
import { motion } from "framer-motion";

const HoverBlock = ({
  isVisible,
  links,
  onMouseEnter,
  onMouseLeave,
}: HoverBloсkProps) => {
  const ref = useRef<HTMLDivElement>(null);

  if (!isVisible || typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <motion.div
      ref={ref}
      className={styles.hover_block}
      initial={{ opacity: 0, scale: 0.95, y: -5, x: "-50%" }}
      animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.block}>
        {links.map((link, idx) => (
          <Link href={link.link} key={idx} className={styles.hover_link}>
            {link.name}
          </Link>
        ))}
      </div>
    </motion.div>,
    document.body
  );
};

export default HoverBlock;
