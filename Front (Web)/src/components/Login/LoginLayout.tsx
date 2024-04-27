import { Container } from "@mui/material";
import { useState } from "react";
import "./LoginLayout.css";
import LoginModal from "./LoginModal.tsx";

interface LoginScreenTypes {
  screenType?: "Login" | "Sign Up" | "Forgot Password";
}

function LoginLayout({ screenType = "Login" }: LoginScreenTypes) {
  const [modal, setModal] = useState(screenType);

  return (
    <Container className="ExternalLoginLayoutContainer">
      <LoginModal />
    </Container>
  );
}

export default LoginLayout;
