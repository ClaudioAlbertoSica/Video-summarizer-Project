import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { Container, Typography } from "@mui/material";

function ReadyWorkIndicator() {
  return (
    <Container className="WIPindicatorsContainer">
      <CheckCircleOutlineSharpIcon color="primary" fontSize="large" />
      <Container className="WIPtextContainer">
        <Typography variant="subtitle2">RESÚMENES LISTOS</Typography>
        <Typography variant="caption">Podés accederlos desde tu historial</Typography>
      </Container>
    </Container>
  );
}

export default ReadyWorkIndicator;
