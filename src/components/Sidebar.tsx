import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../mock/dummy";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Footer, Wrapper } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import logo from "../assets/img/logo.png";
const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center mb-1 gap-3 pl-7 pb-15-override pt-15-override rounded-lg  text-white  text-md m-2 m-4-override";
  const normalLink =
    "flex items-center mb-1 gap-3 pl-7 pb-15-override pt-15-override rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 m-4-override";
  return (
    <Wrapper className="ml-8 mr-8 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto relative">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={`${logo}`} alt="logo" />
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <Wrapper className="mt-24 mt-24-override">
            {links.map((link) => (
              <div key={link.name}>
                <NavLink
                  to={`/${link.path}`}
                  key={link.name}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <span className="icon-sidebar">
                    <img src={`${link.iconVector}`} alt="" />
                  </span>
                  <span className="capitalize ">{link.name}</span>
                </NavLink>
              </div>
            ))}
            <Wrapper className="package">
              <span>Gói dịch vụ</span>
            </Wrapper>
          </Wrapper>
        </>
      )}
      <Footer />
    </Wrapper>
  );
};

export default Sidebar;
