import App from "../App";
import NotFound from "../ErrorPages/NotFound";
import ServerError from "../ErrorPages/ServerError";
import Library from "../pages/Library";
import NewBook from "../pages/NewBook";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Library /> },
      { path: "new-book", element: <NewBook /> },

      { path: "500", element: <ServerError /> },

      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
