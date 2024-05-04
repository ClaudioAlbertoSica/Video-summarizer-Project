

export enum ModalNames {
    Login = "LoginModal",
    Create = "CreateAccountModal",
    Password = "PasswordResetModal",
  }


  export const ImTheActiveModal = (activeModal: ModalNames, thisModal: ModalNames) => {
    return activeModal === thisModal;
  }