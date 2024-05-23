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
  delay?: number ) => {
    if(delay){
        stateSetter({message, type})
        setTimeout(()=>stateSetter({message: "don't show", type: alertTypes.info}), delay)
      } else{ //If no delay is set, then message will remain there until caller Component's State is set to "don't show" 
        stateSetter({message, type})
      }
    }

/*
How it Works?

alertTypes, AlertMessage and alertMessagesHandler should be imported in the Component that will
make use of the alertMessagesHandler.tsx service.

The Component should contain a useState hook, of type AlertMessage, such as:
useState<AlertMessage>({ message: "don't show", type: alertTypes.info });

Initial State AlertMessage type is not importante, but the message is, and should be
"don't show" because in the return it is used to display the message or not, based on a 
conditional:
{alertToShow.message !== "don't show" && <Alert severity={alertToShow.type}> {alertToShow.message} </Alert>}

The Setter of the useState is passed down to the alertMessagesHandler, so it can set the 
provided message, and after a certain time set it back to "don't show".

*/