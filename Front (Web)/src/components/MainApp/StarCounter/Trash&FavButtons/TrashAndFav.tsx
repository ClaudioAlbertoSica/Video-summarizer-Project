import { Container } from "@mui/material";
import Favorite from "./Favorite";
import Trash from "./Trash";
import { ReactElement } from "react";

interface Props {
  isLiked: boolean;
  whatToShow?: "trash" | "favs" | "both" | "none";
}

function TrashAndFav({ isLiked, whatToShow = "none" }: Props) {
  const resolveReturn = () => {
    let elementtoReturn: ReactElement = <></>;
    switch (whatToShow) {
      case "both":
        elementtoReturn = (
          <>
            {" "}
            <Favorite isLiked={isLiked} /> <Trash />{" "}
          </>
        );
        break;
      case "favs":
        elementtoReturn = <Favorite isLiked={isLiked} />;
        break;
      case "trash":
        elementtoReturn = <Trash />;
        break;
      default:
        <></>;
    }
    return elementtoReturn;
  };

  return <Container>{resolveReturn()}</Container>;
}

export default TrashAndFav;
