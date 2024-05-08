import GridLayout from "./components/MainApp/MainLayout.tsx";
import LoginLayout from "./components/Login/LoginLayout.tsx";
import { useState } from "react";
import { LoggedUser, placeholderUser, LoggedUserContext } from "./ActiveUserContext.ts";

function App() {
  const [currentUser, setUser] = useState<LoggedUser>(placeholderUser);

  return (
    <>
      <LoggedUserContext.Provider value={{ userState: currentUser, userSteState: setUser }}>
        {currentUser === placeholderUser ? <LoginLayout setUser={setUser} /> : <GridLayout />};
      </LoggedUserContext.Provider>
    </>
  );

  /*<GridLayout />
  );*/
}

export default App;
