import { Button, Container } from "@mui/material";
import { ValidViewNames } from "./ImTheActiveView";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

interface CloseInterface {
  closeFunction: (argument: ValidViewNames) => void;
  context: ValidViewNames;
}

function CloseButton({ closeFunction, context }: CloseInterface) {
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
      {context === ValidViewNames.Summary && (
        <>
          <Button className="CloseButton" variant="contained" color="info" endIcon={<SendIcon />}>
            Enviar
          </Button>
          <Button className="CloseButton" variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Borrar
          </Button>
        </>
      )}
    </Container>
  );
}

export default CloseButton;
