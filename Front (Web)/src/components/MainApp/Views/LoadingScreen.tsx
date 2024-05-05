import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import "./View.css";

function LoadingScreen() {
  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Typography className="ViewTitle" variant="h4">
        Estamos trabajando en tu resumen...
      </Typography>
      <Typography className="ViewSubTitle" variant="h6">
        Esto puede demorar varios minutos
      </Typography>
      <Box className="ProgressLoadingBox">
        <LinearProgress />
      </Box>
      <Typography className="ViewInfo" variant="body1">
        Un resumen de texto es relativamente rápido, pero un video puede demorar dependiendo de su extensión.
      </Typography>
    </Paper>
  );
}

export default LoadingScreen;
