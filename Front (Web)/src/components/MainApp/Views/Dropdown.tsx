import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import "./View.css";
import styles from "./Dropdown.module.css";

interface Props {
  id: string;
  name: string;
  label: string;
  placeHolderItem: string;
  children: string[];
  required?: boolean;
}

function Dropdown({ id, name, label, placeHolderItem, required = false, children }: Props) {
  const [value, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
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
      >
        <MenuItem className={styles.Item} value="">
          <em>{placeHolderItem}</em>
        </MenuItem>
        {children.map((element, index) => (
          <MenuItem key={index} className={styles.Item} value={element}>
            {element}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
