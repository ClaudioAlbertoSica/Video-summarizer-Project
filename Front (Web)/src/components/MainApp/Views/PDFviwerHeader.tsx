import { Avatar, Container, Typography } from "@mui/material";
import StarCounter from "../StarCounter/StarCounter";
import "./View.css";
import { Summary } from "../../../Services/Types/UserTypes";

function PDFviwerHeader({ thumbnail, title, points, isFavourite, idres }: Summary) {
  return (
    <>
      {console.log(thumbnail)}
      {idres != "-1" && (
        <Container className="HeaderItemsConatiner">
          <Avatar className="PDFviewrHeadAvatar" src={thumbnail}></Avatar>
          <Typography className="SummaryTitle" variant="h4" textAlign="left">
            {title}
          </Typography>
          <Container style={{ display: "inline-flex", maxWidth: "fit-content", margin: "0px" }}>
            <StarCounter
              starsToShow={5}
              couterSize="large"
              starsToColour={points}
              isLiked={isFavourite}
              showTrashAndFavs={"both"}
            />
          </Container>
        </Container>
      )}
    </>
  );
}

export default PDFviwerHeader;
