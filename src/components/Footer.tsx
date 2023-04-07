import React from "react";
import copyRight from "../assets/icon/u_copyright.png";

const Footer = () => (
  <footer className="mt-24 absolute flex align-center gap-2">
    Copyright
    <img src={`${copyRight}`} alt="Copyright" />
    2020 Alta Software
  </footer>
);

export default Footer;
