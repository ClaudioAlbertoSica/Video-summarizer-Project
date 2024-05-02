import { Button, Stack } from "@mui/material";

function ConfigurationButtons() {
  return (
    <Stack direction={"column"}>
      <Button size="small">Dark Mode</Button>
      <Button size="small">F.A.Q.</Button>
      <Button size="small">Ayuda!</Button>
    </Stack>
  );
}

export default ConfigurationButtons;
