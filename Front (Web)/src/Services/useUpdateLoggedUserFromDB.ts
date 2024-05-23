import { useContext } from "react";
import { LoggedUserContext } from "../ActiveUserContext.ts";
import { DBuser, LoggedUser } from "./Types/UserTypes.ts";
import server from "./serverCall.ts";
import { PaletteMode } from "@mui/material";



const UpdateLoggedUserFromDB = async () =>{
  const activeUSer = useContext(LoggedUserContext);
  await server
    .post<DBuser>("/login", { userName: activeUSer.userState.userName, passwd: activeUSer.userState.passwd })
    .then((res) => {
      const adjustedUser: LoggedUser = newUserTypesCorrections(res.data);
      activeUSer.userSteState(adjustedUser)
      console.log("updated!")
    })
    .catch((err) => {
      throw new Error(err.error)
    });

};

const newUserTypesCorrections = (newUSer: DBuser) => {
/*Some types need to be adjusted, because they differ in the fron-web, from the server. 
isDark is a boolean in the server, while it is a PaletteMode-string like in the front-web*/
const adjustedUser: LoggedUser = newUSer.config.isDark
? { ...newUSer, config: { isDark: "dark" as PaletteMode } }
: { ...newUSer, config: { isDark: "light" as PaletteMode } };

return adjustedUser;
}
