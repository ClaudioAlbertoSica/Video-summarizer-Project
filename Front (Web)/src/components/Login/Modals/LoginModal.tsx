import { TextField, Box, Button, Container, Typography, Link, Alert } from "@mui/material";
import "./Modals.css";
import { ModalNames } from "../LoginLayout.tsx";
import server from "../../Services/serverCall.ts";
import { FormEvent, useRef, useState } from "react";

// Link as RouterLink,
interface LoginModalInterface {
  selectorCallback: (modalName: ModalNames["modalName"]) => void;
  setLoginBoolean: (status: boolean) => void;
}

function LoginModal({ selectorCallback, setLoginBoolean }: LoginModalInterface) {
  const formRef = useRef<HTMLFormElement>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const alertMessage: string = "Acceso denegado: por favor revise su usario y contraseña";

  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef?.current);
    const submittedEmail = formData?.get("yourEmail");
    const submittedPassword = formData?.get("yourPassword");
    await server
      .post("/login", { userName: submittedEmail, passwd: submittedPassword })
      .then(() => {
        setLoginBoolean(true);
      })
      .catch(() => {
        setShowAlert(true);
      });
  };

  return (
    <Container className="ExternalLoginContainer">
      <Box className="FormBox" component="form" ref={formRef} onSubmit={handleSumbit}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Ingresar
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Por favor, ingrese su email y su contraseña
        </Typography>
        {showAlert && <Alert severity="warning"> {alertMessage} </Alert>}
        <TextField
          className="FormInputs"
          id="mail"
          name="yourEmail"
          label="Ingrese su e-mail"
          type="email"
          variant="outlined"
          required
        />
        <TextField
          className="FormInputs"
          id="pass"
          name="yourPassword"
          label="Ingrese su Password"
          type="password"
          variant="outlined"
          required
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
          <Link onClick={() => selectorCallback("CreateAccountModal")} underline="hover">
            Crear Una
          </Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          ¿Olvidó su contraseña? &nbsp;
          <Link onClick={() => selectorCallback("PasswordResetModal")} underline="hover">
            Recuperarla
          </Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default LoginModal;
