import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar, Sidebar } from "./components";
import { Router } from "./pages";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="w-80 fixed dark:bg-secondary-dark-bg bg-main-grey">
            <Sidebar />
          </div>
          <div className="dark:bg-main-dark-bg  bg-main-grey min-h-screen md:ml-80 w-full">
            <div className="fixed md:static bg-main-grey dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Router />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
