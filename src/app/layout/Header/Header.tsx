"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { Apple } from "react-ios-icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaKey } from "react-icons/fa";
import { useModalStore } from "../../../store/ModalStore";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const navItems = [
  {
    name: "PRO",
    link: "",
    onClick: async () => {
      const res = await fetch("/api/checkout_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  },
  { name: "FAQ", link: "/faq", onClick: null },
  { name: "Help", link: "/help", onClick: null },
];

const Header = () => {
  const router = useRouter();
  const { open } = useModalStore();
  const [totalVideos, setTotalVideos] = useState(0);

  const fetchVideos = async () => {
    try {
      const res = await fetch("api/bucketsStatus");
      const data = await res.json();
      setTotalVideos(data.totalVideos);
    } catch (err) {
      console.error("Failed to fetch video count", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.overflow} />

      <div className={styles.container}>
        <div className={styles.logo_container} onClick={() => router.push("/")}>
          <div className={styles.logo}>
            <Image
              alt="Wallper Logo"
              src="/logo/logo.png"
              width={1024}
              height={1024}
              className={styles.logo_image}
            />
            <h1 className={styles.title}>Wallper 4K Live</h1>
          </div>
        </div>

        <div className={styles.blocks}>
          <ul className={styles.ul}>
            {navItems.map((item, idx) => (
              <motion.li
                key={idx}
                className={styles.li}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
              >
                <Link
                  className={styles.link}
                  href={item.link}
                  onClick={item.onClick}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.button
            className={styles.download}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Apple className={styles.apple} />
            <span>Download for Mac</span>
          </motion.button>
        </div>
      </div>

      <div className={styles.status}>
        {[
          {
            label: (
              <>
                <FaKey size={10} />
                <span>My License keys</span>
              </>
            ),
            onClick: () => open("license"),
          },
          {
            label: <span>{totalVideos} videos</span>,
            onClick: () => open("videos"),
          },
          // {
          //   label: (
          //     <>
          //       <span>Data Bases status</span>
          //       <div className={styles.round} />
          //     </>
          //   ),
          // },
          // {
          //   label: (
          //     <>
          //       <span>Server status</span>
          //       <div className={styles.round} />
          //     </>
          //   ),
          // },
        ].map((block, idx) => (
          <motion.div
            key={idx}
            className={styles.status_container}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + idx * 0.1, duration: 0.4 }}
            onClick={block.onClick}
          >
            {block.label}
          </motion.div>
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
