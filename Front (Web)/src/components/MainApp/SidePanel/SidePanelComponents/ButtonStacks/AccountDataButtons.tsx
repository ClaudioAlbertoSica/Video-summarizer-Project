import { Button, Stack } from "@mui/material";
import { ButtonViewContext } from "../../../ButtonViewContext";
import { ValidViewNames } from "../../../Views/ImTheActiveView";
import { useContext } from "react";
import { LoggedUserContext, placeholderUser } from "../../../../../ActiveUserContext";

function AccountDataButtons() {
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  const LoginContext = useContext(LoggedUserContext);
  return (
    <Stack direction={"column"}>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.AccountData)}>
        Datos de la cuenta
      </Button>
      <Button size="small" onClick={() => setSelectedCentralPanelView(ValidViewNames.ChangePassword)}>
        Cambiar Contraseña
      </Button>
      <Button size="small" onClick={() => LoginContext.userSteState(placeholderUser)}>
        Log Out
      </Button>
    </Stack>
  );
}

export default AccountDataButtons;
