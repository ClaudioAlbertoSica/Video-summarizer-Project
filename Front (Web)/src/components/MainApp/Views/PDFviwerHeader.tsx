import { Avatar, Container, Typography } from "@mui/material";
import StarCounter from "../StarCounter/StarCounter";
import "./View.css";
import { Summary } from "../../../Services/Types/UserTypes";

function PDFviwerHeader({ miniatura, title, points }: Summary) {
  return (
    <Container className="HeaderItemsConatiner">
      <Avatar src={miniatura} sx={{ width: 55, height: 55, marginRight: "15px" }}></Avatar>
      <Typography className="SummaryTitle" variant="h4" textAlign="left">
        {title}
      </Typography>
      <Container style={{ display: "inline-flex", maxWidth: "fit-content", margin: "0px" }}>
        <StarCounter starsToShow={5} couterSize="large" starsToColour={points} />
      </Container>
    </Container>
  );
}

export default PDFviwerHeader;
