import { TextField, Box, Button, Container, Typography, Alert, Paper, useTheme } from "@mui/material";
import "./View.css";
import { FormEvent, useContext, useRef, useState } from "react";
import server from "../../../Services/serverCall.ts";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler.ts";
import { newUserTypesCorrections } from "../../../Services/updateLoggedUserFromDB.ts";
import { DBuser, LoggedUser } from "../../../Services/Types/UserTypes.ts";
interface Props {
  forcedBehaviourChanger: (arg: boolean) => void;
}

function ChangePassword({ forcedBehaviourChanger }: Props) {
  const userContext = useContext(LoggedUserContext);
  const formRef = useRef<HTMLFormElement>();
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const differentPAsswordMessage: string = "Las contraseñas provistas no son coincidentes";
  const sameOldNewPassword: string = "La contraseña nueva no puede ser igual a la anterior";
  const confirmationMessage: string = "La contraseña fue modificada satisfactoriamente";
  const petitionSentToServer: string = "Solicitud enviada";
  const defaultAlertMessage: string = "Hubo un problema...";
  const myTheme = useTheme();
  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef?.current);
    const submittedCurrentPassword = formData?.get("currentPassword");
    const submittedPassword1 = formData?.get("yourPassword");
    const submittedPassword2 = formData?.get("yourRepeatedPassword");

    if (submittedCurrentPassword === submittedPassword1) {
      alertMessagesHandler(setAlertToShow, sameOldNewPassword, alertTypes.warning, 1800);
    } else if (submittedPassword1 !== submittedPassword2) {
      alertMessagesHandler(setAlertToShow, differentPAsswordMessage, alertTypes.warning, 1800);
    } else {
      handleServerQuerry(submittedCurrentPassword as string, submittedPassword1 as string, submittedPassword2 as string);
      alertMessagesHandler(setAlertToShow, petitionSentToServer, alertTypes.info);
    }
  };

  const handleServerQuerry = async (currentPassword: string, passwordToBeSent1: string, passwordToBeSent2: string) => {
    await server
      .post<DBuser>(`/${userContext.userState.id}/cambiarpass`, {
        passActual: currentPassword,
        passNueva: passwordToBeSent1,
        passNuevaBis: passwordToBeSent2,
      }, {headers: {'passwd': userContext.userState.passwd}})
      .then((res) => {
        const newUser: LoggedUser = newUserTypesCorrections(res.data);
        newUser.passwd = currentPassword;
        userContext.userSteState(newUser);
        alertMessagesHandler(setAlertToShow, confirmationMessage, alertTypes.success, 800);
        setTimeout(() => forcedBehaviourChanger(false), 800);
      })
      .catch((err) => {
        alertMessagesHandler(setAlertToShow, err.error || defaultAlertMessage, alertTypes.error);
      });
  };

  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Container className="FormFlexPostal">
        <Box className="FormBox" component="form" ref={formRef} onSubmit={handleSumbit}>
          <Typography className="ViewTitle" variant="h4">
            Cambiar Contraseña
          </Typography>
          <Typography className="ViewInfo" variant="h6">
            1) Ingrese su contraseña actual. <br />
            2) Luego ingrese la nueva, y vuelva a ingresar esta última para verificarla. <br />
            3) Finalmente, haga click en "Modificar".
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
            <Button variant="contained" type="submit" sx={{ backgroundColor: myTheme.palette.my.list}}>
              Modificar
            </Button>
          </Container>
        </Box>
        <Container className="RightContent FormChangePassImagen"></Container>
      </Container>
    </Paper>
  );
}

export default ChangePassword;
