import { ComponentType } from "react";
import { Home } from "../pages";
import Library from "../pages/Library";
import Pokemon from "../pages/Pokemon";

interface RouteType {
  component: ComponentType;
  path: string;
  exact?: boolean;
}

const routeMap: Array<RouteType> = [
  {
    component: Home,
    path: "/home",
    exact: true,
  },
  {
    component: Library,
    path: "/library/:gen",
    exact: false,
  },
  {
    component: Pokemon,
    path: "/pokemon/:pokemon",
    exact: false,
  },
];

export default routeMap;
