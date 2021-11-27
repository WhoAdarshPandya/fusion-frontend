import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grow from "@material-ui/core/Grow";
import { ReactNode } from "react";
import "./CustomDialog.css";

export const CustomDialog = ({
  children = null,
  title = "",
  content = "",
  okButton = true,
  cancelButton = true,
  onClose = () => {},
  onCancelClick = () => {},
  onOkClick = () => {},
  positiveButtonName = "okay",
  negativeButtonName = "cancel",
  open = false,
  containsContent = true,
}: {
  children?: ReactNode;
  title: string;
  content?: string;
  okButton?: boolean;
  cancelButton?: boolean;
  onClose: () => void;
  onOkClick?: () => void;
  onCancelClick?: () => void;
  open: boolean;
  positiveButtonName?: string;
  negativeButtonName?: string;
  containsContent?: boolean;
}): JSX.Element => {
  return (
    <Dialog
      TransitionComponent={Grow}
      onClose={onClose}
      open={open}
      scroll="paper"
      maxWidth="lg"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {containsContent && <DialogContentText>{content}</DialogContentText>}
        {/* {containsContent && <br />} */}
        {children}
      </DialogContent>
      <DialogActions>
        {cancelButton && (
          <Button color="primary" onClick={onCancelClick}>
            {negativeButtonName}
          </Button>
        )}
        {okButton && (
          <Button color="primary" onClick={onOkClick}>
            {positiveButtonName}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
