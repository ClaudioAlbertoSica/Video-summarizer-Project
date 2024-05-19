import { useContext } from "react";
import { LoggedUserContext } from "../../../ActiveUserContext";
import { Avatar, Container, Typography } from "@mui/material";
import StarCounter from "../StarCounter/StarCounter";
import "./View.css";

function PDFviwerHeader() {
  const { userState } = useContext(LoggedUserContext);

  return (
    <Container className="HeaderItemsConatiner">
      <Avatar src={userState.selectedSummary?.miniatura} sx={{ width: 55, height: 55, marginRight: "15px" }}></Avatar>
      <Typography className="SummaryTitle" variant="h4" textAlign="left">
        {userState.selectedSummary.title}
      </Typography>
      <Container style={{ display: "inline-flex", maxWidth: "fit-content", margin: "0px" }}>
        <StarCounter starsToShow={5} couterSize="large" starsToColour={userState.selectedSummary.points} />
      </Container>
    </Container>
  );
}

export default PDFviwerHeader;
