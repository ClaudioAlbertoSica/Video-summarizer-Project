import { TextField, Box, Button, Container, Link, Typography, Alert } from "@mui/material";
import "./Modals.css";
import { ModalNames } from "./ImTheActiveModal.ts";
import { FormEvent, useContext, useRef, useState } from "react";
import server from "../../../Services/serverCall.ts";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";
import { alertMessagesHandler, AlertMessage, alertTypes } from "../../../Services/alertMessagesHandler.ts";

interface LoginModalSelector {
  selectorCallback: (modalName: ModalNames) => void;
}

function CreateAccountModal({ selectorCallback }: LoginModalSelector) {
  const userContext = useContext(LoggedUserContext);
  const formRef = useRef<HTMLFormElement>();
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });

  /* const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showDifferentPasswordslAlert, setShowDifferentPasswordsAlert] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);*/
  const AlertMessagePasswordsAreDifferent: string = "Las contraseñas provistas no son coincidentes";
  const ConfirmationMessage: string = "El usuario fué creado satisfactoriamente";
  const defaultAlertMessage: string = "Hubo un problema...";

  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef?.current);
    const submittedEmail = formData?.get("yourEmail");
    const submittedPassword1 = formData?.get("yourPassword");
    const submittedPassword2 = formData?.get("yourRepeatedPassword");

    if (submittedPassword1 === submittedPassword2) {
      handleServerQuerry(submittedEmail as string, submittedPassword1 as string);
    } else {
      alertMessagesHandler(setAlertToShow, AlertMessagePasswordsAreDifferent, alertTypes.warning);
    }
  };

  const handleServerQuerry = async (emailToBeSent: string, passwordToBeSent: string) => {
    await server
      .post("/", { userName: emailToBeSent, passwd: passwordToBeSent })
      .then((res) => {
        alertMessagesHandler(setAlertToShow, ConfirmationMessage, alertTypes.success);
        setTimeout(() => userContext.userSteState(res.data), 1500);
      })
      .catch((error) => {
        console.log;
        alertMessagesHandler(setAlertToShow, error.error || defaultAlertMessage, alertTypes.success);
      });
  };

  return (
    <Container className="ExternalLoginContainer">
      <Box className="FormBox" component="form" ref={formRef} onSubmit={handleSumbit}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Crear Cuenta
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Ingrese su email, su contraseña, vuelva a ingresar esta última para verificarla, y luego haga click en "Crear".
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
          id="pass1"
          name="yourPassword"
          label="Ingrese su Password"
          type="password"
          variant="outlined"
          required
        />
        <TextField
          className="FormInputs"
          id="pass2"
          name="yourRepeatedPassword"
          label="Ingrese nuevamente su Password"
          type="password"
          variant="outlined"
          required
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
          <Link onClick={() => selectorCallback(ModalNames.Login)} underline="hover">
            Ingresar
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

export default CreateAccountModal;
