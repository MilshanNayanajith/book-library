
import Library  from "../pages/Library";
import NewBook from "../pages/NewBook";

const routes = [
    {
      path: '/',
      element: <Library/>,
    },
    {
      path: '/new-book',
      element: <NewBook/>,
    },
  ];
  
  export default routes;