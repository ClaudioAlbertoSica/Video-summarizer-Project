import { Avatar, Container, IconButton, Skeleton, Typography } from "@mui/material";
import StarCounter from "../../../StarCounter/StarCounter";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./ListItem.css";

function ListItemPlaceHolder() {
  return (
    <Container className="ListItemContainer">
      <Skeleton animation="pulse" variant="circular">
        <Avatar />
      </Skeleton>

      <Container>
        <Skeleton>
          <Typography className="ListItemTitle" variant="h6" textAlign="left">
            This is a Placeholder text! This is a Placeholder text!
          </Typography>
        </Skeleton>
        <StarCounter starsToShow={5} couterSize="small" starsToColour={3} disabled={true} />
      </Container>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </Container>
  );
}

export default ListItemPlaceHolder;
