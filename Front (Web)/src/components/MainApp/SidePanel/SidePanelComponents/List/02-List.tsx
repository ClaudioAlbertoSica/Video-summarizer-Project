import { ReactElement, useContext, useEffect } from "react";
import { List, ListItem, Paper } from "@mui/material";
import SummaryListItem from "./04-ListItem.tsx";
import ListItemPlaceholder from "./05-ListItemPlaceHolder.tsx";
import "./List&Handler.css";
import placeholderImage from "../../../../../assets/Logo.png";
import { LoggedUserContext } from "../../../../../ActiveUserContext.ts";

function ListForAccordion() {
  const currentlyLoggedUsuer = useContext(LoggedUserContext).userState;

  useEffect(() => {}, [currentlyLoggedUsuer.inventario]);

  const listToShow = () => {
    let objetcToReturn: ReactElement[] = [
      <ListItem key={"Nothing to show"}>
        <ListItemPlaceholder image={placeholderImage} title="No summaries yet" />
      </ListItem>,
    ];

    if (currentlyLoggedUsuer.inventario.length !== 0) {
      objetcToReturn = currentlyLoggedUsuer.inventario.map((itm) => (
        <ListItem key={itm.idres}>
          <SummaryListItem
            thisItemRating={itm.points}
            image={itm.miniatura}
            title={itm.title}
            idRes={itm.idres}
            isFavourite={itm.isFavourite}
          />
        </ListItem>
      ));
    }
    return objetcToReturn;
  };

  return (
    <>
      <Paper className="ListWrapper" elevation={3}>
        <List>{listToShow()}</List>
      </Paper>
    </>
  );
}

export default ListForAccordion;
