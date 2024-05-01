import { useEffect } from "react";
import { List, ListItem, Paper } from "@mui/material";
import ListItemPlaceHolder from "./05-ListItemPlaceHolder.tsx";
import "./List&Handler.css";

function ListPlaceholder() {
  const summariesArrayPlaceHolder: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {}, []);

  return (
    <>
      <Paper className="ListWrapper" elevation={1}>
        <List>
          {summariesArrayPlaceHolder.map((itm) => (
            <ListItem key={itm}>
              <ListItemPlaceHolder />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default ListPlaceholder;
