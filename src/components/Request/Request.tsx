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
import { Loader, RequestAndDiscoverLoader, Searchbar } from "..";
import { useSnackbarHelper, useUser } from "../../hooks";
import {
  addFriendReq,
  deleteRequestReq,
  getAllRequests,
  getSocket,
  getToken,
  getUserData,
  getUuid,
} from "../../utils";
import "./Request.css";

export const Request = () => {
  const [requests, setRequests] = useState([
    {
      date: "",
      name: "",
      req_by_id: "",
      req_for_id: "",
      req_id: "",
      time: "",
      user_profile: "",
      username: "",
      _id: "",
    },
  ]);
  const [data, setData] = useState([
    {
      date: "",
      name: "",
      req_by_id: "",
      req_for_id: "",
      req_id: "",
      time: "",
      user_profile: "",
      username: "",
      _id: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    getUserRequestID,
    getUserName,
    getUserID,
    getUserProfileUrl,
    getUserUserName,
    getUserFriendID,
  } = useUser();
  const getUserRequests = async () => {
    // const id = getUserRequestID();
    const data = await getAllRequests(String(id));
    console.log(data);
    if (data.success) {
      if (data.result.data) {
        // console.log(data);
        setRequests(data.result.data.result);
        setData(data.result.data.result);
      } else {
        setRequests([]);
        setData([]);
      }
      // console.log(data.result.data.result, "succ");
    } else {
      alert("error occured. [t103]");
    }
    setIsLoading(false);
  };
  const { snackbarInjector } = useSnackbarHelper();

  const id = getUserRequestID();
  const user_id = getUserID();
  useEffect(() => {
    if (id !== "" && id !== undefined && id !== null) {
      (async () => {
        await getUserRequests();
      })();
    }
    getSocket().on(`new_req${user_id}`, async ({ msg }) => {
      snackbarInjector("info", msg, true, "5000");
      setIsLoading(true);
      await getUserRequests();
      setIsLoading(false);
    });

    getSocket().on(`accepted${user_id}`, async ({ msg }) => {
      snackbarInjector("info", msg, true, "5000");
      getSocket().emit("updateFriends", { token: getToken()! });
      // setIsLoading(true);
      // await getUserRequests();
      // setIsLoading(false);
    });
  }, [id]);

  const handleSearch = (search: string) => {
    if (search === "") {
      setRequests(data);
    } else {
      setRequests(data);
      setRequests((prevTodosData: any) =>
        prevTodosData.filter(
          (item: any) =>
            item.name.includes(search) || item.username.includes(search)
        )
      );
    }
  };

  const handleAccept = async (user: any) => {
    console.log(user);
    const friendship_id = getUuid();
    const user_id = user.req_by_id;

    //?
    const frinal_friend_id = await (
      await getUserData(user_id)
    ).result.data.result[0].friend_id;
    const friend_id = user.friend_id;
    const name = user.name;
    const user_name = user.username;
    const user_profile = user.user_profile;
    // send 'f' to socket
    const f_user_id = getUserID();
    const f_friend_id = getUserFriendID();
    const date = "",
      time = "";
    const f_name = getUserName();
    const f_user_name = getUserUserName();
    const f_user_profile = getUserProfileUrl();
    //   id: string, [userFreindId]
    // user_id: string, [myid]
    // friendship_id: string, [uuid]
    // date: string, [""]
    // time: string,[""]
    // name: string, [my name]
    // user_name: string, [my user name]
    // user_profile: string [my profile]
    // userid,friend_id
    // console.log(
    //   friendship_id,
    //   user_id,
    //   name,
    //   frinal_friend_id,
    //   user_profile,
    //   date,
    //   time,
    //   user_name,
    //   f_user_id,
    //   f_friend_id,
    //   f_user_name,
    //   f_user_profile,
    //   f_name
    // );

    const data = await addFriendReq(
      f_friend_id,
      user_id,
      friendship_id,
      date,
      time,
      name,
      user_name,
      user_profile
    );
    if (data.success) {
      console.log(data);
      // 2 events 1 for flist update in chat.,other for frriend
      getSocket().emit("accepted_req", {
        token: getToken()!,
        frinal_friend_id,
        f_user_id,
        friendship_id,
        date,
        time,
        f_name,
        f_user_name,
        f_user_profile,
        user_id,
      });
      snackbarInjector(
        "success",
        `${user.name} is your friend now...`,
        true,
        "5000"
      );
      await deleteRequestReq(String(id), user._id);
      await getUserRequests();
      getSocket().emit("updateFriends", { token: getToken()! });
    } else {
      console.log(data);
      snackbarInjector("error", "something went wrong", true, "5000");
    }
  };

  const handleRemove = async (user: any) => {
    const data = await deleteRequestReq(String(id), user._id);
    if (data.success) {
      await getUserRequests();
      snackbarInjector("success", "request deleted", true, "5000");
    } else {
      console.log(data);
      snackbarInjector("error", "something went wrong", true, "5000");
    }
  };
  return (
    <>
      {isLoading ? (
        <RequestAndDiscoverLoader variant="request" />
      ) : (
        <Paper elevation={0} className="request-container transition-class">
          {/* <Loader isOpen={isLoading} /> */}
          <br />
          <div className="searchbar-container ">
            <Searchbar onSearch={handleSearch} />
          </div>
          <div className="list-renderer">
            <br />
            <Typography variant="subtitle1" className="muted">
              Friend Requests
            </Typography>
            <List>
              {requests.map((user) => (
                <ListItem
                  key={user.req_by_id}
                  className="remove-horizontal-padding"
                >
                  <ListItemAvatar>
                    <Avatar src={user.user_profile} alt="user-photo" />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.username} />
                  <ListItemSecondaryAction>
                    <Button
                      color="primary"
                      onClick={() => {
                        handleAccept(user);
                      }}
                    >
                      accept
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        handleRemove(user);
                      }}
                    >
                      remove
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
      )}
    </>
  );
};
