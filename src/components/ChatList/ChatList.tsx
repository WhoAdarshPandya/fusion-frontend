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
          url: "hhttps://randomuser.me/api/portraits/women/29.jpg",
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
              <Avatar src={user.url} alt="user-photo" />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.username} />
            <ListItemSecondaryAction>
              <Badge color="primary" badgeContent={"9+"} />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};
