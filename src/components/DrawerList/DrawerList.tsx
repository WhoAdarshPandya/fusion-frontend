import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import DirectionsWalkOutlinedIcon from "@material-ui/icons/DirectionsWalkOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import { useAuth, useDarkMode, useUser } from "../../hooks";
import { useState } from "preact/hooks";
import {
  AboutDialog,
  FeatureRequestDialog,
  FilterDialog,
  ShortcutDialog,
} from "..";
import { updateUserDndReq } from "../../utils";

interface DrawerListProps {
  handleDrawerToggle: () => void;
}
export const DrawerList = ({
  handleDrawerToggle,
}: DrawerListProps): JSX.Element => {
  const { themeToggler } = useDarkMode();
  const { makeUserLogout } = useAuth();
  const { getUserDndStatus, setUserDnd } = useUser();
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isShortcutDialogOpen, setIsShortcutDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isFeatureRequestDialogOpen, setIsFeatureRequestDialogOpen] =
    useState(false);
  // const [state,setState] = useState<'open'|'close'|''>("")

  const beforeHandleDrawer = async (text: string) => {
    if (text === "Theme") {
      themeToggler();
    }
    if (text === "About") {
      setIsAboutDialogOpen(true);
    }
    if (text === "Feature Request") {
      setIsFeatureRequestDialogOpen(true);
    }
    if (text === "Filter") {
      setIsFilterDialogOpen(true);
    }
    if (text === "Shortcuts") {
      setIsShortcutDialogOpen(true);
    }
    if (text === "Logout") {
      makeUserLogout();
    }
    if (text === "DND") {
      const data = await updateUserDndReq(!getUserDndStatus());
      if (data.success) {
        console.log(data.result);
        setUserDnd(!getUserDndStatus());
      } else {
        console.log(data.err);
      }
    }

    handleDrawerToggle();
  };

  const handleAboutClose = () => {
    setIsAboutDialogOpen(false);
  };

  const handleFeatureRequestClose = () => {
    setIsFeatureRequestDialogOpen(false);
  };

  const handleShortcutsClose = () => {
    setIsShortcutDialogOpen(false);
  };

  const handleFilterClose = () => {
    setIsFilterDialogOpen(false);
  };

  const onFilterApplied = (filter: string) => {
    console.log(filter);
    handleFilterClose();
  };
  return (
    <>
      <AboutDialog
        onClose={handleAboutClose}
        isAboutDialogOpen={isAboutDialogOpen}
      />
      <FeatureRequestDialog
        onClose={handleFeatureRequestClose}
        isFeatureRequestDialogOpen={isFeatureRequestDialogOpen}
      />
      <FilterDialog
        onClose={handleFilterClose}
        isFilterDialogOpen={isFilterDialogOpen}
        onApply={onFilterApplied}
      />
      <ShortcutDialog
        onClose={handleShortcutsClose}
        isShortcutDialogOpen={isShortcutDialogOpen}
      />
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
    </>
  );
};
