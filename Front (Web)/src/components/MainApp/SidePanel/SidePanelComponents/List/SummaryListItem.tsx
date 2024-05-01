import { Avatar, Container, Typography } from "@mui/material";
import StarCounter from "../../../StarCounter/StarCounter.tsx";
import "./ListItem.css";

interface ListItemObject {
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
    </Container>
  );
}

export default SummaryListItem;
