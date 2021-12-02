import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Popover,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import { useDarkMode, useUser } from "../../hooks";
import { stringTruncate } from "../../utils";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import "./CardComponent.css";
import { deleteTodoReq, updateTodoInfo } from "../../utils/";
import { AddTodoDialog } from "..";

export interface cardData {
  data: {
    _id: string;
    title: string;
    date: string;
    description: string;
    isStarred: boolean;
    color: string;
    time: string;
  };
  onPinClick: (todo: any, pin: boolean) => void;
  onDeleteClick: (_id: string) => void;
  onSubmit: (todo: any, isUpdate: boolean) => void;
}

export const CardComponent = ({
  data: cardItem,
  onDeleteClick,
  onPinClick,
  onSubmit,
}: cardData): JSX.Element => {
  const { getUserTodoID } = useUser();
  const { currentTheme } = useDarkMode();
  const [optionsPopOver, setOptionsPopOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setOptionsPopOver(false);
  };
  const handleClick = (event: any) => {
    setOptionsPopOver(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePinClick = async () => {
    let master_id = getUserTodoID();
    const data = await updateTodoInfo(
      master_id,
      cardItem._id,
      cardItem.title,
      cardItem.color,
      cardItem.description,
      !cardItem.isStarred,
      cardItem.time
    );
    if (data.success) {
      console.log(data);
      onPinClick(cardItem, cardItem.isStarred ? false : true);
    } else {
      alert("some error occured");
    }
  };

  const handleDeleteClick = async () => {
    let master_id = getUserTodoID();
    const data = await deleteTodoReq(master_id, cardItem._id);
    if (data.success) {
      console.log(data);
      onDeleteClick(cardItem._id);
    } else {
      alert("some error occured");
    }
  };

  const handleExitClick = () => {
    setAnchorEl(null);
    setOptionsPopOver(false);
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditSubmit = (card: any, isUpdate: boolean) => {
    onSubmit(card, isUpdate);
    setIsEditDialogOpen(false);
  };
  return (
    <>
      <Card
        raised
        key={cardItem._id}
        elevation={1}
        className={
          currentTheme === "light"
            ? `workspace-card light-card ${cardItem.color}`
            : `workspace-card dark-card ${cardItem.color}-dark`
        }
      >
        <CardHeader
          action={
            <IconButton
              onClick={handleClick}
              aria-describedby="cardOptions-popover"
            >
              <MoreVertIcon fontSize="medium" />
            </IconButton>
          }
          title={
            <Typography noWrap variant="body1" color="textPrimary">
              {cardItem.title}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {cardItem.date}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {stringTruncate(cardItem.description)}
          </Typography>
          <br />
          <div className="card-time">
            <AccessTimeRoundedIcon color="disabled" fontSize="small" />
            <Typography
              className={
                currentTheme === "light"
                  ? "card-time-text"
                  : "card-time-text-dark"
              }
              variant="body2"
            >
              {cardItem.time}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Popover
        id="emoji-popover"
        open={optionsPopOver}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // className="emoji-window"
      >
        <Paper elevation={0}>
          <MenuList className="menu-padding">
            <MenuItem
              onClick={() => {
                handlePinClick();
              }}
            >
              <ListItemIcon>
                {cardItem.isStarred ? (
                  <StarRoundedIcon fontSize="small" />
                ) : (
                  <StarBorderRoundedIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText>
                {cardItem.isStarred ? "Unpin" : "Pin"}
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleEditClick}>
              <ListItemIcon>
                <EditRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>
              <ListItemIcon>
                <DeleteRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleExitClick}>
              <ListItemIcon>
                <ExitToAppRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Exit</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
      <AddTodoDialog
        isAddTodoDialogOpen={isEditDialogOpen}
        onClose={handleEditClose}
        onSubmit={handleEditSubmit}
        isUpdateDialog={true}
        card={cardItem}
      />
    </>
  );
};
