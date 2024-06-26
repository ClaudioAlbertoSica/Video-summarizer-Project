import { ReactElement, useContext, useEffect, useState } from "react";
import { List, ListItem, Paper } from "@mui/material";
import SummaryListItem from "./04-ListItem.tsx";
import ListItemPlaceholder from "./05-ListItemPlaceHolder.tsx";
import "./List&Handler.css";
import placeholderImage from "../../../../../assets/Logo.png";
import { LoggedUserContext } from "../../../../../ActiveUserContext.ts";
import SearchBox from "./06-SearchBox.tsx";
import placeholderAvatar from "../../../../../assets/PlaceHolderAvatar2.png";

function ListForAccordion() {
  const currentlyLoggedUsuer = useContext(LoggedUserContext).userState;
  const [filterKeywords, setFilterKeywords] = useState<string>("");

  useEffect(() => {}, [currentlyLoggedUsuer.inventario, filterKeywords]);

  const listToShow = () => {
    let objetcToReturn: ReactElement[] = [
      <ListItem key={"Nothing to show"}>
        <ListItemPlaceholder image={placeholderImage} title="Sin resúmenes" />
      </ListItem>,
    ];

    if (currentlyLoggedUsuer.inventario.length !== 0) {
      objetcToReturn = currentlyLoggedUsuer.inventario.map((itm) => {
        let itemToReturn: ReactElement = <></>;
        if (itm.title.toLocaleLowerCase().includes(filterKeywords.toLowerCase())) {
          itemToReturn = (
            <ListItem key={itm.idres}>
              <SummaryListItem
                points={itm.points}
                thumbnail={itm.thumbnail ? itm.thumbnail : placeholderAvatar}
                title={itm.title}
                idres={itm.idres}
                isFavourite={itm.isFavourite}
              />
            </ListItem>
          );
        }
        return itemToReturn;
      });
    }
    return objetcToReturn;
  };

  return (
    <>
      <Paper className="ListWrapper" elevation={3}>
        <SearchBox filter={setFilterKeywords} />
        <List>{listToShow()}</List>
      </Paper>
    </>
  );
}

export default ListForAccordion;
