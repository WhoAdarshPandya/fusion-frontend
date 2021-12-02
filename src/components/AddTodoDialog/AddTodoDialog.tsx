import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { CustomDialog } from "..";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import "./AddTodoDialog.css";
import { useState } from "preact/hooks";
import { useDarkMode } from "../../hooks";

interface AddTodoDialogProps {
  isAddTodoDialogOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const AddTodoDialog = ({
  isAddTodoDialogOpen,
  onClose,
  onSubmit,
}: AddTodoDialogProps) => {
  const [isPinned, setIsPinned] = useState(false);
  const { currentTheme } = useDarkMode();
  const handleCancel = () => {
    // clear all feilds
    onClose();
  };

  const handleSubmit = () => {
    // submission logic
    onSubmit();
  };
  return (
    <CustomDialog
      containsContent={false}
      title="Add Todo"
      open={isAddTodoDialogOpen}
      onClose={onClose}
      positiveButtonName="add"
      negativeButtonName="cancel"
      onCancelClick={handleCancel}
      onOkClick={handleSubmit}
    >
      <div className="add-todo-container">
        <TextField
          value=""
          variant="outlined"
          label="Title"
          className="full-width"
          // className="text-feilds"
          InputProps={{
            endAdornment: (
              <Tooltip title={isPinned ? "unpin" : "pin"}>
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setIsPinned((prevIsPinned) => !prevIsPinned);
                    }}
                  >
                    {isPinned ? (
                      <StarRoundedIcon color="primary" />
                    ) : (
                      <StarBorderRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              </Tooltip>
            ),
          }}
        />
        <br />
        <br />
        <TextField
          multiline
          minRows={2}
          maxRows={8}
          value=""
          variant="outlined"
          label="Description"
          className="full-width"
        />
        <br />
        <br />
        {/* colors */}
        <div
          className={`color-dot clr-one${
            currentTheme === "light" ? "-light" : ""
          }`}
        ></div>
        <div
          className={`color-dot clr-two${
            currentTheme === "light" ? "-light" : ""
          }`}
        ></div>
        <div
          className={`color-dot clr-three${
            currentTheme === "light" ? "-light" : ""
          }`}
        ></div>
        <div
          className={`color-dot clr-four${
            currentTheme === "light" ? "-light" : ""
          }`}
        ></div>
      </div>
    </CustomDialog>
  );
};
