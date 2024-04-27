import { TextField, Box, Button, Container, Link, Typography } from "@mui/material";
import "./LoginModal.css";

function LoginModal() {
  return (
    <Container className="ExternalLoginContainer">
      <Box className="FormBox" component="form">
        <Typography variant="h3" display="block" gutterBottom>
          Login
        </Typography>
        <Typography variant="subtitle1" display="block" gutterBottom>
          Ingrese su email y su contraseña
        </Typography>
        <TextField
          className="FormInputs"
          id="outlined-search"
          name="yourEmail"
          label="Your e-mail"
          type="input"
          variant="outlined"
        />
        <TextField
          className="FormInputs"
          id="outlined-search"
          name="yourPassword"
          label="Your Password"
          type="input"
          variant="outlined"
        />
        <Container className="FormButtonContainer">
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Container>
      </Box>
      <Container className="bottomOptionsContainer">
        <Typography variant="caption" display="block" gutterBottom>
          ¿No tiene cuenta? &nbsp;
          <Link>Crear Una</Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          ¿Olvidó su contraseña? &nbsp;
          <Link>Recuperarla</Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default LoginModal;
