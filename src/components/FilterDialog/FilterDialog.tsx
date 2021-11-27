import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useState } from "preact/hooks";
import { CustomDialog } from "..";

interface FilterDialogProps {
  isFilterDialogOpen: boolean;
  onClose: () => void;
  onApply: (selectedFilter: string) => void;
}

export const FilterDialog = ({
  isFilterDialogOpen,
  onClose,
  onApply,
}: FilterDialogProps): JSX.Element => {
  const [value, setValue] = useState("PinnedFirst");
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <CustomDialog
      cancelButton={true}
      okButton={true}
      positiveButtonName="apply"
      negativeButtonName="cancel"
      onCancelClick={onClose}
      onOkClick={() => {
        onApply(value);
      }}
      open={isFilterDialogOpen}
      onClose={onClose}
      containsContent={false}
      title="Filter"
    >
      <FormLabel component="legend">Sort the todos</FormLabel>
      <RadioGroup aria-label="gender" value={value} onChange={handleChange}>
        <FormControlLabel
          value="PinnedFirst"
          control={<Radio color="primary" />}
          label="Pinned First"
        />
        <FormControlLabel
          value="UnpinnedFirst"
          control={<Radio color="primary" />}
          label="Unpinned First"
        />
        <FormControlLabel
          value="A-Z"
          control={<Radio color="primary" />}
          label="A-Z (Alphabetically)"
        />
        <FormControlLabel
          value="Z-A"
          control={<Radio color="primary" />}
          label="Z-A (Alphabetically)"
        />
        <FormControlLabel
          value="SortByDateAsc"
          control={<Radio color="primary" />}
          label="Sort By Date (Ascending)"
        />
        <FormControlLabel
          value="SortByDateDsc"
          control={<Radio color="primary" />}
          label="Sort By Date (Descending)"
        />
      </RadioGroup>
    </CustomDialog>
  );
};
