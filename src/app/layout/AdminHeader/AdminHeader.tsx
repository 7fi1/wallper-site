/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./AdminHeader.module.css";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "../../../store/ModalStore";
import { loadStripe } from "@stripe/stripe-js";
import { IoMdMenu } from "react-icons/io";
import PrimaryButton from "../../ui/primaryButton";
import { FaChevronDown } from "react-icons/fa";
import HoverBlock from "../../ui/hoverBlock";
import { useApplicationStore } from "../../../store/ApplicationStore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const AdminHeader = () => {
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
      </div>
    </motion.header>
  );
};

export default AdminHeader;
