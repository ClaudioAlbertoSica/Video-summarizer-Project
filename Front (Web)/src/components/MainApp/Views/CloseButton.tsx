import { Button, Container } from "@mui/material";
import { ValidViewNames } from "./ImTheActiveView";

interface CloseInterface {
  closeFunction: (argument: ValidViewNames) => void;
}

function CloseButton({ closeFunction }: CloseInterface) {
  return (
    <Container className="CloseButtonContainer">
      <Button className="CloseButton" variant="outlined" color="error" onClick={() => closeFunction(ValidViewNames.noneSelected)}>
        Cerrar
      </Button>
    </Container>
  );
}

export default CloseButton;
