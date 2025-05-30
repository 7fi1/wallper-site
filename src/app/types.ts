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
};

export type SecondaryButtonProps = {
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
};

export type PopupProps = {
  text?: string;
  button?: string;
};
