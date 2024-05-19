import { ReactElement } from "react";
import List from "./02-List.tsx";
import ListFavorites from "./02-ListFavorites.tsx";
import ListPlaceholder from "./03-ListPlaceholder";

interface Favorites {
  isFavoritesList?: boolean;
}

function ListHandler({ isFavoritesList = false }: Favorites) {
  const isLoading = false;

  const evaluateReturnConditions = () => {
    let returnedElement: ReactElement = <ListPlaceholder />;

    if (!isLoading) {
      if (isFavoritesList) {
        returnedElement = <ListFavorites />;
      } else {
        returnedElement = <List />;
      }
    }

    return returnedElement;
  };
  return <>{evaluateReturnConditions()}</>;
}
export default ListHandler;
