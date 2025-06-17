/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "../../../store/ModalStore";
import { loadStripe } from "@stripe/stripe-js";
import { IoMdMenu } from "react-icons/io";
import MobileHeader from "./MobileHeader/MobileHeader";
import PrimaryButton from "../../ui/primaryButton";
import { FaChevronDown } from "react-icons/fa";
import HoverBlock from "../../ui/hoverBlock";
import { useApplicationStore } from "../../../store/ApplicationStore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Header = () => {
  const router = useRouter();
  const { open } = useModalStore();

  const { version, fetchApplicationData } = useApplicationStore();

  useEffect(() => {
    fetchApplicationData();
  }, [fetchApplicationData]);

  const [isMobileHeader, setMobileHeader] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    {
      name: "Resources",
      onClick: null,
      chevron: true,
      links: [
        { name: "Contact", link: "mailto:support@wallper.app" },
        { name: "Download Wallper", link: "/download" },
        { name: "FAQ", link: "/faq" },
        { name: "Getting Started", link: "/" },
        { name: "Pro", link: "/pro" },
      ],
      videoIdx: 0,
    },

    {
      name: "Legal",
      onClick: null,
      chevron: true,
      links: [
        { name: "Cookie Policy", link: "/cookie" },
        { name: "Privacy Policy", link: "/policy" },
        { name: "Terms", link: "/terms" },
        { name: "Refund Policy", link: "/refund" },
        { name: "Subprocessors", link: "/subprocessors" },
      ],
      videoIdx: 2,
    },
    {
      name: "Videos",
      onClick: () => open("videos"),
      chevron: false,
    },
    {
      name: "Pro",
      link: "/pro",
      onClick: async () => {
        const metadata = {
          license_uuid: crypto.randomUUID(),
          user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          locale: navigator.language,
          device_type: /Mobi|Android/i.test(navigator.userAgent)
            ? "mobile"
            : "desktop",
          referrer: document.referrer || "direct",
        };

        const res = await fetch("/api/checkout_session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metadata }),
        });

        const data = await res.json();

        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
      },
      chevron: false,
    },
  ];

  return (
    <motion.header
      className={`${styles.header}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
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
            <h1 className={styles.title}>
              Wallper<span className={styles.version}>v{version}</span>
            </h1>
          </div>
        </button>

        <div className={styles.blocks}>
          <ul className={styles.ul}>
            {navItems.map((item, idx) => (
              <motion.li
                key={idx}
                className={styles.li}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
              >
                {item.link ? (
                  <Link className={styles.link} href={item.link}>
                    {item.name}
                  </Link>
                ) : item.chevron ? (
                  <button className={styles.button_link} onClick={item.onClick}>
                    {item.name}
                    <FaChevronDown color="#fff" size={10} />
                  </button>
                ) : (
                  <button className={styles.button_link} onClick={item.onClick}>
                    {item.name}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>

          <AnimatePresence>
            {hoveredIndex !== null && navItems[hoveredIndex]?.chevron && (
              <HoverBlock
                key={hoveredIndex}
                isVisible
                links={navItems[hoveredIndex].links}
                videoIdx={navItems[hoveredIndex].videoIdx}
                onMouseEnter={() => setHoveredIndex(hoveredIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            )}
          </AnimatePresence>
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
            iconSize={8}
            iconColor="#70757e"
            onClick={() => {
              router.push("/download");
            }}
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
