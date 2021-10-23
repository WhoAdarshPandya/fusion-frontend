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
        <Searchbar />
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
              username: "@bhangisamaj",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@bhangisamaj",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@bhangisamaj",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@bhangisamaj",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@bhangisamaj",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@bhangisamaj",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@bhangisamaj",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
              id: getUuid(),
              name: "Sharan Shah",
              username: "@last",
              url: "https://randomuser.me/api/portraits/men/4.jpg",
            },
          ].map((user) => (
            <ListItem key={user.id} className="remove-horizontal-padding">
              <ListItemAvatar>
                <Avatar
                  src="https://randomuser.me/api/portraits/men/4.jpg"
                  alt="user-photo"
                />
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
