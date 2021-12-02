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
import { useEffect, useState } from "preact/hooks";
import { useDarkMode, useDate, useUser } from "../../hooks";
import { addTodoReq, updateTodoInfo } from "../../utils";

interface AddTodoDialogProps {
  isAddTodoDialogOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: any, isUpdate: boolean) => void;
  card?: any;
  isUpdateDialog?: boolean;
}

export const AddTodoDialog = ({
  isAddTodoDialogOpen,
  onClose,
  onSubmit,
  card = null,
  isUpdateDialog = false,
}: AddTodoDialogProps) => {
  const { currentTheme } = useDarkMode();
  const [isPinned, setIsPinned] = useState(false);
  const [isUpdatePinned, setIsUpdatePinned] = useState(false);
  const [title, setTitle] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [color, setColor] = useState("");
  const [updateColor, setUpdateColor] = useState("");
  const { getUserTodoID } = useUser();
  const todo_id = getUserTodoID();
  useEffect(() => {
    isUpdateDialog && setIsUpdatePinned(card.isStarred);
    isUpdateDialog && setUpdateTitle(card.title);
    isUpdateDialog && setUpdateDesc(card.description);
    isUpdateDialog && setUpdateColor(card.color);
  }, []);
  const handleCancel = () => {
    // clear all feilds
    setIsPinned(false);
    setTitle("");
    setDesc("");
    setColor("");
    onClose();
  };
  const handleSubmit = async () => {
    const currentDate = new Date();

    const todo_id = getUserTodoID();
    const time = currentDate.getHours() + ":" + currentDate.getMinutes();
    let cDay = currentDate.getDate();
    let cYear = currentDate.getFullYear();
    const monthName = currentDate.toLocaleString("default", {
      month: "long",
    });
    const datePerfect = `${monthName}, ${cDay} ${cYear}`;

    // submission logic
    if (!isUpdateDialog) {
      if (title !== "" && desc !== "") {
        // console.log({ datePerfect, time, color, title, desc, isPinned });
        const data = await addTodoReq(
          todo_id,
          title,
          datePerfect,
          time,
          isPinned,
          color,
          desc
        );
        if (data.success) {
          console.log(data);
          setIsPinned(false);
          setTitle("");
          setDesc("");
          setColor("");
        } else {
          console.log(data);
        }
      } else {
        alert("empty che kaik");
      }

      onSubmit(
        {
          title,
          date: datePerfect,
          time,
          isStarred: isPinned,
          color,
          description: desc,
        },
        isUpdateDialog
      );
    } else {
      if (updateTitle !== "" && updateDesc !== "") {
        // console.log({ datePerfect, time, color, title, desc, isPinned });
        const data = await updateTodoInfo(
          todo_id,
          card._id,
          updateTitle,
          updateColor,
          updateDesc,
          isUpdatePinned,
          card.time
        );
        if (data.success) {
          console.log(data);
          onSubmit(
            {
              _id: card._id,
              title: updateTitle,
              date: datePerfect,
              time,
              isStarred: isUpdatePinned,
              color: updateColor,
              description: updateDesc,
            },
            isUpdateDialog
          );
          setIsPinned(false);
          setTitle("");
          setDesc("");
          setColor("");
        } else {
          console.log(data);
        }
      } else {
        alert("empty che kaik");
      }
    }
  };

  const handleColor = (color: string, isUpdate: boolean) => {
    if (!isUpdate) {
      if (color === "one") {
        setColor("lightBlue");
      }
      if (color === "two") {
        setColor("lightGreen");
      }
      if (color === "three") {
        setColor("lightRed");
      }
      if (color === "four") {
        setColor("lightYellow");
      }
    } else {
      if (color === "one") {
        setUpdateColor("lightBlue");
      }
      if (color === "two") {
        setUpdateColor("lightGreen");
      }
      if (color === "three") {
        setUpdateColor("lightRed");
      }
      if (color === "four") {
        setUpdateColor("lightYellow");
      }
    }
  };
  return (
    <CustomDialog
      containsContent={false}
      title={isUpdateDialog ? "Update Todo" : "Add Todo"}
      open={isAddTodoDialogOpen}
      onClose={onClose}
      positiveButtonName={isUpdateDialog ? "update" : "add"}
      negativeButtonName="cancel"
      onCancelClick={handleCancel}
      onOkClick={handleSubmit}
    >
      <div className="add-todo-container">
        <TextField
          value={isUpdateDialog ? updateTitle : title}
          onChange={
            isUpdateDialog
              ? (e: any) => {
                  setUpdateTitle(e.target.value);
                }
              : (e: any) => {
                  setTitle(e.target.value);
                }
          }
          variant="outlined"
          label="Title"
          className="full-width"
          // className="text-feilds"
          InputProps={{
            endAdornment: (
              <Tooltip title={isPinned ? "unpin" : "pin"}>
                <InputAdornment position="end">
                  {!isUpdateDialog && (
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
                  )}
                  {isUpdateDialog && (
                    <IconButton
                      onClick={() => {
                        setIsUpdatePinned((prevIsPinned: any) => !prevIsPinned);
                      }}
                    >
                      {isUpdatePinned ? (
                        <StarRoundedIcon color="primary" />
                      ) : (
                        <StarBorderRoundedIcon />
                      )}
                    </IconButton>
                  )}
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
          value={isUpdateDialog ? updateDesc : desc}
          onChange={
            isUpdateDialog
              ? (e: any) => setUpdateDesc(e.target.value)
              : (e: any) => setDesc(e.target.value)
          }
          variant="outlined"
          label="Description"
          className="full-width"
        />
        <br />
        <br />
        {/* colors */}
        {["one", "two", "three", "four"].map((item) => (
          <div
            onClick={() => {
              handleColor(item, isUpdateDialog);
            }}
            className={`color-dot clr-${item}${
              currentTheme === "light" ? "-light" : ""
            }`}
          ></div>
        ))}
      </div>
    </CustomDialog>
  );
};
