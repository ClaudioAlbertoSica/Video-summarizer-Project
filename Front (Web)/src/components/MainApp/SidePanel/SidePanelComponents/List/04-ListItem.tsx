import { Avatar, Container, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarCounter from "../../../StarCounter/StarCounter.tsx";
import "./ListItem.css";
import { useContext } from "react";
import { ButtonViewContext } from "../../../ButtonViewContext.ts";
import { ValidViewNames } from "../../../Views/ImTheActiveView.ts";
import { LoggedUserContext } from "../../../../../ActiveUserContext.ts";

export interface ListItemObject {
  idRes: string;
  image: string;
  title: string;
  thisItemRating?: number;
}

function SummaryListItem({ thisItemRating = 0, image, title, idRes }: ListItemObject) {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  const userContext = useContext(LoggedUserContext);

  const handleClick = () => {
    userContext.userSteState({
      ...userContext.userState,
      selectedSummary: { idRes, title, point: thisItemRating, miniatura: image },
    });
    setSelectedCentralPanelView(ValidViewNames.Summary);
  };

  return (
    <Container className="ListItemContainer">
      <Avatar src={image}></Avatar>
      <Container>
        <Typography className="ListItemTitle" variant="h6" textAlign="left">
          {title}
        </Typography>
        <StarCounter starsToShow={5} couterSize="small" starsToColour={thisItemRating} disabled="counter" />
      </Container>
      <IconButton onClick={() => handleClick()}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Container>
  );
}

export default SummaryListItem;
