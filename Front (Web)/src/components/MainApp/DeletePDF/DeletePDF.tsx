import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactElement, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Button, Container, IconButton } from "@mui/material";
import { useContext } from "react";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";
import { SelectedSummaryContext, defaultSummary } from "../SelectedSummaryContext.ts";
import server from "../../../Services/serverCall.ts";
import { LoggedUser, Summary } from "../../../Services/Types/UserTypes.ts";
import { ButtonViewContext } from "../ButtonViewContext.ts";
import { ValidViewNames } from "../Views/ImTheActiveView.ts";
import { AlertMessage, alertMessagesHandler, alertTypes } from "../../../Services/alertMessagesHandler.ts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface DeleteButtonType {
  buttonType: "icon" | "button";
}

export default function DeletePDF({ buttonType }: DeleteButtonType) {
  const [open, setOpen] = useState(false);
  const loggedUser = useContext(LoggedUserContext);
  const summaryContext = useContext(SelectedSummaryContext);
  const setSelectedCentralPanelView = useContext(ButtonViewContext);
  const [alertToShow, setAlertToShow] = useState<AlertMessage>({ message: "don't show", type: alertTypes.info });
  const serverRequestedMessage: string = "Solicitud enviada al servidor";
  const confirmationMessage: string = "Documento borrado";
  const defaultAlertMessage: string = "Problema en el servidor";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReject = () => {
    setOpen(false);
  };

  const handleAccept = async () => {
    await serverRequest();
    setTimeout(() => {
      setOpen(false);
      setSelectedCentralPanelView(ValidViewNames.noneSelected);
    }, 800);
  };

  const serverRequest = async () => {
    const idresSelected = summaryContext.State.idres;
    const selectedResDBindex = loggedUser.userState.inventario.findIndex((sum) => sum.idres === idresSelected);
    alertMessagesHandler(setAlertToShow, serverRequestedMessage, alertTypes.info);
    await server
      .delete<Summary>(`/${loggedUser.userState.id}/resumen/${summaryContext.State.idres}`)
      .then(() => {
        const newUserContext: LoggedUser = { ...loggedUser.userState };
        newUserContext.inventario.splice(selectedResDBindex, 1);
        loggedUser.userSteState(newUserContext);
        summaryContext.SetState(defaultSummary);
        alertMessagesHandler(setAlertToShow, confirmationMessage, alertTypes.success);
      })
      .catch((err) => {
        console.log(err.error);
        console.log("Error on update");
        alertMessagesHandler(setAlertToShow, err?.error || defaultAlertMessage, alertTypes.error);
      });
  };

  const resolveButtonType = () => {
    let buttonToReturn: ReactElement;

    switch (buttonType) {
      case "icon": {
        buttonToReturn = (
          <IconButton
            onClick={() => {
              handleClickOpen();
            }}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        );
        break;
      }
      case "button": {
        buttonToReturn = (
          <Button
            className="DeleteButton"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              handleClickOpen();
            }}
          >
            Borrar
          </Button>
        );
      }
    }
    return buttonToReturn;
  };

  return (
    <>
      {resolveButtonType()}
      <Dialog className="DeleteDialogBox" open={open} onClose={handleReject}>
        <DialogTitle className="DeleteDialogueTitle">¿Está seguro de borrar este resumen?</DialogTitle>
        <DialogContent>
          <DialogContentText className="DeleteDialogText">
            La deleción de un documento es PERMANENTE. Si llegó a esta ventana por error, haga click en Cancelar.
            <br />
            Si realmente desea borrar el documento: haga click en Aceptar.
          </DialogContentText>
        </DialogContent>
        <Container className="AlertsContainer">
          {alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}
        </Container>
        <DialogActions>
          <Button variant="contained" onClick={handleReject}>
            Cancelar
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
