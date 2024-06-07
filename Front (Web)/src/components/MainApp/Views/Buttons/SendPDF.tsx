import { Button, SvgIconTypeMap } from "@mui/material";
import { useContext, useState } from "react";
import { LoggedUserContext } from "../../../../ActiveUserContext";
import { SelectedSummaryContext } from "../../SelectedSummaryContext";
import server from "../../../../../src/Services/serverCall.ts";
import { Summary } from "../../../../Services/Types/UserTypes.ts";
import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/Info";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import DoneAllIcon from "@mui/icons-material/DoneAll";

type ButtonProps = {
  color: "secondary" | "inherit" | "primary" | "success" | "error" | "info" | "warning";
  message: string;
  icon: OverridableComponent<SvgIconTypeMap>;
};

export function SendPDF() {
  const loggedUser = useContext(LoggedUserContext);
  const summaryContext = useContext(SelectedSummaryContext);
  const stdButtonMessage: string = "Enviar";
  const requestSentToServer: string = "Solicitud Enviada";
  const confirmationMessage: string = "Envio Ok";
  const defaultErrortMessage: string = "Error!";
  const [buttonProperties, setButtonProperties] = useState<ButtonProps>({
    color: "info",
    message: stdButtonMessage,
    icon: SendIcon,
  });

  const handleClick = async () => {
    setButtonProperties({ color: "inherit", message: requestSentToServer, icon: InfoIcon });
    await server
      .post<Summary>(`/${loggedUser.userState.id}/enviar/${summaryContext.State.idres}`)
      .then(() => {
        setButtonProperties({ color: "success", message: confirmationMessage, icon: DoneAllIcon });
      })
      .catch(() => {
        setButtonProperties({ color: "error", message: defaultErrortMessage, icon: SignalWifiStatusbarConnectedNoInternet4Icon });
      })
      .finally(() => {
        setTimeout(() => {
          setButtonProperties({
            color: "info",
            message: stdButtonMessage,
            icon: SendIcon,
          });
        }, 800);
      });
  };

  return (
    <Button
      className="SendButton"
      variant="contained"
      color={buttonProperties.color}
      endIcon={<buttonProperties.icon />}
      onClick={() => {
        handleClick();
      }}
    >
      {buttonProperties.message}
    </Button>
  );
}
