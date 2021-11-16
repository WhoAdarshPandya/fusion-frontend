import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Backdrop,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDarkMode, useDate } from "../../hooks";
import { getDrawerStyle, getFabStyle, stringTruncate } from "../../utils";
import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";
import CloseIcon from "@material-ui/icons/Close";
import { getBackdropStyle, getRandomQuote } from "../../utils";
import { DrawerList, Searchbar } from "../";
import { SpeedDial } from "@material-ui/lab";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Workspace.css";
// import { useSnackbar } from "notistack";

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
  const { currentTheme } = useDarkMode();
  const data = [
    {
      title: "call marketer",
      date: "September 14,2016",
      description:
        "discussion around marketing of new product, salary negotiation for new joinee and confirming designation",
    },
    {
      title: "meeting with dev team",
      date: "September 14,2016",
      description:
        "discussion around new product launch and modification around the website. discussion around few bugs and fixes. diwali bonus discussion",
    },
    {
      title: "buy new interior",
      date: "September 14,2016",
      description:
        "search around websites , find affordable interiors. call the known sellers for tender around this. and call it a day",
    },
  ];
  // const { enqueueSnackbar } = useSnackbar();

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const data = await getRandomQuote();
      if (data.success) {
        setQuoter({ author: data.author, quote: data.content });
      }
      setIsLoading(false);
    })();
  }, []);

  console.log(wish);
  return (
    <>
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
          <Searchbar />
          <br />
          <Paper elevation={0} className="workspace-cards transition-class">
            {data.map((item) => (
              <Card
                elevation={1}
                className={
                  currentTheme === "light"
                    ? "workspace-card light-card"
                    : "workspace-card dark-card"
                }
              >
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon fontSize="medium" />
                    </IconButton>
                  }
                  title={
                    <Typography noWrap variant="body1" color="textPrimary">
                      {item.title}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" color="textSecondary">
                      {item.date}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {stringTruncate(item.description)}
                  </Typography>
                </CardContent>
              </Card>
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
