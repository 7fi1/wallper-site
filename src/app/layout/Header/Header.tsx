/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "../../../store/ModalStore";
import { loadStripe } from "@stripe/stripe-js";
import { IoMdMenu } from "react-icons/io";
import MobileHeader from "./MobileHeader/MobileHeader";
import PrimaryButton from "../../ui/primaryButton";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Header = () => {
  const router = useRouter();
  const { open } = useModalStore();
  const [totalVideos, setTotalVideos] = useState(0);
  const [isMobileHeader, setMobileHeader] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // 🆕

  const fetchVideos = async () => {
    try {
      const res = await fetch("api/bucketsStatus");
      const data = await res.json();
      setTotalVideos(data.totalVideos);
    } catch (err) {
      console.error("Failed to fetch video count", err);
    }
  };

  const navItems = [
    {
      name: "Features",
      link: "",
      onClick: () => open("videos"),
      chevron: true,
    },
    { name: "Company", link: "/", onClick: null, chevron: true },
    {
      name: "Videos",
      link: "",
      onClick: () => open("videos"),
      chevron: false,
    },
    {
      name: "PRO",
      link: "/",
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
      chevron: false,
    },
    { name: "Help", link: "/help", onClick: null },
  ];

  return (
    <motion.header
      className={`${styles.header} ${hasScrolled ? styles.scrolled : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.overflow} />

      <MobileHeader
        isOpen={isMobileHeader}
        onClose={() => setMobileHeader(false)}
      />

      <div className={styles.container}>
        <button
          className={styles.logo_container}
          onClick={() => router.push("/")}
        >
          <div className={styles.logo}>
            {/* <Image
              alt="Wallper Logo"
              src="/logo/logo.png"
              width={1024}
              height={1024}
              className={styles.logo_image}
            /> */}
            <h1 className={styles.title}>Wallper</h1>
          </div>
        </button>

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
                {item.chevron && <FaChevronDown color="#70757e" size={10} />}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={styles.left_header}>
          <button
            onClick={() => open("license")}
            className={`${styles.link} ${styles.license}`}
          >
            My License Keys
          </button>
          <PrimaryButton
            text="Get Started"
            icon="FaChevronRight"
            iconPosition="right"
            popupMessage="Download"
            popupButton="D"
            iconSize={8}
            iconColor="#70757e"
          />
        </div>

        <button
          type="button"
          className={styles.menu}
          onClick={() => setMobileHeader(true)}
          aria-label="Open mobile menu"
        >
          <IoMdMenu size={20} />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
