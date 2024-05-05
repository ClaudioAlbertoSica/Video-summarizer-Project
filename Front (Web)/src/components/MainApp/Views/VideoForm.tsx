import { TextField, Box, Button, Container, Typography, Alert, Paper, FormControlLabel, Switch } from "@mui/material";
import "./View.css";
import { FormEvent, useContext, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { ValidViewNames } from "./ImTheActiveView";
import { ButtonViewContext } from "../ButtonViewContext";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler";
//import server from "../../Services/serverCall.ts";

function VideoForm() {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  const formRef = useRef<HTMLFormElement>();
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
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
      alertMessagesHandler(setAlertToShow, ConfirmationMessage, alertTypes.success);
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
        <Typography className="ViewTitle" variant="h4" sx={{ margin: "0px", marginBottom: "0px" }}>
          Generá tu resumen (Video)
        </Typography>
        <Container className="AlertsContainerViews">
          {alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}
        </Container>
        <Container className="InputsContainer">
          <TextField
            size="small"
            className="FormInputsViews"
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
          <TextField
            size="small"
            className="FormInputsViews"
            id="optionalTitle"
            name="optionalTitle"
            label="Ingrese un título (opcional)"
            type="text"
            variant="outlined"
          />
          <Container className="FormButtonsContainer">
            <Button
              className="GenerateSummaryButton"
              variant="contained"
              type="submit"
              onClick={() => setSelectedCentralPanelView(ValidViewNames.Loading)}
            >
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
