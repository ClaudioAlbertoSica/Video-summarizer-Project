import GridLayout from "./components/MainApp/MainLayout.tsx";
import LoginLayout from "./components/Login/LoginLayout.tsx";
import { useEffect, useState } from "react";
import { placeholderUser, LoggedUserContext } from "./ActiveUserContext.ts";
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { ColorContext, getDesignTokens } from "./ColorPalettes.ts";
import { LoggedUser } from "./Services/Types/UserTypes.ts";

function App() {
  const [currentUser, setUser] = useState<LoggedUser>(placeholderUser);
  const [themeMode, setThemeMode] = useState<PaletteMode>(currentUser.config.isDark);
  const myTheme = createTheme(getDesignTokens(themeMode));

  useEffect(() => {
    setThemeMode(currentUser.config.isDark);
  }, [currentUser.config.isDark]);

  return (
    <>
      <ColorContext.Provider value={setThemeMode}>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />
          <LoggedUserContext.Provider value={{ userState: currentUser, userSteState: setUser }}>
            {currentUser === placeholderUser ? <LoginLayout setUser={setUser} /> : <GridLayout />};
          </LoggedUserContext.Provider>
        </ThemeProvider>
      </ColorContext.Provider>
    </>
  );
  /*
    <GridLayout />
  );
  */
}

export default App;
