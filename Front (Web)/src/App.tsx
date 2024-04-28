import GridLayout from "./components/GridLayout";
import LoginLayout from "./components/Login/LoginLayout";
import { useState } from "react";

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  return <>{isLogedIn ? <GridLayout /> : <LoginLayout setStatus={setIsLogedIn} />};</>;
}

export default App;
