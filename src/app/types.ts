import { JSX } from "react/jsx-runtime";

export type PrimaryButtonProps = {
  text: string;
  icon?: string;
  iconPosition?: "left" | "right";
  popupMessage?: string;
  popupButton?: string;
  iconSize?: number;
  iconColor?: string;
  buttonSize?: number;
  fontSize?: number;
  fontWeight?: 400 | 500 | 600 | 700;
  onClick?: () => void;
  widthButton?: string;
};

export type SecondaryButtonProps = {
  text: string | JSX.Element;
  icon?: string;
  iconPosition?: "left" | "right";
  popupMessage?: string;
  popupButton?: string;
  iconSize?: number;
  iconColor?: string;
  buttonSize?: number;
  fontSize?: number;
  fontWeight?: 400 | 500 | 600 | 700;
  onClick?: () => void;
  widthButton?: string;
};

export type PopupProps = {
  text?: string;
  button?: string;
};

export type HoverBloсkProps = {
  isVisible?: boolean;
  links?: { link: string; name: string }[];
  videoIdx: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
