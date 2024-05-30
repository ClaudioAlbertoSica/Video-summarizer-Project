import { Box, Container, Paper, Stack, Typography, useTheme } from "@mui/material";
import "./View.css";
import { useContext } from "react";
import { LoggedUserContext } from "../../../ActiveUserContext";

function AccountData() {
  const currentlyLoggedUsuer = useContext(LoggedUserContext).userState;
  const myTheme = useTheme();
  return (
    <>
      <Paper className="ViewWrapper" elevation={5}>
        <Container className="FormFlexPostal">
          <Box className="FormBoxView" sx={{height: '490px'}}>
            <Stack direction={"column"}>
              <Typography className="ViewTitle" variant="h3">
                Datos de la cuenta
              </Typography>
              <Typography className="ViewInfo">
                <b>ID:</b> {currentlyLoggedUsuer.id}
              </Typography>
              <Typography className="ViewInfo">
                <b>Nombre de Usuario:</b> {currentlyLoggedUsuer.userName}
              </Typography>
            </Stack>
          </Box>
          <Container className="RightContent AccountDataImage" sx={{backgroundImage: `url(${myTheme.palette.image.me})`}}></Container>
        </Container>
      </Paper>
    </>
  );
}

export default AccountData;
