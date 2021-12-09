import { useEffect, useState } from "preact/compat";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SettingsIcon from "@material-ui/icons/Settings";
import ForumIcon from "@material-ui/icons/Forum";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SwipeableViews from "react-swipeable-views";
import { useDarkMode } from "../../hooks";
import { getTabStyle, SwipeableStyles as styles } from "../../utils";
import { useParams, useNavigate } from "react-router-dom";
import { Workspace, Settings, Discover, Chat, Loader } from "..";
import { useHotkeys } from "react-hotkeys-hook";
import "./Home.css";

export const Home = (): JSX.Element => {
  const { currentTheme, themeToggler } = useDarkMode();
  let tabCount = 0;
  const { tab } = useParams();
  const navigate = useNavigate();
  if (tab === "workspace") tabCount = 0;
  else if (tab === "chat") tabCount = 1;
  else if (tab === "discover") tabCount = 2;
  else if (tab === "settings") tabCount = 3;
  else tabCount = 0;

  const [index, setIndex] = useState(tabCount);
  const classes = getTabStyle();

  useEffect(() => {
    if (
      tab !== "workspace" &&
      tab !== "chat" &&
      tab !== "discover" &&
      tab !== "settings"
    ) {
      navigate("/workspace");
      tabCount = 0;
    }
  });

  // ⚛ experimental
  // console.log(tabCount);
  useHotkeys("right", () => {
    if (tabCount === 3) {
      tabCount = 0;
      handleChange(null, tabCount);
    } else {
      tabCount += 1;
      handleChange(null, tabCount);
    }
  });
  useHotkeys("left", () => {
    if (tabCount === 0) {
      tabCount = 3;
      handleChange(null, tabCount);
    } else {
      tabCount -= 1;
      handleChange(null, tabCount);
    }
  });

  useHotkeys("shift+w", () => {
    tabCount = 0;
    handleChange(null, tabCount);
  });

  useHotkeys("shift+c", () => {
    tabCount = 1;
    handleChange(null, tabCount);
  });

  useHotkeys("shift+d", () => {
    tabCount = 2;
    handleChange(null, tabCount);
  });

  useHotkeys("shift+s", () => {
    tabCount = 3;
    handleChange(null, tabCount);
  });

  useHotkeys("shift+space", themeToggler);
  // ⚛ experimental

  const handleChange = (ev: any, value: number) => {
    if (value === 0) {
      // these tabCounts are experimental
      tabCount = 0;
      navigate("/workspace");
    } else if (value === 1) {
      tabCount = 1;
      navigate("/chat");
    } else if (value === 2) {
      tabCount = 2;
      navigate("/discover");
    } else if (value === 3) {
      tabCount = 3;
      navigate("/settings");
    }
    setIndex(value);
  };

  return (
    <Paper elevation={0} className="slider-container">
      <SwipeableViews index={index} onChangeIndex={handleChange}>
        <div className="testt slide">
          <Workspace />
        </div>
        <div style={styles.slide}>
          <Chat />
        </div>
        <div style={styles.slide}>
          <Discover />
        </div>
        <div style={styles.slide}>
          <Settings />
        </div>
      </SwipeableViews>
      <Tabs
        classes={{ indicator: classes.indicator }}
        textColor={currentTheme === "light" ? "primary" : "secondary"}
        indicatorColor={currentTheme === "light" ? "primary" : "secondary"}
        value={index}
        className={
          currentTheme === "light"
            ? "tabs-bottom-container"
            : "tabs-bottom-container dark-tabs"
        }
        orientation="horizontal"
        variant="fullWidth"
        // fullWidth
        onChange={handleChange}
        style={styles.tabs}
      >
        <Tab label={<NoteAddIcon />} />
        <Tab label={<ForumIcon />} />
        <Tab label={<GroupAddIcon />} />
        <Tab label={<SettingsIcon />} />
      </Tabs>
    </Paper>
  );
};
