import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useContext } from "react";
import { LoggedUserContext } from "../../../../ActiveUserContext";
import { SelectedSummaryContext, defaultSummary } from "../../SelectedSummaryContext";
import server from "../../../../../src/Services/serverCall.ts";
import { LoggedUser, Summary } from "../../../../Services/Types/UserTypes.ts";
import { ButtonViewContext } from "../../ButtonViewContext.ts";
import { ValidViewNames } from "../ImTheActiveView.ts";

function DeletePDFbtn() {
  const loggedUser = useContext(LoggedUserContext);
  const summaryContext = useContext(SelectedSummaryContext);
  const setSelectedCentralPanelView = useContext(ButtonViewContext);

  const handleClick = async () => {
    const idresSelected = summaryContext.State.idres;
    const selectedResDBindex = loggedUser.userState.inventario.findIndex((sum) => sum.idres === idresSelected);

    await server
      .delete<Summary>(`/${loggedUser.userState.id}/resumen/${summaryContext.State.idres}`)
      .then(() => {
        const newUserContext: LoggedUser = { ...loggedUser.userState };
        newUserContext.inventario.splice(selectedResDBindex, 1);
        loggedUser.userSteState(newUserContext);
        summaryContext.SetState(defaultSummary);
        setSelectedCentralPanelView(ValidViewNames.noneSelected);
      })
      .catch((err) => {
        console.log(err.error);
        console.log("Error on update");
      });
  };

  return (
    <Button
      className="DeleteButton"
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={() => {
        handleClick();
      }}
    >
      Borrar
    </Button>
  );
}

export default DeletePDFbtn;
