import { Container, PaletteMode } from "@mui/material";
import Switch from "@mui/material/Switch";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useContext } from "react";
import "../../SidePanel.css";
import { LoggedUserContext } from "../../../../../ActiveUserContext";
import server from "../../../../../Services/serverCall";

function DarkModeSwitch() {
  const activeUser = useContext(LoggedUserContext);
  let themeToSet: PaletteMode = activeUser.userState.config.isDark;

  const handleOnChange = () => {
    themeToSet =
      activeUser.userState.config.isDark !== ("dark" as PaletteMode) ? ("dark" as PaletteMode) : ("light" as PaletteMode);
    activeUser.userSteState({ ...activeUser.userState, config: { isDark: themeToSet } });
    server.put(`/${activeUser.userState.id}`, payloadForServer(themeToSet), {headers: {'passwd': activeUser.userState.passwd}});
  };

  const payloadForServer = (themeToSet: PaletteMode) => {
    //Does a correction similar to the one in the Loggin-Modal: isDark is a boolean for the server, but a PalletMode-string for the Front-web
    const isDarkForServer: boolean = themeToSet === ("dark" as PaletteMode);
    return { config: { isDark: isDarkForServer } };
  };

  return (
    <>
      <Container className="DarkModeContainer">
        <WbSunnyIcon fontSize="small" />

        <Switch size="small" onChange={() => handleOnChange()} checked={themeToSet === "dark"} />

        <NightsStayIcon fontSize="small" />
      </Container>
    </>
  );
}

export default DarkModeSwitch;
