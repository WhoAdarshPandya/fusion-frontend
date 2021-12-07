import {
  Avatar,
  Backdrop,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDate, useUser } from "../../hooks";
import {
  getAllTodosReq,
  getDrawerStyle,
  getFabStyle,
  stringTruncate,
} from "../../utils";
import { useEffect, useState } from "preact/hooks";
import { getBackdropStyle, getRandomQuote } from "../../utils";
import { AddTodoDialog, DrawerList, Searchbar, WorkspaceLoader } from "../";
import { SpeedDial } from "@material-ui/lab";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { Loader, CardComponent } from "..";
import { getUserData } from "../../utils/";
import Cookies from "js-cookie";
import "./Workspace.css";

export const Workspace = (): JSX.Element => {
  const { date } = useDate();
  const {
    setUserData,
    getUserData: getUserDataHook,
    getUserChatID,
    getUserDndStatus,
    getUserEmail,
    getUserFriendID,
    getUserID,
    getUserJoinedAt,
    getUserName,
    getUserNotificationStatus,
    getUserProfileUrl,
    getUserRequestID,
    getUserTheme,
    getUserTodoID,
    getUserUserName,
  } = useUser();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddTodoopen, setIsAddTodoOpen] = useState(false);
  const [quoter, setQuoter] = useState<{
    author: string | undefined;
    quote: string | undefined;
  }>({ author: "", quote: "" });
  const classes = getDrawerStyle();
  const backdropClasses = getBackdropStyle();
  const [data, setData] = useState([
    {
      _id: "1",
      title: "buy new interior",
      date: "September 14,2016",
      description:
        "search around websites , find affordable interiors. call the known sellers for tender around this. and call it a day",
      isStarred: false,
      color: "",
      time: "05:09",
    },
  ]);
  const [todo, setTodo] = useState([
    {
      _id: "1",
      title: "buy new interior",
      date: "September 14,2016",
      description:
        "search around websites , find affordable interiors. call the known sellers for tender around this. and call it a day",
      isStarred: false,
      color: "",
      time: "05:05",
    },
  ]);

  const [order, setOrder] = useState("PinnedFirst");
  // const [isSearchOn, setIsSearchOn] = useState(false);
  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const data = await getRandomQuote();
      if (data.success) {
        setQuoter({ author: data.author, quote: data.content });
        console.log(data.content);
      } else {
        console.log(data.err);
      }
      // setIsLoading(false);
    })();

    (async () => {
      const data = await getUserData();
      if (data.success) {
        console.log(data.result.data.result[0]);
        const {
          name,
          user_name,
          user_id,
          chat_id,
          dnd,
          joined_at,
          theme,
          email,
          notification,
          profile_url,
          request_id,
          todo_id,
          friend_id,
        } = data.result.data.result[0];
        setUserData({
          chat_id,
          dnd,
          email,
          friend_id,
          joined_at,
          name,
          notification,
          password: "",
          profile_url,
          request_id,
          theme,
          todo_id,
          user_id,
          user_name,
        });
        const todoData = await getAllTodosReq(todo_id);
        if (todoData.success) {
          console.log(todoData.result.data.result[0].todos);
          setData(todoData.result.data.result[0].todos);
          setTodo(todoData.result.data.result[0].todos);
          Cookies.set("chat_id", chat_id);
        } else {
          console.log(data.err);
        }
      } else {
        console.log(data);
      }
      setIsLoading(false);
    })();
  }, []);

  // ⚛ experimental
  const onSearch = (search: string) => {
    search = search.toLowerCase();
    if (search === "") {
      setData(todo);
    } else {
      setData(todo);
      setData((prevTodosData) =>
        prevTodosData.filter(
          (item) =>
            item.title.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search)
        )
      );
    }
  };

  const handleTodoSubmit = (todo: any, isUpdate: boolean) => {
    if (!isUpdate) {
      console.log("helo");
      setTodo((prevTodo) => [...prevTodo, todo]);
      setData((prevData) => [...prevData, todo]);
      setIsAddTodoOpen(false);
    } else {
      console.log("finally");
      setData((prevData) => [
        ...prevData.map((item) => {
          if (item._id === todo._id) {
            console.log("aya");
            item = todo;
            console.log(item.isStarred);
          }
          return item;
        }),
      ]);

      setTodo((prevTodo) => [
        ...prevTodo.map((item) => {
          if (item._id === todo._id) {
            item = todo;
          }
          return item;
        }),
      ]);
    }
  };
  // ⚛ experimental

  const handlePinClick = (todo: any, pin: boolean) => {
    setData((prevData) => [
      ...prevData.map((item) => {
        if (item._id === todo._id) {
          console.log("aya");
          item.isStarred = pin;
          console.log(item.isStarred);
        }
        return item;
      }),
    ]);

    setTodo((prevTodo) => [
      ...prevTodo.map((item) => {
        if (item._id === todo._id) {
          item.isStarred = pin;
        }
        return item;
      }),
    ]);
    console.log(data);
  };

  const handleDeleteClick = (_id: string) => {
    setData((data) => data.filter((item) => item._id !== _id));
    setTodo((todo) => todo.filter((item) => item._id !== _id));
  };

  const handleOrderChange = (filter: string) => {
    if (filter === "A-Z") {
      console.log("az");
      setOrder(filter);
      setTodo((prevData) =>
        prevData.sort((a, b) => {
          if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
          if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
          return 0;
        })
      );
      setData((prevData) =>
        prevData.sort((a, b) => {
          if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
          if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
          return 0;
        })
      );
    } else if (filter === "Z-A") {
      console.log("za");
      setOrder(filter);
      setTodo((prevData) =>
        prevData.sort((a, b) => {
          if (a.title.toUpperCase() < b.title.toUpperCase()) return 1;
          if (a.title.toUpperCase() > b.title.toUpperCase()) return -1;
          return 0;
        })
      );
      setData((prevData) =>
        prevData.sort((a, b) => {
          if (a.title.toUpperCase() < b.title.toUpperCase()) return 1;
          if (a.title.toUpperCase() > b.title.toUpperCase()) return -1;
          return 0;
        })
      );
    } else {
      console.log(filter);
      setOrder(filter);
    }
  };
  return (
    <>
      {isLoading ? (
        <WorkspaceLoader />
      ) : (
        <Paper elevation={0} className="workspace-container transition-class">
          {/* row */}
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
              <Avatar src={getUserProfileUrl()} alt="user-photo" />
            </div>
          </div>
          {/* quote */}
          <Paper elevation={0} className="workspace-body transition-class">
            <br />
            <Typography variant="subtitle2" color="textSecondary">
              {isLoading ? "loading..." : quoter.quote}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className="italic"
            >
              {isLoading ? "loading..." : ` ~ ${quoter.author}`}
            </Typography>
            <br />
            <Searchbar onSearch={onSearch} />
            <br />
            {data.length === 0 && (
              <Typography className="muted">yayy empty list!!!</Typography>
            )}
            {data.length > 0 && (
              <>
                {order === "PinnedFirst" && (
                  <>
                    <Typography variant="body1" color="secondary">
                      Pinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                    <Typography variant="body1" color="primary">
                      Unpinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {!item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                  </>
                )}

                {order === "A-Z" && (
                  <>
                    <Typography variant="body1" color="secondary">
                      Pinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                    <Typography variant="body1" color="primary">
                      Unpinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {!item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                  </>
                )}

                {order === "Z-A" && (
                  <>
                    <Typography variant="body1" color="secondary">
                      Pinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                    <Typography variant="body1" color="primary">
                      Unpinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {!item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                  </>
                )}

                {order === "UnpinnedFirst" && (
                  <>
                    <Typography variant="body1" color="primary">
                      Unpinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {!item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                    <Typography variant="body1" color="secondary">
                      Pinned
                    </Typography>
                    <br />
                    <Paper
                      elevation={0}
                      className="workspace-cards transition-class"
                    >
                      {data.map((item) => (
                        <>
                          {item.isStarred && (
                            <CardComponent
                              onSubmit={handleTodoSubmit}
                              onPinClick={handlePinClick}
                              onDeleteClick={handleDeleteClick}
                              key={item._id}
                              data={item}
                            />
                          )}
                        </>
                      ))}
                    </Paper>
                  </>
                )}
              </>
            )}
            {/* {data.length > 0 && <></>} */}
          </Paper>
          {/* fab */}
          {/* experimental */}
          <AddTodoDialog
            onSubmit={handleTodoSubmit}
            onClose={() => {
              setIsAddTodoOpen(false);
            }}
            isAddTodoDialogOpen={isAddTodoopen}
          />
          <SpeedDial
            className={getFabStyle().speedDial}
            ariaLabel="sdf"
            onClick={() => {
              console.log(getUserDataHook());
              // console.log(getUserChatID());
              // console.log(getUserDndStatus());
              // console.log(getUserNotificationStatus());
              // console.log(getUserRequestID());
              // console.log(getUserTodoID());
              // console.log(getUserFriendID());
              // console.log(getUserID());
              // console.log(getUserTheme());
              // console.log(getUserJoinedAt());
              // console.log(getUserName());
              // console.log(getUserUserName());
              // console.log(getUserEmail());
              // console.log(getUserProfileUrl());
              setIsAddTodoOpen((prev) => !prev);
              // enqueueSnackbar("hello", { variant: "error" });
            }}
            icon={<SpeedDialIcon />}
            open={false}
          />
          {/* fab */}
        </Paper>
      )}
      {/* drawer backdrop */}
      <Backdrop
        open={open}
        onClick={handleDrawerToggle}
        className={backdropClasses.backdrop}
      />
      {/* drawer */}
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
        <DrawerList
          handleFilter={handleOrderChange}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Drawer>
    </>
  );
};
