import { Button, Container } from "@mui/material";
import { ValidViewNames } from "../ImTheActiveView";
import ButtonsForPDFViewer from "./ButtonsForPDFViewer";

interface CloseInterface {
  closeFunction: (argument: ValidViewNames) => void;
  additionalButtonsInformation: ValidViewNames;
}

function CloseButton({ closeFunction, additionalButtonsInformation }: CloseInterface) {
  return (
    <Container className="CloseButtonContainer">
      <Button
        className="CloseButton"
        variant="contained"
        color="secondary"
        onClick={() => closeFunction(ValidViewNames.noneSelected)}
      >
        Cerrar
      </Button>
      {additionalButtonsInformation === ValidViewNames.Summary && (
        <>
          <ButtonsForPDFViewer />
        </>
      )}
    </Container>
  );
}

export default CloseButton;
