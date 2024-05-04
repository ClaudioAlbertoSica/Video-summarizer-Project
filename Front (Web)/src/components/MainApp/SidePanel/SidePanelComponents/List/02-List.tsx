import { ReactElement, useContext } from "react";
import { List, ListItem, Paper } from "@mui/material";
import SummaryListItem from "./04-ListItem.tsx";
import ListItemPlaceholder from "./05-ListItemPlaceHolder.tsx";
import "./List&Handler.css";
import image from "../../../../../assets/Logo.png";
import { LoggedUserContext } from "../../../../../ActiveUserContext.ts";

function ListForAccordion() {
  const currentlyLoggedUsuer = useContext(LoggedUserContext).userState;

  const listToShow = () => {
    let objetcToReturn: ReactElement[] = [
      <ListItem key={"Nothing to show"}>
        <ListItemPlaceholder image={image} title="No summaries yet" />
      </ListItem>,
    ];

    if (currentlyLoggedUsuer.inventario.length !== 0) {
      objetcToReturn = currentlyLoggedUsuer.inventario.map((itm) => (
        <ListItem key={itm.idres}>
          <SummaryListItem thisItemRating={itm.point} image={itm.miniatura} title={itm.title} />
        </ListItem>
      ));
    }
    return objetcToReturn;
  };

  return (
    <>
      <Paper className="ListWrapper" elevation={1}>
        <List>{listToShow()}</List>
      </Paper>
    </>
  );
}

export default ListForAccordion;
