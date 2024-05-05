import { TextField, Box, Button, Container, Typography, Alert, Paper, FormControlLabel, Switch } from "@mui/material";
import "./View.css";
import { FormEvent, useContext, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { ButtonViewContext } from "../ButtonViewContext";
import { ValidViewNames } from "./ImTheActiveView";
//import server from "../../Services/serverCall.ts";

function TextForm() {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
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
        <Typography className="ViewTitle" variant="h4" sx={{ margin: "0px", marginBottom: "0px" }}>
          Generá tu resumen (Texto)
        </Typography>
        <Container className="AlertsContainerViews">
          {showAlert && <Alert severity="warning"> {alertMessage} </Alert>}
          {showDifferentPasswordslAlert && <Alert severity="warning"> {AlertMessagePasswordsAreDifferent} </Alert>}
          {showConfirmation && <Alert severity="success"> {ConfirmationMessage} </Alert>}
        </Container>
        <Container className="InputsContainer">
          <TextField
            className="MultiLineInput"
            id="outlined-multiline-static"
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

export default TextForm;
