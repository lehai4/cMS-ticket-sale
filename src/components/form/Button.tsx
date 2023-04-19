import React from "react";
type ButtonProps = {
  icon: string;
  size: number;
  bgHoverColor: string;
  text: string;
  style: React.CSSProperties;
  handleClick: () => void;
};
const Button = ({
  icon,
  size,
  bgHoverColor,
  text,
  style,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      style={style}
      onClick={handleClick}
      className={`flex fw-700 align-center justify-center text-${size} p-4 pt-1 pb-1 hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon ? <img src={`${icon}`} alt="" /> : <span></span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
