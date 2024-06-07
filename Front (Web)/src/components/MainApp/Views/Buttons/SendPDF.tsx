import { Alert, Button, Container } from "@mui/material";
import { useContext, useState } from "react";
import { LoggedUserContext } from "../../../../ActiveUserContext";
import { SelectedSummaryContext } from "../../SelectedSummaryContext";
import server from "../../../../../src/Services/serverCall.ts";
import { Summary } from "../../../../Services/Types/UserTypes.ts";
import SendIcon from "@mui/icons-material/Send";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../../Services/alertMessagesHandler.ts";

export function SendPDF() {
  const loggedUser = useContext(LoggedUserContext);
  const summaryContext = useContext(SelectedSummaryContext);
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const requestSentToServer: string = "Solicitud Enviada";
  const confirmationMessage: string = "Documento Enviado Correctamente";
  const defaultAlertMessage: string = "Acceso denegado: por favor revise su usario y contraseña";

  const handleClick = async () => {
    alertMessagesHandler(setAlertToShow, requestSentToServer, alertTypes.info);
    await server
      .post<Summary>(`/${loggedUser.userState.id}/enviar/${summaryContext.State.idres}`)
      .then(() => {
        alertMessagesHandler(setAlertToShow, confirmationMessage, alertTypes.success);
      })
      .catch((err) => {
        alertMessagesHandler(setAlertToShow, err?.error || defaultAlertMessage, alertTypes.error);
      });
  };

  return (
    <Button
      className="SendButton"
      variant="contained"
      color="info"
      endIcon={<SendIcon />}
      onClick={() => {
        handleClick();
      }}
    >
      Enviar
    </Button>
  );
}
