import { useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
import { Input, Wrapper } from ".";
import bell from "../assets/icon/fi_bell.png";
import mail from "../assets/icon/fi_mail.png";
import avatar from "../assets/img/avatar.png";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";

type NavButtonProps = {
  title: string;
  color: string;
  img: string;
  dotColor: string;
};
const NavButton = ({ title, color, img, dotColor }: NavButtonProps) => (
  <Tooltip title={title} placement="bottom">
    <button
      type="button"
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <div>{img ? <img src={`${img}`} alt="" /> : <span></span>}</div>
    </button>
  </Tooltip>
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
    <Wrapper className="flex justify-between p-3 pl-0 md:ml-0 md:mr-6 relative">
      <Wrapper className="flex align-center search relative">
        <Input
          option="navbar"
          name=""
          width={470}
          value=""
          disabled={true}
          typeInput=""
          className="search-input navbar"
          placeholder="Tìm bằng số vé"
          handleChange={() => {}}
        />
      </Wrapper>
      <Wrapper className="flex align-center user">
        <NavButton title="Mail" dotColor="#03C9D7" color={bgColor} img={mail} />
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          color={bgColor}
          img={bell}
        />
        <Tooltip title="Profile" placement="bottom">
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            <img
              className="rounded-full w-9 h-9"
              src={avatar}
              alt="user-profile"
            />
          </div>
        </Tooltip>
      </Wrapper>
    </Wrapper>
  );
};

export default Navbar;
