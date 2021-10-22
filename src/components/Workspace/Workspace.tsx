import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDate } from "../../hooks";
import { getDrawerStyle } from "../../utils";
import "./Workspace.css";
import clsx from "clsx";
import { useTheme } from "@material-ui/styles";
import { useState } from "preact/hooks";
import CloseIcon from "@material-ui/icons/Close";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { ChevronLeft } from "@material-ui/icons";

export const Workspace = () => {
  const { date, wish } = useDate();
  const [open, setOpen] = useState(false);
  const classes = getDrawerStyle();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  console.log(date);
  console.log(wish);
  return (
    <>
      <Paper elevation={0} className="workspace-container transition-class">
        <div className="workspace-row">
          <div>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </div>
          <div>
            <Typography variant="subtitle2" color="textPrimary">
              {date}
            </Typography>
          </div>
          <div className="avatar-flex">
            <Avatar src={"https://randomuser.me/api/portraits/men/4.jpg"} />
          </div>
        </div>
        <Paper elevation={0} className="workspace-body transition-class">
          <p>skljsdflksdlkfjaskfjklsjfkdsj;klff</p>
          <p>skljsdflksdlkfjaskfjklsjfkdsj;klff</p>
          <p>skljsdflksdlkfjaskfjklsjfkdsj;klff</p>
          <p>skljsdflksdlkfjaskfjklsjfkdsj;klff</p>
          <p>skljsdflksdlkfjaskfjklsjfkdsj;klff</p>
        </Paper>
      </Paper>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
