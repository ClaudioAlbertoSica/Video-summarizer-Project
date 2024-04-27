import { Container } from "@mui/material";
import { useState } from "react";
import "./LoginLayout.css";
import LoginModal from "./Modals/LoginModal.tsx";
import CreateAccountModal from "./Modals/CreateAccountModal.tsx";
import PasswordResetModal from "./Modals/PasswordResetModal.tsx";

interface LoginScreenTypes {
  screenType?: "Login" | "Sign Up" | "Forgot Password";
}

function LoginLayout({ screenType = "Login" }: LoginScreenTypes) {
  const [modal, setModal] = useState(screenType);

  return (
    <Container className="ExternalLoginLayoutContainer">
      <PasswordResetModal />
    </Container>
  );
}

export default LoginLayout;
