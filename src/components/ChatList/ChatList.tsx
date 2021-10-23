import {
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { getUuid } from "../../utils";
import "./ChatList.css";

export const ChatList = (): JSX.Element => {
  return (
    <List style={{ paddingTop: 0 }}>
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
        <>
          <ListItem
            selected={true}
            button
            key={user.id}
            className={`${
              true ? "selected" : ""
            } remove-horizontal-padding list-padding`}
          >
            <ListItemAvatar>
              <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.username} />
            <ListItemSecondaryAction>
              <Badge color="primary" badgeContent={56} />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};
