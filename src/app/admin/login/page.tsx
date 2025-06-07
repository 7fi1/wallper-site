"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./Main.module.css";
import { Wrapper } from "@/src/app/layout/Wrapper/Wrapper";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import PrimaryButton from "../../ui/primaryButton";
import { motion } from "framer-motion";
import LicenseModal from "../../components/Modals/LicenseModal";
import VideosModal from "../../components/Modals/VideosModal";
import { useModalStore } from "@/src/store/ModalStore";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      toast.success("Access granted!", {
        position: "bottom-right",
        icon: null,
        style: {
          fontSize: "14px",
          backgroundColor: "#2ca76f4b",
          color: "#fff",
          border: "1px solid #44ffaa4b",
          height: "36px",
          padding: "8px",
          borderRadius: "6px",
          fontWeight: "500",
          backdropFilter: "blur(30px) saturate(180%)",
        },
      });

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else {
      const data = await res.json();
      toast.error(data.error || "Неверный пароль", {
        position: "bottom-right",
        icon: null,
        style: {
          fontSize: "14px",
          backgroundColor: "#ff4d4d4b",
          color: "#fff",
          border: "1px solid #ff77774b",
          height: "36px",
          padding: "8px",
          borderRadius: "6px",
          fontWeight: "500",
          backdropFilter: "blur(30px) saturate(180%)",
        },
      });
    }
  };

  const { isOpen, modalType } = useModalStore();

  return (
    <Wrapper>
      <Header />
      <main className={styles.main}>
        {isOpen && (
          <div className={styles.license_modal_overlay}>
            <motion.div className={styles.modal}>
              {modalType === "license" && (
                <LicenseModal showCloseButton={true} />
              )}
              {modalType === "videos" && <VideosModal />}
            </motion.div>
          </div>
        )}
        <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.image} />
            <h3>Admin login</h3>
            <p>
              Please write your password to get an access to admin
              panel/console.
            </p>
          </div>
          <div className={styles.privacy}>
            <div className={styles.block}>
              <input
                type="password"
                className={styles.password}
                placeholder="Admin password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <PrimaryButton
                text="Get started"
                icon="FaChevronRight"
                iconPosition="right"
                iconSize={10}
                buttonSize={48}
                fontSize={16}
                fontWeight={500}
                iconColor="#70757e"
                onClick={handleLogin}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Wrapper>
  );
}
