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
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.FAQ)}>
        F.A.Q.
      </Button>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.Help)}>
        Ayuda!
      </Button>
    </Stack>
  );
}

export default ConfigurationButtons;
