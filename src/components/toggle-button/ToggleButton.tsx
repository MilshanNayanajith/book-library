import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux-store/store";
import { toggle } from "../../redux-store/features/toggleViewSlice";


type Props = {
  children?: React.ReactNode;
  defaultStateIcon: React.ReactNode;
  secondStateIcon: React.ReactNode;
//   toggleState: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const ToggleButton = ({ children, defaultStateIcon, secondStateIcon, ...rest }: Props) => {
  const toggleState = useSelector((state:RootState) => state.toggleView.value);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(toggle())} {...rest}>
      {toggleState ? secondStateIcon : defaultStateIcon} {children}
    </button>
  );
};

export default ToggleButton;
