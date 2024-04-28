import { TextField, Box, Button, Container, Link, Typography } from "@mui/material";
import "./Modals.css";
import { ModalNames } from "../LoginLayout.tsx";

interface LoginModalSelector {
  selectorCallback: (modalName: ModalNames["modalName"]) => void;
}

function PasswordResetModal({ selectorCallback }: LoginModalSelector) {
  return (
    <Container className="ExternalLoginContainer">
      <Box className="FormBox" component="form">
        <Typography variant="h3" textAlign="center" gutterBottom>
          ¿Olvidó su contraseña?
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Ingrese su email. Le será enviado un correo con una nueva contraseña (podrá cambiarla luego).
        </Typography>
        <TextField
          className="FormInputs"
          id="outlined-search"
          name="yourEmail"
          label="Ingrese su e-mail"
          type="password"
          variant="outlined"
          required
        />
        <Container className="FormButtonContainer">
          <Button variant="contained" type="submit">
            Recuperar
          </Button>
        </Container>
      </Box>
      <Container className="bottomOptionsContainer">
        <Typography variant="caption" display="block" gutterBottom>
          ¿Ya posee una cuenta? &nbsp;
          <Link onClick={() => selectorCallback("LoginModal")} underline="hover">
            Ingresar
          </Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          ¿No tiene cuenta? &nbsp;
          <Link onClick={() => selectorCallback("CreateAccountModal")} underline="hover">
            Crear Una
          </Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default PasswordResetModal;
