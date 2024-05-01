import { Avatar, Container, Skeleton, Typography } from "@mui/material";
import StarCounter from "../../../StarCounter/StarCounter";
import "./ListItem.css";

function SummaryListItemPlaceHolder() {
  return (
    <Container className="ListItemContainer">
      <Skeleton animation="pulse" variant="circular">
        <Avatar />
      </Skeleton>

      <Container>
        <Skeleton>
          <Typography className="ListItemTitle" variant="h6" textAlign="left">
            This is a Placeholder text!
          </Typography>
        </Skeleton>
        <StarCounter starsToShow={5} couterSize="small" starsToColour={3} disabled={true} />
      </Container>
    </Container>
  );
}

export default SummaryListItemPlaceHolder;
