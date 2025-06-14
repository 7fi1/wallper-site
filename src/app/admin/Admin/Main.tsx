/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "@/src/app/layout/Footer/Footer";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export const Admin = ({ children }) => {
  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Moderate", href: "/admin/moderate" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <>
      <div className={styles.main_admin}>
        <aside className={styles.sidebar}>
          <ul className={styles.sidebar_links}>
            {links.map((link) => (
              <li key={link.name} className={styles.sidebar_link}>
                <Link href={link.href} className={styles.link}>
                  {link.name}
                  <FaChevronRight className={styles.icon} size={10} />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </>
  );
};
