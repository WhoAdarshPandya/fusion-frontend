import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import DirectionsWalkOutlinedIcon from "@material-ui/icons/DirectionsWalkOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";

interface DrawerListProps {
  handleDrawerToggle: () => void;
}
export const DrawerList = ({
  handleDrawerToggle,
}: DrawerListProps): JSX.Element => {
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
        <ListItem button key={text} onClick={handleDrawerToggle}>
          <ListItemIcon>{component}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};
