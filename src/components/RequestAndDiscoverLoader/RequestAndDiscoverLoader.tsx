import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

interface RequestAndDiscoverLoaderProps {
  variant: "request" | "discover";
}

export const RequestAndDiscoverLoader = ({
  variant,
}: RequestAndDiscoverLoaderProps): JSX.Element => {
  return (
    <Paper elevation={0} className="request-container transition-class">
      <br />
      <div className="searchbar-container ">
        <Skeleton variant="rect" height={30} animation="wave" />
      </div>
      <div className="list-renderer">
        <br />
        <Typography variant="subtitle1" className="muted">
          <Skeleton variant="text" width={90} animation="wave" />
        </Typography>
        <List>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((user) => (
            <ListItem key={user} className="remove-horizontal-padding">
              <ListItemAvatar>
                <Skeleton
                  variant="circle"
                  height={50}
                  width={50}
                  animation="wave"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Skeleton variant="text" animation="wave" width={200} />
                }
                secondary={
                  <Skeleton variant="text" animation="wave" width={170} />
                }
              />
              <ListItemSecondaryAction>
                {variant === "request" && (
                  <>
                    <Button color="primary">
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={20}
                        width={60}
                      />
                    </Button>
                    <Button color="secondary">
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={20}
                        width={60}
                      />
                    </Button>
                  </>
                )}
                {variant === "discover" && (
                  <>
                    <Button color="primary">
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={20}
                        width={90}
                      />
                    </Button>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};
