import { Box, Container, LinearProgress, Paper, Typography, useTheme } from "@mui/material";
import "./View.css";

function LoadingScreenPDF() {
  const myTheme = useTheme();
  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Container className="FormFlexPostal">
        <Box className="FormBoxView">
          <Typography className="ViewTitle" variant="h4">
            Estamos cargando el PDF
          </Typography>
          <Typography className="ViewSubTitle" variant="h6">
            Esto puede demorar varios minutos..
          </Typography>
          <Box className="ProgressLoadingBox">
            <LinearProgress />
          </Box>
          <Typography className="ViewInfo" variant="body1" sx={{ color: myTheme.palette.my.list}}>
            (Un resumen de texto es relativamente rápido, pero un video puede demorar dependiendo de complejidad.)
          </Typography>
        </Box>
        <Container className="RightContent WorkingResume" sx={{backgroundImage: `url(${myTheme.palette.image.loading})`}}></Container>
      </Container>
    </Paper>
  );
}

export default LoadingScreenPDF;
