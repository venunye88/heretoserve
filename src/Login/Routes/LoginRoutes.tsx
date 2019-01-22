
import { lazy } from "react";
import { RouteStore } from "sibaui";
import { IAppLayoutRouteEntry } from "sibaui/dist/Interfaces/IAppLayoutRouteEntry";

const LoginLayout = lazy(() => import("../LoginLayout"));

RouteStore.AddEntry({
    layoutName:"login",
    path:"/",
    exact: true,
    component:LoginLayout
} as IAppLayoutRouteEntry);