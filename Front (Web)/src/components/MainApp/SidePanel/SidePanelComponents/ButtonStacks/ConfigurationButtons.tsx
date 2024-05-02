import { Button, Stack } from "@mui/material";
import { ButtonViewContext } from "../../../MainLayout";
import { ValidViewNames } from "../../../Views/ImTheActiveView";
import { useContext } from "react";

function ConfigurationButtons() {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  return (
    <Stack direction={"column"}>
      <Button size="small">Dark Mode</Button>
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
