import { Paper, Tab, Tabs } from "@material-ui/core";
import { useState } from "preact/hooks";
import SwipeableViews from "react-swipeable-views";
import { AvailableList, Request } from "..";
import { useDarkMode } from "../../hooks";
import { getTabStyle, SwipeableStyles as styles } from "../../utils";
import "./Discover.css";

export const Discover = (): JSX.Element => {
  const { currentTheme } = useDarkMode();
  const [index, setIndex] = useState(0);

  const handleChange = (ev: any, value: any) => {
    if (value === 0) {
      setIndex(0);
    }
    if (value === 1) {
      setIndex(1);
    }
  };

  return (
    <Paper elevation={0} className="discover-container transition-class">
      <Tabs
        textColor={currentTheme === "light" ? "primary" : "secondary"}
        indicatorColor={currentTheme === "light" ? "primary" : "secondary"}
        value={index}
        className={currentTheme === "light" ? "" : "dark-tabs"}
        orientation="horizontal"
        variant="fullWidth"
        onChange={handleChange}
        style={styles.tabs}
      >
        <Tab label="Requests" />
        <Tab label="Discover" />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChange}>
        <div style={styles.slideDiscover} className="overflow">
          <Request />
        </div>
        <div style={styles.slideDiscover} className="overflow">
          <AvailableList />
        </div>
      </SwipeableViews>
    </Paper>
  );
};
