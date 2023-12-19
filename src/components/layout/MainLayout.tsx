import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import Topbar from "../common/Topbar";

const MainLayout = () => {
  return (
    <div className="flex flex-1 w-screen">
        <Topbar />
        <Outlet />
    </div>
  );
};

export default MainLayout;