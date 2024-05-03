import { TextField, Box, Button, Container, Typography, Alert, Paper } from "@mui/material";
import "./View.css";
import { FormEvent, useRef, useState } from "react";
//import server from "../../Services/serverCall.ts";

function ChangePassword() {
  const formRef = useRef<HTMLFormElement>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showDifferentPasswordslAlert, setShowDifferentPasswordsAlert] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const AlertMessagePasswordsAreDifferent: string = "Las contraseñas provistas no son coincidentes";
  const ConfirmationMessage: string = "La contraseña fue modificada satisfactoriamente";
  const alertMessage: string = "Hubo un problema...";

  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef?.current);
    const submittedPassword1 = formData?.get("yourPassword");
    const submittedPassword2 = formData?.get("yourRepeatedPassword");

    if (submittedPassword1 === submittedPassword2) {
      handleServerQuerry(submittedPassword1 as string);
    } else {
      setShowDifferentPasswordsAlert(true);
    }
  };

  const handleServerQuerry = async (passwordToBeSent: string) => {
    /* await server
      .post("/", { userName: emailToBeSent, passwd: passwordToBeSent })
      .then(() => {
        setTimeout(() => selectorCallback("LoginModal"), 1000);
        setShowConfirmation(true);
      })
      .catch(() => {
        setShowAlert(true);
      });
      */
    console.log("submitted! " + passwordToBeSent);
  };

  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Box className="FormBox" component="form" ref={formRef} onSubmit={handleSumbit}>
        <Typography className="ViewTitle" variant="h3">
          Crear Cuenta
        </Typography>
        <Typography className="ViewInfo" variant="h4">
          Ingrese su contraseña actual. <br /> Luego ingrese la nueva, y vuelva a ingresar esta última para verificarla. <br />
          Finalmente, haga click en "Modificar".
        </Typography>
        <Container className="AlertsContainer">
          {showAlert && <Alert severity="warning"> {alertMessage} </Alert>}
          {showDifferentPasswordslAlert && <Alert severity="warning"> {AlertMessagePasswordsAreDifferent} </Alert>}
          {showConfirmation && <Alert severity="success"> {ConfirmationMessage} </Alert>}
        </Container>
        <Container className="InputsContainer">
          <TextField
            className="FormInputs"
            id="mail"
            name="currentPassword"
            label="Ingrese su Password actual"
            type="password"
            variant="outlined"
            required
          />
          <TextField
            className="FormInputs"
            id="pass1"
            name="yourPassword"
            label="Ingrese su nueva Password"
            type="password"
            variant="outlined"
            required
          />
          <TextField
            className="FormInputs"
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
