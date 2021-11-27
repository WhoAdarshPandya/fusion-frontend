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
import { useDarkMode } from "../../hooks";
import { stringTruncate } from "../../utils";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import "./CardComponent.css";

export interface cardData {
  data: {
    card_id: string;
    title: string;
    date: string;
    description: string;
    isPinned: boolean;
    color: string;
  };
}

export const CardComponent = ({ data: cardItem }: cardData): JSX.Element => {
  const { currentTheme } = useDarkMode();
  const [optionsPopOver, setOptionsPopOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOptionsPopOver(false);
  };
  const handleClick = (event: any) => {
    setOptionsPopOver(true);
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Card
        raised
        key={cardItem.card_id}
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
              {"    05:09 PM"}
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
            <MenuItem>
              <ListItemIcon>
                {cardItem.isPinned ? (
                  <StarRoundedIcon fontSize="small" />
                ) : (
                  <StarBorderRoundedIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText>Pin</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <EditRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ExitToAppRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Exit</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
};
