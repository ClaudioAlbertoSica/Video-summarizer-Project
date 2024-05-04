import { TextField, Box, Button, Container, Typography, Alert, Paper, FormControlLabel, Switch } from "@mui/material";
import "./View.css";
import { FormEvent, useRef, useState } from "react";
import Dropdown from "./Dropdown";
//import server from "../../Services/serverCall.ts";

function VideoForm() {
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
          Generá tu resumen (Video)
        </Typography>
        <Container className="AlertsContainer">
          {showAlert && <Alert severity="warning"> {alertMessage} </Alert>}
          {showDifferentPasswordslAlert && <Alert severity="warning"> {AlertMessagePasswordsAreDifferent} </Alert>}
          {showConfirmation && <Alert severity="success"> {ConfirmationMessage} </Alert>}
        </Container>
        <Container className="InputsContainer">
          <TextField
            className="FormInputs"
            id="AddLink"
            name="AddLink"
            label="URL Youtube Link"
            type="url"
            variant="outlined"
            required
          />
          <Container className="SwitchsContainer">
            <FormControlLabel
              className="FormSwitchInputs"
              name="CompactSummarySwitch"
              control={<Switch />}
              label="Resumen Compacto"
            />
            <FormControlLabel
              className="FormSwitchInputs"
              name="TranscriptionSwitch"
              control={<Switch />}
              label="Obtener Transcripción"
            />
            <FormControlLabel className="FormSwitchInputs" name="ImagesSwitch" control={<Switch />} label="Obtener Imágenes" />
          </Container>
          <Dropdown
            required={true}
            id="language"
            name="language"
            placeHolderItem="Sleccione un idioma..."
            label="Idioma del Resumen"
          >
            {["Español", "Inglés"]}
          </Dropdown>
          <Dropdown
            required={true}
            id="format"
            name="format"
            placeHolderItem="seleccione un formato.."
            label="Formato del Resumen"
          >
            {[".PDF", ".DOCx"]}
          </Dropdown>
          <TextField
            className="FormInputs"
            id="optionalTitle"
            name="optionalTitle"
            label="Ingrese un título (opcional)"
            type="text"
            variant="outlined"
          />
          <Container className="FormButtonsContainer">
            <Button className="GenerateSummaryButton" variant="contained" type="submit">
              Generar
            </Button>
            <Button className="ClearSummaryButton" variant="text" color="error" type="reset">
              Borrar
            </Button>
          </Container>
        </Container>
      </Box>
    </Paper>
  );
}

export default VideoForm;
