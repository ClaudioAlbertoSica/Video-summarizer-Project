import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { Container, Typography, useTheme } from "@mui/material";

function ReadyWorkIndicator() {
  const myTheme = useTheme();
  return (
    <Container className="WIPindicatorsContainer" sx={{ backgroundColor: myTheme.palette.my.sidePanelBg}}>
      <CheckCircleOutlineSharpIcon color="primary" fontSize="large" />
      <Container className="WIPtextContainer">
        <Typography variant="subtitle2">RESÚMENES LISTOS</Typography>
        <Typography variant="caption">Podés accederlos desde tu historial</Typography>
      </Container>
    </Container>
  );
}

export default ReadyWorkIndicator;
