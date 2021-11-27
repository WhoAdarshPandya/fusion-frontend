import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Searchbar } from "..";
import { getUuid } from "../../utils";
import "./Request.css";

export const Request = () => {
  return (
    <Paper elevation={0} className="request-container transition-class">
      <br />
      <div className="searchbar-container ">
        <Searchbar onSearch={() => {}} />
      </div>
      <div className="list-renderer">
        <br />
        <Typography variant="subtitle1" className="muted">
          Friend Requests
        </Typography>
        <List>
          {[
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@sharan_works",
              url: "https://randomuser.me/api/portraits/men/68.jpg",
            },
            {
              id: getUuid(),
              name: "Jill Bhat",
              username: "@mr.redcarpet",
              url: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
              id: getUuid(),
              name: "Riya Shah",
              username: "@riya_writes",
              url: "https://randomuser.me/api/portraits/women/82.jpg",
            },
            {
              id: getUuid(),
              name: "Manan Desai",
              username: "@notsomanan",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "AIB",
              username: "@tanmaybhat",
              url: "https://randomuser.me/api/portraits/women/75.jpg",
            },
            {
              id: getUuid(),
              name: "Mehul Patel",
              username: "@impatel",
              url: "https://randomuser.me/api/portraits/men/39.jpg",
            },
            {
              id: getUuid(),
              name: "Shivani Mahajan",
              username: "@curly_tales",
              url: "https://randomuser.me/api/portraits/women/62.jpg",
            },
            {
              id: getUuid(),
              name: "Ayesha Akhtar",
              username: "@random_muse",
              url: "https://randomuser.me/api/portraits/women/29.jpg",
            },
          ].map((user) => (
            <ListItem key={user.id} className="remove-horizontal-padding">
              <ListItemAvatar>
                <Avatar src={user.url} alt="user-photo" />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.username} />
              <ListItemSecondaryAction>
                <Button color="primary">accept</Button>
                <Button color="secondary">remove</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};
