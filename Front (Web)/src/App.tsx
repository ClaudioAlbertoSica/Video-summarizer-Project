import GridLayout from "./components/MainApp/MainLayout.tsx";
import LoginLayout from "./components/Login/LoginLayout.tsx";
import { useState } from "react";
import { LoggedUser, placeholderUser, LoggedUserContext } from "./ActiveUserContext.ts";

function App() {
  const [user, setUser] = useState<LoggedUser>(placeholderUser);

  return (
    <>
      <LoggedUserContext.Provider value={user}>
        {user === placeholderUser ? <LoginLayout setUser={setUser} /> : <GridLayout />};
      </LoggedUserContext.Provider>
    </>
  );
  //  return <GridLayout />;
}

export default App;
