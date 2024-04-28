import GridLayout from "./components/GridLayout";
import { Route, Routes } from "react-router-dom";
import LoginLayout from "./components/Login/LoginLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />} />
      <Route path="/main" element={<GridLayout />} />
    </Routes>
  );
}

export default App;
