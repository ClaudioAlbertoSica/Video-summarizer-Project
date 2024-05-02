import { Stack, Typography } from "@mui/material";
import "./View.css";

interface AccountData {
  userID: string;
  userName: string;
}

function AccountData({ userID, userName }: AccountData) {
  return (
    <>
      <Stack direction={"column"}>
        <Typography className="ViewTitle" variant="h3">
          Datos de la cuenta
        </Typography>
        <Typography className="ViewInfo" variant="h4">
          <b>ID:</b> {userID}
        </Typography>
        <Typography className="ViewInfo" variant="h4">
          <b>Nombre de Usuario:</b> {userName}{" "}
        </Typography>
      </Stack>
    </>
  );
}

export default AccountData;
