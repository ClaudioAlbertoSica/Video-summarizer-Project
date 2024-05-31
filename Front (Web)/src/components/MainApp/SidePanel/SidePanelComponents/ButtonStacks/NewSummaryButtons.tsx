import { Button, Stack } from "@mui/material";
import { ButtonViewContext } from "../../../ButtonViewContext";
import { ValidViewNames } from "../../../Views/ImTheActiveView";
import { useContext } from "react";
import "./ButtonStacks.css";

function NewSummaryButtons() {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  return (
    <Stack direction={"column"}>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.VideoForm)}>
        Resumen de un video...
      </Button>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.TextForm)}>
        Resumen de un Texto...
      </Button>
    </Stack>
  );
}

export default NewSummaryButtons;
