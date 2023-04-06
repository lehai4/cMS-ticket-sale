import React from "react";
export type HeaderProps = {
  title: string;
  style: React.CSSProperties;
};
const Header = ({ title, style }: HeaderProps) => {
  return (
    <div className="mb-6 mt-3">
      <p style={style} className="text-3xl tracking-tight text-slate-900">
        {title}
      </p>
    </div>
  );
};
export default Header;
