import { Button, Stack } from "@mui/material";

function NewSummaryButtons() {
  return (
    <Stack direction={"column"}>
      <Button size="small">Resumen de un video...</Button>
      <Button size="small">Resumen de un Texto...</Button>
    </Stack>
  );
}

export default NewSummaryButtons;
