import { Typography } from "@material-ui/core";
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
      containsContent={false}
      title="About"
    >
      <Typography>
        Fusion was designed by keeping work and social media in mind, i.e a
        place where you can work and socialize. it's quite helpful for people
        who are introvert in nature
      </Typography>
    </CustomDialog>
  );
};
