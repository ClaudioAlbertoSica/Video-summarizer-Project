import { Avatar, Container, IconButton, Skeleton, Typography } from "@mui/material";
import StarCounter from "../../../StarCounter/StarCounter";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./ListItem.css";

interface Optionals {
  image?: string;
  title?: string;
}

function ListItemPlaceHolder({ image, title }: Optionals) {
  return (
    <Container className="ListItemContainer">
      {image ? (
        <Avatar src={image}></Avatar>
      ) : (
        <Skeleton animation="pulse" variant="circular">
          <Avatar />
        </Skeleton>
      )}
      <Container>
        {title ? (
          <Typography className="ListItemTitle" variant="h6" textAlign="left">
            {title}
          </Typography>
        ) : (
          <Skeleton>
            <Typography className="ListItemTitle" variant="h6" textAlign="left">
              This is a Placeholder text! This is a Placeholder text!
            </Typography>
          </Skeleton>
        )}
        <StarCounter starsToShow={5} couterSize="small" starsToColour={3} disabled={true} />
      </Container>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </Container>
  );
}

export default ListItemPlaceHolder;
