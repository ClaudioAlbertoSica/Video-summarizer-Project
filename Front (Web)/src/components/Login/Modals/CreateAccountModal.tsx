import { TextField, Box, Button, Container, Link, Typography } from "@mui/material";
import "./Modals.css";

function CreateAccountModal() {
  return (
    <Container className="ExternalLoginContainer">
      <Box className="FormBox" component="form">
        <Typography variant="h3" textAlign="center" gutterBottom>
          Crear Cuenta
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Ingrese su email, su contraseña, vuelva a ingresar esta última para verificarla, y luego haga click en "Crear".
        </Typography>
        <TextField
          className="FormInputs"
          id="outlined-search"
          name="yourEmail"
          label="Ingrese su e-mail"
          type="input"
          variant="outlined"
        />
        <TextField
          className="FormInputs"
          id="outlined-search"
          name="yourPassword"
          label="Ingrese su Password"
          type="input"
          variant="outlined"
        />
        <TextField
          className="FormInputs"
          id="outlined-search"
          name="yourRepeatedPassword"
          label="Ingrese nuevamente su Password"
          type="input"
          variant="outlined"
        />
        <Container className="FormButtonContainer">
          <Button variant="contained" type="submit">
            Crear
          </Button>
        </Container>
      </Box>
      <Container className="bottomOptionsContainer">
        <Typography variant="caption" display="block" gutterBottom>
          ¿Ya posee una cuenta? &nbsp;
          <Link>Ingresar</Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          ¿Olvidó su contraseña? &nbsp;
          <Link>Recuperarla</Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default CreateAccountModal;
