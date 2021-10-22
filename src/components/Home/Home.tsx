import { Paper, Tab, Tabs } from "@material-ui/core";
import { FC, useEffect, useState } from "preact/compat";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import ForumIcon from "@material-ui/icons/Forum";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SwipeableViews from "react-swipeable-views";
import { useDarkMode } from "../../hooks";
import "./Home.css";
import { getTabStyle, SwipeableStyles as styles } from "../../utils";
import { useParams, useNavigate } from "react-router-dom";
import { Workspace, Settings } from "..";

export const Home: FC = (props): JSX.Element => {
  const { currentTheme } = useDarkMode();
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
    }
  });

  const handleChange = (ev: any, value: number) => {
    if (value === 0) navigate("/workspace");
    else if (value === 1) navigate("/chat");
    else if (value === 2) navigate("/discover");
    else if (value === 3) navigate("/settings");
    setIndex(value);
  };

  return (
    <Paper elevation={0} className="slider-container">
      <SwipeableViews index={index} onChangeIndex={handleChange}>
        <div style={styles.slide} className="testt">
          <Workspace />
        </div>
        <div style={styles.slide}>chat</div>
        <div style={styles.slide}>discover|req</div>
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
