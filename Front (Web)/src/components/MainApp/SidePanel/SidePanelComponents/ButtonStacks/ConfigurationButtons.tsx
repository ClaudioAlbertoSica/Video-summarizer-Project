import { Button, Stack } from "@mui/material";
import { ButtonViewContext } from "../../../ButtonViewContext";
import { ValidViewNames } from "../../../Views/ImTheActiveView";
import { useContext } from "react";
import DarkModeSwitch from "./DarkModeSwitch";

function ConfigurationButtons() {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  return (
    <Stack direction={"column"}>
      <DarkModeSwitch />
      <Button className="ButtonList" size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.FAQ)}>
        F.A.Q.
      </Button>
      {/*}    <Button className="ButtonList" size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.Help)}>
        Ayuda!
      </Button> Deprecated section. Merged with FAQ*/}
      <Button className="ButtonList" size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.Comments)}>
        Enviar Comentarios o Sugerencias
      </Button>
    </Stack>
  );
}

export default ConfigurationButtons;
