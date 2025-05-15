import ToggleButton from "./toggle-button/ToggleButton";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import SearchBooks from "./library/search-books/SearchBooks";

type Props = React.HTMLAttributes<HTMLElement>;

const NavigationBar = ({ ...props }: Props) => {
  const location = useLocation();
  return (
    <nav {...props}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
     
          <Link
            to="/"className="text-2xl font-bold tracking-wide hover:scale-105 transition delay-150 duration-300 ease-in-out">NextChapter</Link>

        <div className="space-x-6 hidden sm:flex">
          {/* This is a custom button component that behaves like a standard HTML button, but also supports additional custom props like toggle state and icons. */}
   
          <div className=" flex justify-center items-center">
          {location.pathname == "/" && (
            <ToggleButton
              className="hover:scale-105 hover:bg-gray-900 p-1 rounded-sm hover:text-amber-50 transition delay-150 duration-300 ease-in-out"
              defaultStateIcon={<IoGrid />}
              secondStateIcon={<FaList />}
            />
          )}
          </div>

          <div className=" flex justify-center items-center">
          <Link
            to="/new-book"
            className="px-4 text-black font-medium hover:scale-105 transition duration-300 ease-in-out"
          >
            Add New Book
          </Link>
          </div>

    

          <SearchBooks />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
