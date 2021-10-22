import { InputBase } from "@material-ui/core";
import { getSearchbarStyle } from "../../utils";
import SearchIcon from "@material-ui/icons/Search";

export const Searchbar = (): JSX.Element => {
  const classes = getSearchbarStyle();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search for titles/discription"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};
