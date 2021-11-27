import {
  Avatar,
  Backdrop,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDate } from "../../hooks";
import { getDrawerStyle, getFabStyle, stringTruncate } from "../../utils";
import { useEffect, useState } from "preact/hooks";
import { getBackdropStyle, getRandomQuote } from "../../utils";
import { DrawerList, Searchbar } from "../";
import { SpeedDial } from "@material-ui/lab";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { Loader, CustomDialog, CardComponent } from "..";
import { useHotkeys } from "react-hotkeys-hook";
import "./Workspace.css";

export const Workspace = (): JSX.Element => {
  const { date, wish } = useDate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quoter, setQuoter] = useState<{
    author: string | undefined;
    quote: string | undefined;
  }>({ author: "", quote: "" });
  const classes = getDrawerStyle();
  const backdropClasses = getBackdropStyle();
  const [data, setData] = useState([
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightBlue",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightRed",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightGreen",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightYellow",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "",
    },
    {
      card_id: "1",
      title: "meeting with dev team",
      date: "September 14,2016",
      description:
        "discussion around new product launch and modification around the website. discussion around few bugs and fixes. diwali bonus discussion",
      isPinned: false,
      color: "",
    },
    {
      card_id: "1",
      title: "buy new interior",
      date: "September 14,2016",
      description:
        "search around websites , find affordable interiors. call the known sellers for tender around this. and call it a day",
      isPinned: false,
      color: "",
    },
  ]);
  const [todo, setTodo] = useState([
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightBlue",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightRed",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightGreen",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "lightYellow",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "",
    },
    {
      card_id: "1",
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
      isPinned: true,
      color: "",
    },
    {
      card_id: "1",
      title: "meeting with dev team",
      date: "September 14,2016",
      description:
        "discussion around new product launch and modification around the website. discussion around few bugs and fixes. diwali bonus discussion",
      isPinned: false,
      color: "",
    },
    {
      card_id: "1",
      title: "buy new interior",
      date: "September 14,2016",
      description:
        "search around websites , find affordable interiors. call the known sellers for tender around this. and call it a day",
      isPinned: false,
      color: "",
    },
  ]);
  const [isSearchOn, setIsSearchOn] = useState(false);
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
      setIsLoading(false);
    })();
  }, []);

  // ⚛ experimental
  const onSearch = (search: string) => {
    if (search === "") {
      setData(todo);
    } else {
      setData(todo);
      setData((prevTodosData) =>
        prevTodosData.filter(
          (item) =>
            item.title.includes(search) || item.description.includes(search)
        )
      );
    }
  };
  // ⚛ experimental

  console.log(wish);
  return (
    <>
      <Loader isOpen={isLoading} />

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
            <Avatar
              src={"https://randomuser.me/api/portraits/men/4.jpg"}
              alt="user-photo"
            />
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
          <Typography variant="body1" color="secondary">
            Pinned
          </Typography>
          <br />
          <Paper elevation={0} className="workspace-cards transition-class">
            {data.map((item) => (
              <>
                {item.isPinned && (
                  <CardComponent key={item.card_id} data={item} />
                )}
              </>
            ))}
          </Paper>
          <Typography variant="body1" color="primary">
            Unpinned
          </Typography>
          <br />
          <Paper elevation={0} className="workspace-cards transition-class">
            {data.map((item) => (
              <>
                {!item.isPinned && (
                  <CardComponent key={item.card_id} data={item} />
                )}
              </>
            ))}
          </Paper>
        </Paper>
        {/* fab */}
        <SpeedDial
          className={getFabStyle().speedDial}
          ariaLabel="sdf"
          onClick={() => {
            // enqueueSnackbar("hello", { variant: "error" });
          }}
          icon={<SpeedDialIcon />}
          open={false}
        />
      </Paper>
      {/* dokcer backdrop */}
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
        <DrawerList handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </>
  );
};
