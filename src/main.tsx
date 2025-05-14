
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { Provider } from 'react-redux';
import { store } from "./redux-store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(

    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <div className="min-h-screen relative flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-50">
        <NavigationBar className=" text-black bg-amber-50 px-6 py-4"></NavigationBar>
      </div>

      <main className=" grow overflow-y-auto pt-24 px-20 bg-black">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
    </Provider>
    </QueryClientProvider>
 
);
