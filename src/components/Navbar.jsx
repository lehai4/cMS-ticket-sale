import React, { useEffect } from "react";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Input } from ".";
import avatar from "../assets/img/avatar.png";
import mail from "../assets/icon/fi_mail.png";
import bell from "../assets/icon/fi_bell.png";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, color, img }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <div>{img ? <img src={`${img}`} /> : <></>}</div>
    </button>
  </TooltipComponent>
);
const Navbar = () => {
  const { bgColor, setActiveMenu, setScreenSize, screenSize } =
    useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-3 pl-0 md:ml-0 md:mr-6 relative">
      <div className="flex align-center search relative">
        <Input type="navbar" placeholder="Search" />
      </div>
      <div className="flex align-center user">
        <NavButton title="Mail" dotColor="#03C9D7" color={bgColor} img={mail} />
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          color={bgColor}
          img={bell}
        />
        {/* <TooltipComponent content="Profile" position="BottomCenter">
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            <img
              className="rounded-full w-9 h-9"
              src={avatar}
              alt="user-profile"
            />
          </div>
        </TooltipComponent> */}
      </div>
    </div>
  );
};

export default Navbar;
