import { useEffect } from "react";
import { List, ListItem, Paper } from "@mui/material";
import { ListItemObject } from "./04-ListItem.tsx";
import SummaryListItem from "./04-ListItem.tsx";
import "./List&Handler.css";
//import image from "../../../../../assets/Logo.png";

function ListForAccordion() {
  const summariesArray: ListItemObject[] = [
    {
      thisItemRating: 3,
      image: "../../../../../assets/Logo.png",
      title: "Testtitle 1",
    },
    {
      thisItemRating: 5,
      image: "../../../../../assets/Logo.png",
      title: "Testtitle 2",
    },
    {
      image: "../../../../../assets/Logo.png",
      title: "Testtitle 3",
    },
    {
      thisItemRating: 0,
      image: "../../../../../assets/Logo.png",
      title: "Testtitle 4",
    },
    {
      thisItemRating: 3,
      image: "../../../../../assets/Logo.png",
      title: "Testtitle 5",
    },
  ];

  useEffect(() => {}, []);

  return (
    <>
      <Paper className="ListWrapper" elevation={1}>
        <List>
          {summariesArray.map((itm, pos) => (
            <ListItem key={pos}>
              <SummaryListItem thisItemRating={itm.thisItemRating} image={itm.image} title={itm.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default ListForAccordion;
