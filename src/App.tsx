import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { Navbar, Footer, Sidebar } from "./components";
import { Router } from "./pages";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu } =
    useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-80 fixed dark:bg-secondary-dark-bg bg-main-grey">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-grey min-h-screen md:ml-80 w-full  "
                : "bg-main-grey dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-grey dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Router />
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
