import { Container } from "@mui/material";
import { useState } from "react";
import "./LoginLayout.css";
import LoginModal from "./Modals/LoginModal.tsx";
import CreateAccountModal from "./Modals/CreateAccountModal.tsx";
import PasswordResetModal from "./Modals/PasswordResetModal.tsx";
import { LoggedUser } from "../../ActiveUserContext.ts";
import { ModalNames, ImTheActiveModal } from "./Modals/ImTheActiveModal.ts";

export interface SetLoggedUser {
  setUser: (user: LoggedUser) => void;
}

function LoginLayout({ setUser }: SetLoggedUser) {
  const [selectedModalName, setmodalName] = useState<ModalNames>(ModalNames.Login);

  const handleModalChange = (modalName: ModalNames) => {
    setmodalName(modalName);
  };

  return (
    <Container className="ExternalLoginLayoutContainer">
      {ImTheActiveModal(selectedModalName, ModalNames.Login) && (
        <LoginModal selectorCallback={handleModalChange} setNewLoggedUser={setUser} />
      )}
      {ImTheActiveModal(selectedModalName, ModalNames.Create) && (
        <CreateAccountModal selectorCallback={handleModalChange} setNewLoggedUser={setUser} />
      )}
      {ImTheActiveModal(selectedModalName, ModalNames.Password) && <PasswordResetModal selectorCallback={handleModalChange} />}
    </Container>
  );
}

export default LoginLayout;
