import { InputBase } from "@material-ui/core";
import { getSearchbarStyle } from "../../utils";
import SearchIcon from "@material-ui/icons/Search";

export interface SearchbarProps {
  onSearch: (search: string) => void;
}

export const Searchbar = ({ onSearch }: SearchbarProps): JSX.Element => {
  const classes = getSearchbarStyle();

  const handleChange = (e: any) => {
    onSearch(e.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search for titles/description"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
    </div>
  );
};
