import { ListItem, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export const SettingLoader = (): JSX.Element => {
  return (
    <Paper elevation={0} className="settings-container transition-class">
      <br />
      <Paper variant="outlined" className="profile-row transition-class">
        <div className="profile-container">
          <Skeleton
            variant="circle"
            className="large-profile"
            animation="pulse"
          />
          <div className="user-details">
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={100} height={20} />
          </div>
        </div>
        <div>
          <Skeleton variant="circle" height={30} width={30} />
        </div>
      </Paper>
      <br />
      <Paper className="settings-list transition-class" variant="outlined">
        <ListItem>
          <Skeleton height={50} width={1000} />
        </ListItem>
      </Paper>
      <Paper className="settings-list transition-class" variant="outlined">
        <ListItem>
          <Skeleton height={50} width={1000} />
        </ListItem>
      </Paper>
      <Paper className="settings-list transition-class" variant="outlined">
        <ListItem>
          <Skeleton height={50} width={1000} />
        </ListItem>
      </Paper>
      <Paper className="settings-list transition-class" variant="outlined">
        <ListItem>
          <Skeleton height={50} width={1000} />
        </ListItem>
      </Paper>
      <Paper className="settings-list transition-class" variant="outlined">
        <ListItem>
          <Skeleton height={50} width={1000} />
        </ListItem>
      </Paper>
      <Paper className="settings-list transition-class" variant="outlined">
        <ListItem>
          <Skeleton height={50} width={1000} />
        </ListItem>
      </Paper>
      <br />
    </Paper>
  );
};
