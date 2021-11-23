import { getBackdropStyle } from "../../utils";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loader.css";

export const Loader = ({ isOpen }: { isOpen: boolean }): JSX.Element => {
  const backdropStyle = getBackdropStyle();
  return (
    <Backdrop open={isOpen} className={backdropStyle.backdrop}>
      <CircularProgress className="white" />
    </Backdrop>
  );
};
