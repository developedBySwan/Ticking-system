import { Outlet } from "react-router-dom";
import { NavBar } from "../components/common/Navbar";

const Layout = () => {
  return (
    <>
      <div>
        {/* <NavBar /> */}
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
