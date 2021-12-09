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
import { useEffect, useState } from "preact/hooks";
import { Loader } from "..";
import { useSnackbarHelper, useUser } from "../../hooks";
import { getAllFriends, getSocket, getUuid } from "../../utils";
import "./ChatList.css";

interface ChatlistProps {
  onChatClick: (user: any) => void;
}

export const ChatList = ({ onChatClick }: ChatlistProps): JSX.Element => {
  const [friends, setFriends] = useState([
    {
      _id: "",
      user_id: "",
      friendship_id: "",
      date: "",
      time: "",
      name: "",
      user_name: "",
      user_profile: "",
    },
    {},
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserFriendID } = useUser();
  const { snackbarInjector } = useSnackbarHelper();
  const getUserFriends = async () => {
    // const id = getUserFriendID();
    const data = await getAllFriends(String(id));
    console.log("f_data", data);
    if (data.success) {
      if (data.result.data) {
        console.log(data);
        setFriends(data.result.data.result);
        onChatClick(friends[0]);
      } else {
        setFriends([]);
      }
      // console.log(data.result.data.result, "succ");
    } else {
      alert("error occured. [t102]");
    }
    setIsLoading(false);
  };
  const id = getUserFriendID();

  useEffect(() => {
    if (id !== "" && id !== undefined && id !== null) {
      (async () => {
        await getUserFriends();
      })();
    }
    getSocket().on("updateFriends", async () => {
      await getUserFriends();
    });
  }, [id]);

  const handleUserForChat = (user: any) => {
    onChatClick(user);
  };
  return (
    <>
      {/* <Loader isOpen={isLoading} /> */}
      <List style={{ paddingTop: 0 }}>
        {friends.map((user) => (
          <>
            {user._id !== "" && (
              <>
                <ListItem
                  selected={true}
                  button
                  onClick={() => {
                    handleUserForChat(user);
                  }}
                  // key={user.user_id}
                  className={`${
                    true ? "selected" : ""
                  } remove-horizontal-padding list-padding`}
                >
                  <ListItemAvatar>
                    <Avatar src={user.user_profile} alt="user-photo" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.user_name}
                  />
                  {/* <ListItemSecondaryAction>
                <Badge color="primary" badgeContent={"9+"} />
              </ListItemSecondaryAction> */}
                </ListItem>
                <Divider />
              </>
            )}
          </>
        ))}
      </List>
    </>
  );
};
