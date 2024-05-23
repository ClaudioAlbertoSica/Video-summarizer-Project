import { ReactElement, useContext } from "react";
import StarIconActive from "./StarIconActive.tsx";
import { Stack, Typography } from "@mui/material";
import "./Stars.css";
import StarIconPassive from "./StarIconPassive.tsx";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";
import server from "../../../../src/Services/serverCall.ts";
import { SelectedSummaryContext } from "../SelectedSummaryContext.ts";
import { LoggedUser } from "../../../Services/Types/UserTypes.ts";
import TrashAndFav from "./Trash&FavButtons/TrashAndFav.tsx";

export interface CounterProps {
  starsToShow: number;
  starsToColour?: number;
  couterSize: "small" | "large" | "medium";
  disabled?: "none" | "counter" | "usePlaceHolder"; //Explanaition: "none" for normal Counter behaviour; "counter" displays starts as usual, but doesn't change upon clicking a star (counter has a fixed value); "usePlaceHolder" displays grey-colored PlaceHolder stars.
  isLiked: boolean;
  showTrashAndFavs?: "trash" | "favs" | "both" | "none";
}

type StringToNumberMap = {
  [key: string]: number;
};

function StarCounter({
  starsToShow,
  couterSize,
  starsToColour = 0,
  disabled = "none",
  isLiked,
  showTrashAndFavs = "none",
}: CounterProps) {
  const loggedUser = useContext(LoggedUserContext);
  const summaryContext = useContext(SelectedSummaryContext);

  const handleClickedActiveStar = async (num: number) => {
    const idresSelected = summaryContext.State.idres;
    const selectedResDBindex = loggedUser.userState.inventario.findIndex((sum) => sum.idres === idresSelected);

    await server
      .put(`/${loggedUser.userState.id}/resumen/${summaryContext.State.idres}`, { points: num })
      .then(() => {
        const newUserContext: LoggedUser = { ...loggedUser.userState };
        newUserContext.inventario[selectedResDBindex].points = num;
        loggedUser.userSteState(newUserContext);
        summaryContext.State.points = num;
        summaryContext.SetState(summaryContext.State);
      })
      .catch((err) => {
        console.log(err.error);
        console.log("Error on update");
      });
  };

  const renderActiveStars = () => {
    //Draws the required amount of stars. Also colours the user-selected amount.
    //Stars rendered by this method are passed down the returnedNumber property, so they can change the State of the StarCounter Component
    const objects: ReactElement[] = [];

    for (let index = 1; index <= starsToShow; index++) {
      const paintThisOne: boolean = index <= starsToColour;
      objects.push(
        <StarIconActive
          key={index}
          num={index}
          paintThisStar={paintThisOne}
          returnedNumber={handleClickedActiveStar}
          starSize={couterSize}
          starType={disabled === "usePlaceHolder" ? "PlaceHolder" : "normal"}
        />
      );
    }

    return objects;
  };

  const renderPasiveStars = () => {
    //Draws the required amount of stars. Also colours the user-selected amount.
    //Stars rendered by this method are NOT passed down the returnedNumber property. they will be rendered only once.
    const objects: ReactElement[] = [];

    for (let index = 1; index <= starsToShow; index++) {
      const paintThisOne: boolean = index <= starsToColour;
      objects.push(
        <StarIconPassive
          key={index}
          paintThisStar={paintThisOne}
          starSize={couterSize}
          starType={disabled === "usePlaceHolder" ? "PlaceHolder" : "normal"}
        />
      );
    }

    return objects;
  };

  /*Next map, and next convertStringToNumber() function are just to convert the string-based Size for star and counter, to numbers, 
  because the title only understands numbers, and not the string (understood by the icons)*/
  const stringToNumber: StringToNumberMap = {
    small: 15,
    medium: 20,
    large: 30,
  };

  function convertStringToNumber(thisSize: string): number | undefined {
    return stringToNumber[thisSize];
  }

  return (
    <>
      <Typography className="CounterTitle" variant="subtitle2" textAlign="left" fontSize={convertStringToNumber(couterSize)}>
        Rating
      </Typography>
      <Stack direction={"row"}>
        {disabled !== "none" ? renderPasiveStars() : renderActiveStars()}
        <TrashAndFav isLiked={isLiked} whatToShow={showTrashAndFavs} />
      </Stack>
    </>
  );
}

export default StarCounter;
