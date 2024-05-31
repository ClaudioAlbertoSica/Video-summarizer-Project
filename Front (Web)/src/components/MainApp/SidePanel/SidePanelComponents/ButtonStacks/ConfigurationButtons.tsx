import { Button, Stack, useTheme } from "@mui/material";
import { ButtonViewContext } from "../../../ButtonViewContext";
import { ValidViewNames } from "../../../Views/ImTheActiveView";
import { useContext } from "react";
import DarkModeSwitch from "./DarkModeSwitch";

function ConfigurationButtons() {
  const myTheme = useTheme();
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  return (
    <Stack direction={"column"}>
      <DarkModeSwitch />
      <Button className= "ButtonList" size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.FAQ)} sx={{ margin: '2px' ,backgroundColor: myTheme.palette.my.listBackground, color: myTheme.palette.my.listColor}}>
        F.A.Q.
      </Button>
      <Button className= "ButtonList" size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.Help)} sx={{ margin: '2px', backgroundColor: myTheme.palette.my.listBackground, color: myTheme.palette.my.listColor}}>
        Ayuda!
      </Button>
      <Button className= "ButtonList" size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.Comments)} sx={{ margin: '2px', backgroundColor: myTheme.palette.my.listBackground, color: myTheme.palette.my.listColor}}>
        Enviar Comentarios o Sugerencias
      </Button>
    </Stack>
  );
}

export default ConfigurationButtons;
