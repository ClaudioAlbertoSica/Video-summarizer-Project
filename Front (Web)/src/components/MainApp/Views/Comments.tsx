import { TextField, Box, Button, Container, Typography, Alert, Paper, useTheme } from "@mui/material";
import "./View.css";
import { FormEvent, useContext, useRef, useState } from "react";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler";
import { LoggedUserContext } from "../../../ActiveUserContext";
import serverCall from "../../../Services/serverCall";

function Comments() {
  const activeUSer = useContext(LoggedUserContext);
  const formRef = useRef<HTMLFormElement>();
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const ConfirmationMessage: string = "Comentario enviado con éxito";
  const SendingPetitionToServer: string = "Esperando respuesta del servidor...";
  const ServerErrorMessage: string = "Hubo un problema con el envío";
  const myTheme = useTheme();
  //const handleFormClear = () => formRef.current?.reset();

  /*
    1) Descomentar el HandleSubmit
    2) Corregir la URL del server.post()
    3) odficar los botones del form
    4) Testear
    */

  const handleSumbit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const text: string = formData.get("TextToBeSent") as string;
    const title: string = formData?.get("optionalTitle") as string;
    alertMessagesHandler(setAlertToShow, SendingPetitionToServer, alertTypes.info);
    handleServerQuerry(text, title);
  };

  const handleServerQuerry = async (sugerencia: string, title: string) => {
    await serverCall
      .post(`/${activeUSer.userState.id}/sugerencia`, { sugerencia, title })
      .then(() => {
        setAlertToShow({ message: "don't show", type: alertTypes.info });
      })
      .then(() => {
        alertMessagesHandler(setAlertToShow, ConfirmationMessage, alertTypes.success, 500);
      })
      .catch((err) => {
        alertMessagesHandler(setAlertToShow, err?.error || ServerErrorMessage, alertTypes.error, 2000);
      });
  };

  const handleFormClear = () => {
    formRef.current?.reset();
    setAlertToShow({ message: "don't show", type: alertTypes.info });
  };

  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Container className="FormFlexPostal">
        <Box className="FormBoxView" component="form" ref={formRef} onSubmit={(event) => handleSumbit(event)}>
          <Typography className="ViewTitle" variant="h4" sx={{ margin: "0px", marginBottom: "0px" }}>
            Tus comentarios
          </Typography>
          <Container className="AlertsContainerViews">
            {alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}
          </Container>
          <Container className="InputsContainer">
            <TextField
              size="small"
              className="FormInputsViews"
              id="optionalTitle"
              name="optionalTitle"
              label="Ingrese un título (opcional)"
              type="text"
              variant="outlined"
            />
            <TextField
              className="MultiLineInput"
              id="outlined-multiline-static"
              name="TextToBeSent"
              label="Escribe tu comentario aquí..."
              multiline
              rows={4}
              required
            />
            <Container className="FormButtonsContainer">
              <Button
                className="GenerateSummaryButton"
                variant="contained"
                type="submit"
                sx={{ backgroundColor: myTheme.palette.my.list }}
              >
                Generar
              </Button>
              <Button className="ClearSummaryButton" variant="text" color="error" type="reset" onClick={handleFormClear}>
                Borrar
              </Button>
            </Container>
          </Container>
        </Box>
        <Container
          className="RightContent CommentsImage"
          sx={{ backgroundImage: `url(${myTheme.palette.image.report})` }}
        ></Container>
      </Container>
    </Paper>
  );
}

export default Comments;
