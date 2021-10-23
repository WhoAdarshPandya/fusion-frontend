import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import DirectionsWalkOutlinedIcon from "@material-ui/icons/DirectionsWalkOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import { useDarkMode } from "../../hooks";

interface DrawerListProps {
  handleDrawerToggle: () => void;
}
export const DrawerList = ({
  handleDrawerToggle,
}: DrawerListProps): JSX.Element => {
  const { themeToggler } = useDarkMode();

  const beforeHandleDrawer = (text: string) => {
    if (text === "Theme") {
      themeToggler();
    }
    handleDrawerToggle();
  };

  return (
    <List>
      {[
        { text: "Filter", component: <SortOutlinedIcon /> },
        { text: "Theme", component: <ColorLensOutlinedIcon /> },
        { text: "About", component: <InfoOutlinedIcon /> },
        { text: "Shortcuts", component: <DirectionsWalkOutlinedIcon /> },
        { text: "Feature Request", component: <CodeOutlinedIcon /> },
        { text: "Logout", component: <PowerSettingsNewOutlinedIcon /> },
        { text: "DND", component: <BlockIcon /> },
      ].map(({ text, component }) => (
        <ListItem
          button
          key={text}
          onClick={() => {
            beforeHandleDrawer(text);
          }}
        >
          <ListItemIcon>{component}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};
