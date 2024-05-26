import { Box, Container, LinearProgress, Paper, Typography, useTheme } from "@mui/material";
import "./View.css";

function LoadingScreen() {
  const myTheme = useTheme();
  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Container className="FormFlexPostal">
        <Box className="FormBoxView">
          <Typography className="ViewTitle" variant="h4">
            Estamos trabajando en tu resumen...
          </Typography>
          <Typography className="ViewSubTitle" variant="h6">
            Esto puede demorar varios minutos.
            <br />
            Podrás volver a solicitar otro formulario, una vez que se concluya el trabajo en curso. <br />
            <br />
            Mientras esperás, podés continuar consultando tus otros resúmenes, previamente creados.
          </Typography>
          <Box className="ProgressLoadingBox">
            <LinearProgress />
          </Box>
          <Typography className="ViewInfo" variant="body1" sx={{ color: myTheme.palette.my.list}}>
            (Un resumen de texto es relativamente rápido, pero un video puede demorar dependiendo de su extensión.)
          </Typography>
        </Box>
        <Container className="RightContent WorkingResume"></Container>
      </Container>
    </Paper>
  );
}

export default LoadingScreen;
