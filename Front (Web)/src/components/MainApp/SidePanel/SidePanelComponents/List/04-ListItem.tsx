import { Avatar, Container, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarCounter from "../../../StarCounter/StarCounter.tsx";
import "./ListItem.css";
import { useContext } from "react";
import { ButtonViewContext } from "../../../ButtonViewContext.ts";
import { SelectedSummaryContext } from "../../../SelectedSummaryContext.ts";
//import { selectedSummary } from "../../../SelectedSummaryContext.ts";
import { ValidViewNames } from "../../../Views/ImTheActiveView.ts";

export interface ListItemObject {
  idRes: string;
  image: string;
  title: string;
  thisItemRating?: number;
}

function SummaryListItem({ thisItemRating = 0, image, title, idRes }: ListItemObject) {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  const [, setSelectedSummary] = useContext(SelectedSummaryContext);

  const handleClick = () => {
    setSelectedSummary({ idRes: idRes, title: title });
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
