import { TextField, Box, Button, Container, Typography, Link } from "@mui/material";
import "./Modals.css";
import { ModalNames } from "../LoginLayout.tsx";
import server from "../../Services/serverCall.ts";

// Link as RouterLink,
interface LoginModalInterface {
  selectorCallback: (modalName: ModalNames["modalName"]) => void;
  setLoginBoolean: (status: boolean) => void;
}

function LoginModal({ selectorCallback, setLoginBoolean }: LoginModalInterface) {
  const handleLoginClick = async () => {
    await server
      .post("/login", { userName: "xaxaxax", passwd: "p3p3" })
      .then((res) => {
        console.log("Estoy aquí!!");
        console.log(res);
        setLoginBoolean(true);
      })
      .catch(() => {
        console.log("ERRROOOOOOOOOR!!");
      });
  };

  return (
    <Container className="ExternalLoginContainer">
      <Box className="FormBox" component="form">
        <Typography variant="h3" textAlign="center" gutterBottom>
          Ingresar
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Por favor, ingrese su email y su contraseña
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
        <Container className="FormButtonContainer">
          <Button variant="contained" type="submit" onClick={handleLoginClick}>
            Login
          </Button>
        </Container>
      </Box>
      <Container className="bottomOptionsContainer">
        <Typography variant="caption" display="block" gutterBottom>
          ¿No tiene cuenta? &nbsp;
          <Link onClick={() => selectorCallback("CreateAccountModal")}>Crear Una</Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          ¿Olvidó su contraseña? &nbsp;
          <Link onClick={() => selectorCallback("PasswordResetModal")}>Recuperarla</Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default LoginModal;
