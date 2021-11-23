import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./CustomSnackbar.css";

const Alert = (props: AlertProps): JSX.Element => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const ActionComponent = ({
  handleClose,
}: {
  handleClose: () => void;
}): JSX.Element => (
  <IconButton aria-label="close" color="inherit" onClick={handleClose}>
    <CloseIcon className="white" />
  </IconButton>
);

export const CustomSnackbar = ({
  severity = "info",
  autoHideDuration = 6000,
  onClose = () => {},
  open = false,
  message = "this is random toast",
  anchorOrigin = { horizontal: "left", vertical: "bottom" },
  action = true,
}: {
  severity: "info" | "error" | "warning" | "success";
  autoHideDuration?: number;
  onClose?: () => void;
  open: boolean;
  message: string;
  anchorOrigin?: SnackbarOrigin;
  action?: boolean;
}): JSX.Element => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={Grow}
      action={action && <ActionComponent handleClose={onClose} />}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
