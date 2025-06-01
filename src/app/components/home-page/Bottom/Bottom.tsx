import React from "react";
import styles from "./Bottom.module.css";
import SecondaryButton from "@/src/app/ui/secondaryButton";
import PrimaryButton from "@/src/app/ui/primaryButton";

const Bottom = () => {
  return (
    <section className={styles.bottom}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Desktop reimagined. Available today.</h2>
          <div className={styles.buttons}>
            <PrimaryButton
              text="Get started"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              buttonSize={48}
              fontSize={16}
              fontWeight={500}
              iconColor="#70757e"
            />
            <SecondaryButton
              text="Contact Us"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              buttonSize={48}
              fontSize={16}
              fontWeight={500}
              iconColor="#ccc"
            />
          </div>
        </div>
        <div className={styles.text} />
      </div>
    </section>
  );
};

export default Bottom;
