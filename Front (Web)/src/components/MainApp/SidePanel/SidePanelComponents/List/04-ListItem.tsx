import { Avatar, Container, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarCounter from "../../../StarCounter/StarCounter.tsx";
import "./ListItem.css";
import { useContext } from "react";
import { ButtonViewContext } from "../../../ButtonViewContext.ts";
import { ValidViewNames } from "../../../Views/ImTheActiveView.ts";
import { SelectedSummaryContext } from "../../../SelectedSummaryContext.ts";

export interface ListItemObject {
  idRes: string;
  image: string;
  title: string;
  thisItemRating?: number;
  isFavourite: boolean;
}

function SummaryListItem({ thisItemRating = 0, image, title, idRes, isFavourite }: ListItemObject) {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  const summaryContext = useContext(SelectedSummaryContext);

  const handleClick = () => {
    summaryContext.SetState({
      ...summaryContext.State,
      ...{ idres: idRes, title, points: thisItemRating, miniatura: image, isFavourite },
    });

    setSelectedCentralPanelView(ValidViewNames.Summary);
  };

  return (
    <Container className="ListItemContainer">
      <Container className="ItemAndTitleContainer">
        <Avatar src={image}></Avatar>
        <Container className="TitleAndCounterContainer">
          <Tooltip title={title} placement="top-end">
            <Typography className="ListItemTitle" variant="h6" textAlign="left">
              {title}
            </Typography>
          </Tooltip>
          <StarCounter
            starsToShow={5}
            couterSize="small"
            starsToColour={thisItemRating}
            disabled="counter"
            isLiked={isFavourite}
          />
        </Container>
      </Container>
      <Container className="IconButtonContainer">
        <IconButton onClick={() => handleClick()}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Container>
    </Container>
  );
}

export default SummaryListItem;
