import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import {HomeOutlined} from "@mui/icons-material";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/app/home",
    element: <HomePage />,
    state: "installation",
    sidebarProps: {
      displayText: "Home",
      icon: <HomeOutlined/>
    }
  },
  {
    path: "/app/dashboard",
    element: <DefaultPage />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    },
    // child: [
    //   {
    //     index: true,
    //     element: <DefaultPage/>,
    //     state: "dashboard.index"
    //   },
      // {
      //   path: "/app/dashboard/default",
      //   element: <DefaultPage />,
      //   state: "dashboard.default",
      //   sidebarProps: {
      //     displayText: "Default"
      //   },
      // },
      // {
      //   path: "/app/dashboard/analytics",
      //   element: <AnalyticsPage />,
      //   state: "dashboard.analytics",
      //   sidebarProps: {
      //     displayText: "Analytic"
      //   }
      // },
      // {
      //   path: "/app/dashboard/saas",
      //   element: <SaasPage />,
      //   state: "dashboard.saas",
      //   sidebarProps: {
      //     displayText: "Saas"
      //   }
      // }
    // ]
  },
  // {
  //   path: "/app/component",
  //   element: <ComponentPageLayout />,
  //   state: "component",
  //   sidebarProps: {
  //     displayText: "Components",
  //     icon: <AppsOutlinedIcon />
  //   },
  //   child: [
  //     {
  //       path: "/app/component/alert",
  //       element: <AlertPage />,
  //       state: "component.alert",
  //       sidebarProps: {
  //         displayText: "Alert"
  //       },
  //     },
  //     {
  //       path: "/app/component/button",
  //       element: <ButtonPage />,
  //       state: "component.button",
  //       sidebarProps: {
  //         displayText: "Button"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/app/documentation",
  //   element: <DocumentationPage />,
  //   state: "documentation",
  //   sidebarProps: {
  //     displayText: "Documentation",
  //     icon: <ArticleOutlinedIcon />
  //   }
  // },
  // {
  //   path: "/app/changelog",
  //   element: <ChangelogPage />,
  //   state: "changelog",
  //   sidebarProps: {
  //     displayText: "Changelog",
  //     icon: <FormatListBulletedOutlinedIcon />
  //   }
  // }
];

export default appRoutes;