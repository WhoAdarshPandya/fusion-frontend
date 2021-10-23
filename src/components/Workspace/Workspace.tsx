import {
  Avatar,
  Backdrop,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDate } from "../../hooks";
import { getDrawerStyle, getFabStyle } from "../../utils";
import "./Workspace.css";
import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";
import CloseIcon from "@material-ui/icons/Close";
import { getBackdropStyle, getRandomQuote } from "../../utils";
import { DrawerList, Searchbar } from "../";
import { SpeedDial } from "@material-ui/lab";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
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
        </Paper>
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
      <Backdrop
        open={open}
        onClick={handleDrawerToggle}
        className={backdropClasses.backdrop}
      />
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
