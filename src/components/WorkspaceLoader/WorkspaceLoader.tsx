import { IconButton, Paper, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Skeleton } from "@material-ui/lab";
import { useDarkMode } from "../../hooks";

export const WorkspaceLoader = (): JSX.Element => {
  const { currentTheme } = useDarkMode();
  return (
    <Paper elevation={0} className="workspace-container transition-class">
      <div className="workspace-row">
        <div>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </div>
        <div>
          <Typography variant="subtitle2" color="textPrimary">
            <Skeleton variant="text" width={200} animation="wave" />
          </Typography>
        </div>
        <div className="avatar-flex">
          <Skeleton variant="circle" height={50} width={50} animation="wave" />
        </div>
      </div>
      <Paper elevation={0} className="workspace-body transition-class">
        <br />
        <Typography variant="subtitle2" color="textSecondary">
          <Skeleton variant="text" height={50} animation="wave" />
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          className="italic"
        >
          <Skeleton variant="text" width={150} animation="wave" />
        </Typography>
        <br />
        <Skeleton variant="rect" height={40} animation="wave" />
        <br />

        <Typography variant="body1" color="secondary">
          <Skeleton variant="text" width={70} animation="wave" />
        </Typography>
        <br />
        <Paper elevation={0} className="workspace-cards transition-class">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              variant="rect"
              height={250}
              animation="wave"
              className={
                currentTheme === "light"
                  ? `workspace-card light-card`
                  : `workspace-card dark-card`
              }
            />
          ))}
        </Paper>
        <Typography variant="body1" color="secondary">
          <Skeleton variant="text" width={70} animation="wave" />
        </Typography>
        <br />
        <Paper elevation={0} className="workspace-cards transition-class">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              variant="rect"
              height={250}
              animation="wave"
              className={
                currentTheme === "light"
                  ? `workspace-card light-card`
                  : `workspace-card dark-card`
              }
            />
          ))}
        </Paper>
      </Paper>
      {/* fab */}
      {/* experimental */}
      {/* fab */}
    </Paper>
  );
};
