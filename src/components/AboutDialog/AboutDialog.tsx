import { CustomDialog } from "..";

interface AboutDialogProps {
  isAboutDialogOpen: boolean;
  onClose: () => void;
}

export const AboutDialog = ({
  isAboutDialogOpen,
  onClose,
}: AboutDialogProps): JSX.Element => {
  return (
    <CustomDialog
      cancelButton={false}
      onOkClick={onClose}
      open={isAboutDialogOpen}
      onClose={onClose}
      content="lorium"
      title="About"
    ></CustomDialog>
  );
};
