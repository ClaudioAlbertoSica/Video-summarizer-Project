import { ReactElement, useContext, useEffect, useRef } from "react";
import { List, ListItem, Paper } from "@mui/material";
import SummaryListItem from "./04-ListItem.tsx";
import ListItemPlaceholder from "./05-ListItemPlaceHolder.tsx";
import "./List&Handler.css";
import placeholderImage from "../../../../../assets/Logo.png";
import { LoggedUserContext } from "../../../../../ActiveUserContext.ts";
import { Summary } from "../../../../../Services/Types/UserTypes.ts";

function ListFavorites() {
  const currentlyLoggedUsuer = useContext(LoggedUserContext).userState;
  const favoritesList = useRef<Summary[]>([]);

  useEffect(() => {
    favoritesList.current = currentlyLoggedUsuer.inventario.filter((thisSumm) => thisSumm.isFavourite === true);
  }, [currentlyLoggedUsuer.inventario, currentlyLoggedUsuer.selectedSummary]);

  const listToShow = () => {
    let objetcToReturn: ReactElement[] = [
      <ListItem key={"Nothing to show"}>
        <ListItemPlaceholder image={placeholderImage} title="Sin favoritos" />
      </ListItem>,
    ];

    if (favoritesList.current.length !== 0) {
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
      <Paper className="ListWrapper" elevation={1}>
        <List>{listToShow()}</List>
      </Paper>
    </>
  );
}

export default ListFavorites;
