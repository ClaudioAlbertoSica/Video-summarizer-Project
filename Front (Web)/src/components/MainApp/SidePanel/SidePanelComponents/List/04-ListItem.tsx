import { Avatar, Container, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarCounter from "../../../StarCounter/StarCounter.tsx";
import "./ListItem.css";
import { useContext } from "react";
import { ButtonViewContext } from "../../../ButtonViewContext.ts";
import { ValidViewNames } from "../../../Views/ImTheActiveView.ts";
import { SelectedSummaryContext } from "../../../SelectedSummaryContext.ts";
import { Summary } from "../../../../../Services/Types/UserTypes.ts";

/*export interface ListItemObject {
  idRes: string;
  image: string;
  title: string;
  thisItemRating?: number;
  isFavourite: boolean;
}*/
function SummaryListItem({ idres, title, points, thumbnail, isFavourite }: Summary) {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  const summaryContext = useContext(SelectedSummaryContext);
  const myTheme = useTheme();
  const handleClick = () => {
    summaryContext.SetState({
      ...summaryContext.State,
      ...{ idres, title, points, thumbnail, isFavourite },
    });

    setSelectedCentralPanelView(ValidViewNames.Summary);
  };

  return (
    <Container className="ListItemContainer" sx={{backgroundColor: myTheme.palette.my.sidePanelBg}}>
      <Container className="ItemAndTitleContainer">
        <Avatar className="avatarForListItem" src={thumbnail}></Avatar>
        <Container className="TitleAndCounterContainer">
          <Tooltip title={title} placement="top-end">
            <Typography className="ListItemTitle" variant="h6" textAlign="left">
              {title}
            </Typography>
          </Tooltip>
          <StarCounter starsToShow={5} couterSize="small" starsToColour={points} disabled="counter" isLiked={isFavourite} />
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
