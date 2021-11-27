import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { CustomDialog } from "..";
import { getUuid } from "../../utils";
import "./ShortcutDialog.css";

interface ShortcutDialogProps {
  isShortcutDialogOpen: boolean;
  onClose: () => void;
}

export const ShortcutDialog = ({
  isShortcutDialogOpen,
  onClose,
}: ShortcutDialogProps): JSX.Element => {
  const shortcuts = [
    {
      id: getUuid(),
      title: "Workspace",
      subtitle: "use this shortcut to go to workspace directly",
      short_key: "shift+w",
    },
    {
      id: getUuid(),
      title: "Chat",
      subtitle: "use this shortcut to go to chat tab directly",
      short_key: "shift+c",
    },
    {
      id: getUuid(),
      title: "Discover",
      subtitle: "use this shortcut to go to discover tab directly",
      short_key: "shift+d",
    },
    {
      id: getUuid(),
      title: "Settings",
      subtitle: "use this shortcut to go to settings directly",
      short_key: "shift+s",
    },
    {
      id: getUuid(),
      title: "Navigate in right direction",
      subtitle: "Switch tabs using right arrow keys",
      short_key: "→",
    },
    {
      id: getUuid(),
      title: "Navigate in left direction",
      subtitle: "Switch tabs left right arrow keys",
      short_key: "←",
    },
  ];
  return (
    <CustomDialog
      cancelButton={false}
      onOkClick={onClose}
      open={isShortcutDialogOpen}
      onClose={onClose}
      containsContent={false}
      title="Shortcuts"
    >
      <div className="shortcut-container">
        <List className="width-100">
          {shortcuts.map(({ id, short_key, subtitle, title }) => (
            <div key={id}>
              <ListItem button>
                <ListItemText primary={title} secondary={subtitle} />
                <ListItemSecondaryAction>
                  <Button color="secondary">{short_key}</Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </CustomDialog>
  );
};
