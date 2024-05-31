import { TextField, Box, Button, Container, Link, Typography, Alert } from "@mui/material";
import "./Modals.css";
import { ModalNames } from "./ImTheActiveModal.ts";
import { FormEvent, useRef, useState } from "react";
import server from "../../../Services/serverCall.ts";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler.ts";

interface LoginModalSelector {
  selectorCallback: (modalName: ModalNames) => void;
}

function PasswordResetModal({ selectorCallback }: LoginModalSelector) {
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const formRef = useRef<HTMLFormElement>();
  const defaultAlertMessage: string = "Hubo un problema...";
  const notFountUSer: string = "Usuario no registrado, por favor: cree uno nuevo";
  const confirmationMessage: string = "Contraseña recuperada: verifique su eMail";
  const requestSent: string = "Consultando los datos de su cuenta";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef?.current);
    const submittedEmail: string = formData?.get("yourEmail") as string;
    alertMessagesHandler(setAlertToShow, requestSent, alertTypes.info);
    await server
      .post<boolean>("/recuperar", { userName: submittedEmail })
      .then((res) => {
        if (res.data) {
          alertMessagesHandler(setAlertToShow, confirmationMessage, alertTypes.success, 3000);
        } else {
          alertMessagesHandler(setAlertToShow, notFountUSer, alertTypes.info, 3000);
        }
        setTimeout(() => selectorCallback(ModalNames.Login), 3000);
      })
      .catch((err) => {
        alertMessagesHandler(setAlertToShow, err.error || defaultAlertMessage, alertTypes.error);
      });
  };

  return (
    <Container className="ExternalLoginContainer">
      <Box className="FormBox" component="form" ref={formRef} onSubmit={handleSubmit}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          ¿Olvidó su contraseña?
        </Typography>
        <Typography className="Subtitle" variant="subtitle1" textAlign="center" gutterBottom>
          Ingrese su email. Le será enviado un correo con una nueva contraseña provisoria, deberá cambiar al ingresar.
        </Typography>
        <Container className="AlertsContainer">
          {alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}
        </Container>
        <TextField
          className="FormInputs"
          id="outlined-search"
          name="yourEmail"
          label="Ingrese su e-mail"
          type="email"
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
      <Container className="Logo"></Container>
        <Typography variant="caption" display="block" gutterBottom>
          ¿Ya posee una cuenta? &nbsp;
          <Link onClick={() => selectorCallback(ModalNames.Login)} underline="hover" style={{ cursor: "pointer" }}>
            Ingresar
          </Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          ¿No tiene cuenta? &nbsp;
          <Link onClick={() => selectorCallback(ModalNames.Create)} underline="hover" style={{ cursor: "pointer" }}>
            Crear Una
          </Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default PasswordResetModal;
