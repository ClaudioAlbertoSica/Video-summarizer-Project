import { Avatar, Container, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarCounter from "../../../StarCounter/StarCounter.tsx";
import "./ListItem.css";

export interface ListItemObject {
  image: string;
  title: string;
  thisItemRating?: number;
}

function SummaryListItem({ thisItemRating = 0, image, title }: ListItemObject) {
  return (
    <Container className="ListItemContainer">
      <Avatar src={image}></Avatar>
      <Container>
        <Typography className="ListItemTitle" variant="h6" textAlign="left">
          {title}
        </Typography>
        <StarCounter starsToShow={5} couterSize="small" starsToColour={thisItemRating} disabled={false} />
      </Container>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </Container>
  );
}

export default SummaryListItem;
