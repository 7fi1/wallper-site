import React, { JSX, useState } from "react";
import { PrimaryButtonProps } from "../types";
import {
  FaChevronRight,
  FaChevronLeft,
  FaStore,
  FaApple,
} from "react-icons/fa";
import styles from "./Ui.module.css";
import Popup from "./popup";

const PrimaryButton = ({
  text,
  icon,
  iconPosition,
  popupMessage,
  popupButton,
  iconSize,
  iconColor,
  buttonSize,
  fontSize,
  fontWeight,
}: PrimaryButtonProps) => {
  const iconsMap: { [key: string]: JSX.Element } = {
    FaChevronRight: <FaChevronRight size={iconSize} color={iconColor} />,
    FaChevronLeft: <FaChevronLeft size={iconSize} color={iconColor} />,
    FaStore: <FaStore size={iconSize} color={iconColor} />,
    FaApple: <FaApple size={iconSize} color={iconColor} />,
  };

  const IconComponent = icon ? iconsMap[icon] : null;

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <button
      className={styles.primaryButton}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ height: buttonSize, fontSize: fontSize, fontWeight: fontWeight }}
    >
      {iconPosition === "left" && IconComponent}
      <span>{text}</span>
      {iconPosition === "right" && IconComponent}

      {popupMessage && isHover && (
        <Popup text={popupMessage} button={popupButton.toUpperCase()} />
      )}
    </button>
  );
};

export default PrimaryButton;
