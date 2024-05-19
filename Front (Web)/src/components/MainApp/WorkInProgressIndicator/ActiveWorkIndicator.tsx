import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography } from "@mui/material";

function ActiveWorkIndicator() {
  return (
    <Container className="WIPindicatorsContainer">
      <CircularProgress />
      <Container className="WIPtextContainer">
        <Typography variant="subtitle2">RESUMEN EN PROCESO</Typography>
        <Typography variant="caption">Esto puede tomar unos minutos...</Typography>
      </Container>
    </Container>
  );
}

export default ActiveWorkIndicator;
