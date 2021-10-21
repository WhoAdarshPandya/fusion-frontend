import { makeStyles } from "@material-ui/core";

export const getTabStyle = makeStyles({
  indicator: {
    top: "0px",
  },
});

export const SwipeableStyles = {
  tabs: {
    background: "#fff",
  },
  slide: {
    minHeight: "100%",
    height: "455px",
    color: "#333",
  },
};

export const sanitizer = (value: string) => value.toLocaleLowerCase().trim();
