import ToggleButton from "./toggle-button/ToggleButton";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa6";

type Props = React.HTMLAttributes<HTMLElement>;

const NavigationBar = ({ ...props }: Props) => {
 
  return (
    <nav {...props}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <a className="text-2xl font-bold tracking-wide">My Librarry</a>

        <div className="space-x-6 hidden sm:flex">

          {/* This is a custom button component that behaves like a standard HTML button, but also supports additional custom props like toggle state and icons. */}
          <ToggleButton
            className="hover:scale-105 hover:bg-gray-900 p-1 rounded-sm hover:text-amber-50 transition delay-150 duration-300 ease-in-out"
            defaultStateIcon={<IoGrid />}
            secondStateIcon={<FaList />}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
