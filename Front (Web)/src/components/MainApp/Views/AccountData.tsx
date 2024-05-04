import { Paper, Stack, Typography } from "@mui/material";
import "./View.css";
import { useContext } from "react";
import { LoggedUserContext } from "../../../ActiveUserContext";

function AccountData() {
  const currentlyLoggedUsuer = useContext(LoggedUserContext).userState;
  return (
    <>
      <Paper className="ViewWrapper" elevation={5}>
        <Stack direction={"column"}>
          <Typography className="ViewTitle" variant="h3">
            Datos de la cuenta
          </Typography>
          <Typography className="ViewInfo" variant="h4">
            <b>ID:</b> {currentlyLoggedUsuer.id}
          </Typography>
          <Typography className="ViewInfo" variant="h4">
            <b>Nombre de Usuario:</b> {currentlyLoggedUsuer.userName}
          </Typography>
        </Stack>
      </Paper>
    </>
  );
}

export default AccountData;
