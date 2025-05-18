"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Wrapper } from "../../layout/Wrapper/Wrapper";
import styles from "./Main.module.css";
import { IoMdLogIn } from "react-icons/io";

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
      toast.success("Успешная авторизация");

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else {
      const data = await res.json();
      toast.error(data.error || "Неверный пароль");
    }
  };

  return (
    <Wrapper>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Вход в админ панель</h1>
          <div className={styles.login_form}>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button onClick={handleLogin} className={styles.login_button}>
              <IoMdLogIn size={24} />
              Войти в админ-панель
            </button>
          </div>
        </div>
        <div className={styles.wallper}>
          <h3>Wallper</h3>
        </div>
      </main>
    </Wrapper>
  );
}
