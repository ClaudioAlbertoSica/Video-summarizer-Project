import { useContext, useEffect, useRef, useState } from "react";
import { LoggedUserContext } from "../../../ActiveUserContext";
import server from "../../../Services/serverCall";
import "./WIP.css";
import ActiveWorkIndicator from "./ActiveWorkIndicator";
import ReadyWorkIndicator from "./ReadyWorkIndicator";

function WIPindicator() {
  const activeUSer = useContext(LoggedUserContext);
  const intervalID = useRef<number[]>([]); /*This stores the id of the setInterval, to allow
   me to cancel it.
   I used an array, because as React renders everything twice while developing, I need to catch 
   IDs generated by both renders, and any other render triggered done by other processes.
   */
  const [serverWorking, setServerWorking] = useState<boolean>(activeUSer.userState.inProgress);

  const checkInProgress = async () => {
    await server
      .get<boolean>(`/inprogress/${activeUSer.userState.id}`)
      .then((res) => {
        if (!res.data /*meanning "server has no work in progress"*/) {
          while (intervalID.current.length != 0) {
            const removedElement = intervalID.current.pop();
            clearInterval(removedElement);
          }
          setServerWorking(false); /*forces the useEffect to be triggered again, so it's "if" goes 
          through "false"", and settes the activeUserState.
          Changing that here resulted in a collapse of the main App if a summary was opened at 
          the time this triggered, because it saves the current Active User at the time=0 for 
          the setInterval... so it was always a user with no selectedSummary, and that caused the 
          PDFviewer to collapse.
          If PDFviewer took data from received full PDF, instead of the List... may be it didn't broke,
          Thats something to try, because thi WIP component would have had a shorter and easier code. 
          */
        }
      })
      .catch((err) => console.log(err.error));
  };

  useEffect(() => {
    if (serverWorking) {
      intervalID.current.push(setInterval(checkInProgress, 5000));
    } else {
      activeUSer.userSteState({ ...activeUSer.userState, inProgress: false });
      setServerWorking(activeUSer.userState.inProgress);
    }
  }, [activeUSer.userState.inProgress, serverWorking]);

  return <>{activeUSer.userState.inProgress ? <ActiveWorkIndicator /> : <ReadyWorkIndicator />}</>;
}

export default WIPindicator;
