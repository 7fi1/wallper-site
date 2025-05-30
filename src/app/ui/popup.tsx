import React from "react";
import styles from "./Ui.module.css";
import { PopupProps } from "../types";

const Popup = ({ text, button }: PopupProps) => {
  return (
    <div className={styles.popup}>
      {text}
      <span>{button}</span>
    </div>
  );
};

export default Popup;
