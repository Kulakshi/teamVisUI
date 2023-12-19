import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import {useUser} from "../../UserContext";
import {ArrowBack, HomeOutlined, NotificationAddOutlined} from "@mui/icons-material";
import HomePage from "../../pages/home/HomePage";
import {useNavigate} from "react-router-dom";

const Topbar = () => {
    const {user} = useUser()
    const nav =  useNavigate()


  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% )`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <div className="pl-52 flex flex-row items-center bg-gray-600">
        <p className="text-2xl font-bold text-gray-200">
          TeamVis
        </p>
        <p className="p-2 font-bold text-xl w-full items-end text-white" >
          {user && user}
        </p>
          <p className="w-full h-full mr-10 text-green-500"><NotificationAddOutlined/> Mangfei is added to the dasboard</p>
          <HomeOutlined className="w-full h-full mr-56 text-white" onClick={()=>{
              nav("/app/home")
          }}/>
      </div>
    </AppBar>
  );
};

export default Topbar;