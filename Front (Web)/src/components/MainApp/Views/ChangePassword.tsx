import { TextField, Box, Button, Container, Typography, Alert, Paper } from "@mui/material";
import "./View.css";
import { FormEvent, useContext, useRef, useState } from "react";
import server from "../../../Services/serverCall.ts";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler.ts";

function ChangePassword() {
  const userContext = useContext(LoggedUserContext);
  const formRef = useRef<HTMLFormElement>();
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const AlertMessagePasswordsAreDifferent: string = "Las contraseñas provistas no son coincidentes";
  const ConfirmationMessage: string = "La contraseña fue modificada satisfactoriamente";
  const defaultAlertMessage: string = "Hubo un problema...";

  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef?.current);
    const submittedPassword1 = formData?.get("yourPassword");
    const submittedPassword2 = formData?.get("yourRepeatedPassword");

    if (submittedPassword1 === submittedPassword2) {
      handleServerQuerry(submittedPassword1 as string, submittedPassword2 as string);
    } else {
      alertMessagesHandler(setAlertToShow, AlertMessagePasswordsAreDifferent, alertTypes.warning);
    }
  };

  const handleServerQuerry = async (passwordToBeSent1: string, passwordToBeSent2: string) => {
    await server
      .post(`/cambiarpass/${userContext.userState.id}`, {
        passActual: userContext.userState.passwd,
        passNueva: passwordToBeSent1,
        passNuevaBis: passwordToBeSent2,
      })
      .then((res) => {
        userContext.userSteState(res.data);
        alertMessagesHandler(setAlertToShow, ConfirmationMessage, alertTypes.success);
      })
      .catch((err) => {
        alertMessagesHandler(setAlertToShow, err.error || defaultAlertMessage, alertTypes.error);
      });
  };

  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Box className="FormBox" component="form" ref={formRef} onSubmit={handleSumbit}>
        <Typography className="ViewTitle" variant="h4">
          Cambiar Contraseña
        </Typography>
        <Typography className="ViewInfo" variant="h6">
          Ingrese su contraseña actual. <br /> Luego ingrese la nueva, y vuelva a ingresar esta última para verificarla. <br />
          Finalmente, haga click en "Modificar".
        </Typography>
        <Container className="AlertsContainerViews">
          {alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}
        </Container>
        <Container className="InputsContainer">
          <TextField
            size="small"
            className="FormInputsViews"
            id="mail"
            name="currentPassword"
            label="Ingrese su Password actual"
            type="password"
            variant="outlined"
            required
          />
          <TextField
            size="small"
            className="FormInputsViews"
            id="pass1"
            name="yourPassword"
            label="Ingrese su nueva Password"
            type="password"
            variant="outlined"
            required
          />
          <TextField
            size="small"
            className="FormInputsViews"
            id="pass2"
            name="yourRepeatedPassword"
            label="Ingrese nuevamente su nueva Password"
            type="password"
            variant="outlined"
            required
          />
          <Button variant="contained" type="submit">
            Modificar
          </Button>
        </Container>
      </Box>
    </Paper>
  );
}

export default ChangePassword;
