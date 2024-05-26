import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import "./View.css";
import styles from "./Dropdown.module.css";

interface Props {
  id: string;
  name: string;
  label: string;
  placeHolderItem: string;
  children: Language[];
  required?: boolean;
  toReset: boolean;
}

export type Language = {
  name: string;
  code: string;
};

function Dropdown({ id, name, label, placeHolderItem, required = false, children, toReset }: Props) {
  const [value, setValue] = useState("");
  const myTheme = useTheme();
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue("");
  }, [toReset]);

  /*Notice when you provide a className to the Dropdown, you are actually not using it in the .css, but the 3 classNames derived here,
whith the sufixes "Form", "Slect" and "Item"*/
  return (
    <FormControl required={required} size="small" className={styles.Form} style={{ marginBottom: "10px" }}>
      <InputLabel id={`${label}-helper`}>{label}</InputLabel>
      <Select
        className={styles.Select}
        name={name}
        id={id}
        value={value}
        labelId={`${label}-helper`}
        label={label}
        onChange={handleChange}
        sx={{ backgroundColor: myTheme.palette.my.greyModalBg }}
      >
        <MenuItem className={styles.Item} value="">
          <em>{placeHolderItem}</em>
        </MenuItem>
        {children.map((element, index) => (
          <MenuItem key={index} className={styles.Item} value={element.code}>
            {element.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
