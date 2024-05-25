import { DBuser, LoggedUser } from "./Types/UserTypes.ts";
import { PaletteMode } from "@mui/material";




export const newUserTypesCorrections = (newUSer: DBuser) => {
/*Some types need to be adjusted, because they differ in the fron-web, from the server. 
isDark is a boolean in the server, while it is a PaletteMode-string like in the front-web*/
const adjustedUser: LoggedUser = newUSer.config.isDark
? { ...newUSer, config: { isDark: "dark" as PaletteMode } }
: { ...newUSer, config: { isDark: "light" as PaletteMode } };

return adjustedUser;
}
