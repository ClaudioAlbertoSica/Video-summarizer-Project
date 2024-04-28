import { Container } from "@mui/material";
import { useState } from "react";
import "./LoginLayout.css";
import LoginModal from "./Modals/LoginModal.tsx";
import CreateAccountModal from "./Modals/CreateAccountModal.tsx";
import PasswordResetModal from "./Modals/PasswordResetModal.tsx";

export interface ModalNames {
  modalName?: "LoginModal" | "CreateAccountModal" | "PasswordResetModal";
}

function LoginLayout({ modalName = "LoginModal" }: ModalNames) {
  const [selectedModalName, setmodalName] = useState<ModalNames["modalName"]>(modalName);

  const handleModalChange = (modalName: ModalNames["modalName"]) => {
    setmodalName(modalName);
  };

  return (
    <Container className="ExternalLoginLayoutContainer">
      {selectedModalName === "LoginModal" && <LoginModal selectorCallback={handleModalChange} />}
      {selectedModalName === "CreateAccountModal" && <CreateAccountModal selectorCallback={handleModalChange} />}
      {selectedModalName === "PasswordResetModal" && <PasswordResetModal selectorCallback={handleModalChange} />}
    </Container>
  );
}

export default LoginLayout;
