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
import { useEffect, useState } from "preact/hooks";
import { Loader, Searchbar } from "..";
import { useSnackbarHelper, useUser } from "../../hooks";
import { getAllUsers, getSocket, getUuid, socket } from "../../utils";
import "./AvailableList.css";

export const AvailableList = (): JSX.Element => {
  const [users, setUsers] = useState([
    {
      _id: "",
      name: "",
      user_name: "",
      user_id: "",
      profile_url: "",
      email: "",
      request_id: "",
      chat_id: "",
      friend_id: "",
      dnd: false,
    },
  ]);

  const [data, setData] = useState([
    {
      _id: "",
      name: "",
      user_name: "",
      user_id: "",
      profile_url: "",
      email: "",
      request_id: "",
      chat_id: "",
      friend_id: "",
      dnd: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserID, getUserProfileUrl, getUserName, getUserUserName } =
    useUser();
  const id = getUserID();
  const { snackbarInjector } = useSnackbarHelper();
  const getUserData = async () => {
    const data = await getAllUsers();
    const id = getUserID();
    console.log(id);
    console.log(data);
    if (data.success) {
      if (data.result.data.success) {
        setUsers(data.result.data.result);
        setData(data.result.data.result);
      } else {
        setUsers([]);
        setData([]);
      }
      // console.log(data.result.data.result, "succ");
    } else {
      alert("error occured. [t101]");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleSearch = (search: string) => {
    if (search === "") {
      setUsers(data);
    } else {
      setUsers(data);
      setUsers((prevTodosData) =>
        prevTodosData.filter(
          (item) =>
            item.name.includes(search) || item.user_name.includes(search)
        )
      );
    }
  };

  const handleSendRequest = (user: any) => {
    socket.emit("sendReqEvent", {
      id: user.request_id,
      req_by_id: id,
      req_id: getUuid(),
      req_for_id: user.user_id,
      name: getUserName(),
      username: getUserUserName(),
      user_profile: getUserProfileUrl(),
    });
    snackbarInjector("success", `reqeust sent to ${user.name}`, true, "5000");
  };
  return (
    <Paper elevation={0} className="available-container transition-class">
      <Loader isOpen={isLoading} />
      <br />
      <div className="searchbar-container ">
        <Searchbar onSearch={handleSearch} />
      </div>
      <div className="list-renderer">
        <br />
        <Typography variant="subtitle1" className="muted">
          Users
        </Typography>
        <List>
          {users.map(
            (user) =>
              user.user_id !== id && (
                <ListItem key={user._id} className="remove-horizontal-padding">
                  <ListItemAvatar>
                    <Avatar src={user.profile_url} alt="user-photo" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.user_name}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      color="primary"
                      onClick={() => {
                        handleSendRequest(user);
                      }}
                    >
                      Send Request
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              )
          )}
        </List>
      </div>
    </Paper>
  );
};
