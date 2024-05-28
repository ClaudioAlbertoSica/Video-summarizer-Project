import { ReactElement, useContext, useEffect, useRef } from "react";
import { List, ListItem, Paper } from "@mui/material";
import SummaryListItem from "./04-ListItem.tsx";
import ListItemPlaceholder from "./05-ListItemPlaceHolder.tsx";
import "./List&Handler.css";
import placeholderImage from "../../../../../assets/Logo.png";
import { LoggedUserContext } from "../../../../../ActiveUserContext.ts";
import { Summary } from "../../../../../Services/Types/UserTypes.ts";
import placeholderAvatar from "../../../../../assets/PlaceHolderAvatar2.png";

function ListFavorites() {
  const currentlyLoggedUsuer = useContext(LoggedUserContext).userState;
  const favoritesList = useRef<Summary[]>([]);

  useEffect(() => {}, [currentlyLoggedUsuer.inventario]);

  const listToShow = () => {
    favoritesList.current = currentlyLoggedUsuer.inventario.filter((thisSumm) => thisSumm.isFavourite === true);
    let objetcToReturn: ReactElement[] = [
      <ListItem key={"Nothing to show"}>
        <ListItemPlaceholder image={placeholderImage} title="Sin favoritos" />
      </ListItem>,
    ];

    if (favoritesList.current.length !== 0) {
      objetcToReturn = favoritesList.current.map((itm) => (
        <ListItem key={itm.idres}>
          <SummaryListItem
            points={itm.points}
            thumbnail={itm.thumbnail ? itm.thumbnail : placeholderAvatar}
            title={itm.title}
            idres={itm.idres}
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
