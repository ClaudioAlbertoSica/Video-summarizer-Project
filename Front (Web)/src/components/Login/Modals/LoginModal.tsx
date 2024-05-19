import { TextField, Box, Button, Container, Typography, Link, Alert, PaletteMode } from "@mui/material";
import "./Modals.css";
import { ModalNames } from "./ImTheActiveModal.ts";
import server from "../../../Services/serverCall.ts";
import { FormEvent, useRef, useState } from "react";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler.ts";
import { DBuser, LoggedUser } from "../../../Services/Types/UserTypes.ts";

// Link as RouterLink,
interface LoginModalInterface {
  selectorCallback: (modalName: ModalNames) => void;
  setNewLoggedUser: (user: LoggedUser) => void;
}

function LoginModal({ selectorCallback, setNewLoggedUser }: LoginModalInterface) {
  const formRef = useRef<HTMLFormElement>();
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const confirmationMessage: string = "Ingreso Correcto";
  const defaultAlertMessage: string = "Acceso denegado: por favor revise su usario y contraseña";

  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef?.current);
    const submittedEmail = formData?.get("yourEmail");
    const submittedPassword = formData?.get("yourPassword");
    await server
      .post<DBuser>("/login", { userName: submittedEmail, passwd: submittedPassword })
      .then((res) => {
        alertMessagesHandler(setAlertToShow, confirmationMessage, alertTypes.success, 500);
        const adjustedUser: LoggedUser = newUserTypesCorrections(res.data);
        setTimeout(() => setNewLoggedUser(adjustedUser), 500);
      })
      .catch((err) => {
        alertMessagesHandler(setAlertToShow, err.error || defaultAlertMessage, alertTypes.error);
      });
  };

  const newUserTypesCorrections = (newUSer: DBuser) => {
    /*Some types need to be adjusted, because they differ in the fron-web, from the server. 
    isDark is a boolean in the server, while it is a PaletteMode-string like in the front-web*/
    const adjustedUser: LoggedUser = newUSer.config.isDark
      ? { ...newUSer, config: { isDark: "dark" as PaletteMode } }
      : { ...newUSer, config: { isDark: "light" as PaletteMode } };

    return adjustedUser;
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
        <Container className="AlertsContainer">
          {alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}
        </Container>
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
          <Link onClick={() => selectorCallback(ModalNames.Create)} underline="hover">
            Crear Una
          </Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          ¿Olvidó su contraseña? &nbsp;
          <Link onClick={() => selectorCallback(ModalNames.Password)} underline="hover">
            Recuperarla
          </Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default LoginModal;
