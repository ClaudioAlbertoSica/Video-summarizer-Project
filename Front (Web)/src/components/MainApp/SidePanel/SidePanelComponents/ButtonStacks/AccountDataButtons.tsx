import { Button, Stack } from "@mui/material";
import { ButtonViewContext } from "../../../MainLayout";
import { ValidViewNames } from "../../../Views/ImTheActiveView";
import { useContext } from "react";

function AccountDataButtons() {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  return (
    <Stack direction={"column"}>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.AccountData)}>
        Datos de la cuenta
      </Button>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.ChangePassword)}>
        Cambiar Contraseña
      </Button>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.LogOut)}>
        Log Out
      </Button>
    </Stack>
  );
}

export default AccountDataButtons;
