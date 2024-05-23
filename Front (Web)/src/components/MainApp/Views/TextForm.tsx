import { TextField, Box, Button, Container, Typography, Alert, Paper, FormControlLabel, Switch } from "@mui/material";
import "./View.css";
import { FormEvent, ReactElement, useContext, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler";
import { LoggedUserContext } from "../../../ActiveUserContext";
import serverCall from "../../../Services/serverCall";
import LoadingScreen from "./LoadingScreen";

function TextForm() {
  const activeUSer = useContext(LoggedUserContext);
  const formRef = useRef<HTMLFormElement>();
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const ConfirmationMessage: string = "Solicitud enviada con éxito";
  const SendingPetitionToServer: string = "Esperando respuesta del servidor...";
  const ServerErrorMessage: string = "Hubo un problema con el envío";

  useEffect(() => {
    // setIsShowingFrom(!activeUSer.userState.inProgress);
  }, [activeUSer.userState.inProgress]);

  const handleFormClear = () => formRef.current?.reset();

  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const text: string = formData.get("TextToBeSent") as string;
    const isCompact: boolean = formData.get("CompactSummarySwitch") === "on";
    const language: string = formData.get("language") as string;
    const title: string = formData?.get("optionalTitle") as string;
    alertMessagesHandler(setAlertToShow, SendingPetitionToServer, alertTypes.info);
    handleServerQuerry(text, title, isCompact, language);
  };

  const handleServerQuerry = async (texto: string, title: string, esBreve: boolean, idioma: string) => {
    await serverCall
      .post(`/${activeUSer.userState.id}/resumen/texto`, { texto, esBreve, idioma, title })
      .then(() => {
        setAlertToShow({ message: "don't show", type: alertTypes.info });
      })
      .then(() => {
        alertMessagesHandler(setAlertToShow, ConfirmationMessage, alertTypes.success, 500);
        setTimeout(() => activeUSer.userSteState({ ...activeUSer.userState, inProgress: true }), 500);
      })
      .catch((err) => {
        alertMessagesHandler(setAlertToShow, err.error || ServerErrorMessage, alertTypes.error, 2000);
      });
  };

  const evaluateReturn = (bol: boolean) => {
    let elementtoReturn: ReactElement = <LoadingScreen />;

    if (bol) {
      elementtoReturn = (
        <Paper className="ViewWrapper" elevation={5}>
          <Box className="FormBox" component="form" ref={formRef} onSubmit={handleSumbit}>
            <Typography className="ViewTitle" variant="h4" sx={{ margin: "0px", marginBottom: "0px" }}>
              Generá tu resumen (Texto)
            </Typography>
            <Container className="AlertsContainerViews">
              {alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}
            </Container>
            <Container className="InputsContainer">
              <TextField
                className="MultiLineInput"
                id="outlined-multiline-static"
                name="TextToBeSent"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Copia y pega el texto a resumir aquí..."
              />
              <Container className="SwitchsContainer">
                <FormControlLabel
                  className="FormSwitchInputs"
                  name="CompactSummarySwitch"
                  control={<Switch />}
                  label="Resumen Compacto"
                />
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
                <Button className="GenerateSummaryButton" variant="contained" type="submit" onClick={() => handleSumbit}>
                  Generar
                </Button>
                <Button className="ClearSummaryButton" variant="text" color="error" type="reset" onClick={() => handleFormClear}>
                  Borrar
                </Button>
              </Container>
            </Container>
          </Box>
        </Paper>
      );
    }
    return elementtoReturn;
  };

  return evaluateReturn(!activeUSer.userState.inProgress);
}

export default TextForm;
