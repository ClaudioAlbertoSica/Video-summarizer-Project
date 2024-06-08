import { Container } from "@mui/material";
import Favorite from "./Favorite";
import { ReactElement } from "react";
import DeletePDF from "../../DeletePDF/DeletePDF";

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
            <Favorite isLiked={isLiked} /> <DeletePDF buttonType="icon" />{" "}
          </>
        );
        break;
      case "favs":
        elementtoReturn = <Favorite isLiked={isLiked} />;
        break;
      case "trash":
        elementtoReturn = <DeletePDF buttonType="icon" />;
        break;
      default:
        <></>;
    }
    return elementtoReturn;
  };

  return <Container>{resolveReturn()}</Container>;
}

export default TrashAndFav;
