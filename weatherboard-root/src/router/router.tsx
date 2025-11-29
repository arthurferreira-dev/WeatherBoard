import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { VersionPage } from "../pages/VersionPage";
import type { JSX } from "react";

interface RouterDefault {
  path: string;
  element: JSX.Element;
}

const routes: RouterDefault[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/version",
    element: <VersionPage />,
  },
];

export const router = createBrowserRouter(routes);