import GridLayout from "./components/MainApp/MainLayout.tsx";
import LoginLayout from "./components/Login/LoginLayout.tsx";
import { useState } from "react";
import { LoggedUser, placeholderUser, LoggedUserContext } from "./ActiveUserContext.ts";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { getDesignTokens } from "./ColorPalettes.ts";

function App() {
  const [currentUser, setUser] = useState<LoggedUser>(placeholderUser);

  const myTheme = createTheme(getDesignTokens("light"));

  return (
    <>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <LoggedUserContext.Provider value={{ userState: currentUser, userSteState: setUser }}>
          {currentUser === placeholderUser ? <LoginLayout setUser={setUser} /> : <GridLayout />};
        </LoggedUserContext.Provider>
      </ThemeProvider>
    </>
  );
  /*
    <GridLayout />
  );
  */
}

export default App;
