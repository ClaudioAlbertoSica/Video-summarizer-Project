export enum alertTypes {
    success = "success",
    info = "info",
    warning = "warning",
    error = "error",
  }

export type AlertMessage = {
    message: string;
    type: alertTypes;
  };
  


export const  alertMessagesHandler = (
  stateSetter: (arg: AlertMessage) => void,
  message: string,
  type: alertTypes,
  delay: number = 1800 ) => {
        stateSetter({message, type})
        setTimeout(()=>stateSetter({message: "don't show", type: alertTypes.info}), delay)
    }

