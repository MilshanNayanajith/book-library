import { Outlet } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-50">
        <NavigationBar className=" text-black bg-amber-50 px-6 py-4"></NavigationBar>
      </div>

      <main className=" grow overflow-y-auto pt-28 px-20 bg-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
