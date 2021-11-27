import { Button, TextField } from "@material-ui/core";
import { CustomDialog } from "..";
import "./FeatureRequestDialog.css";

interface FeatureRequestDialogProps {
  isFeatureRequestDialogOpen: boolean;
  onClose: () => void;
}

export const FeatureRequestDialog = ({
  isFeatureRequestDialogOpen,
  onClose,
}: FeatureRequestDialogProps): JSX.Element => {
  return (
    <CustomDialog
      cancelButton={false}
      onOkClick={onClose}
      positiveButtonName="cancel"
      open={isFeatureRequestDialogOpen}
      onClose={onClose}
      containsContent={false}
      title="Feature Request"
    >
      <TextField
        value=""
        variant="outlined"
        label="Feature Name"
        className="full-width"
        // className="text-feilds"
      />
      <br />
      <br />
      <TextField
        multiline
        maxRows={10}
        minRows={5}
        value=""
        variant="outlined"
        label="Description"
        className="full-width"
        // className="text-feilds"
      />
      <br />
      <br />
      <Button
        onClick={() => {}}
        variant="contained"
        color="primary"
        className="full-width"
      >
        submit
      </Button>
    </CustomDialog>
  );
};
