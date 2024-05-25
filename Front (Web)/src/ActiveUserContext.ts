import { PaletteMode } from "@mui/material";
import { createContext } from "react";
import { LoggedUser } from "./Services/Types/UserTypes";

export const placeholderUser: LoggedUser = Object.freeze({
    id: "-1",
    userName: "placeholer@placeholder.com",
    passwd: "placeholder",
    inProgress: false,
    provisoria: false,
    config:{
        isDark: 'light' as PaletteMode
    },
    inventario: [{
        idres: "1",
        title: "placeholder1",
        points: 0,
        isFavourite: true,
        miniatura: "./assets/Logo.png",
        },
        {
            idres: "2",
            title: "placeholder2",
            points: 3,
            isFavourite: false,
            miniatura: "./assets/Logo.png",
            },],
    selectedSummary: {
        idres: "-1",
        title: "PlaceHolder Title",
        points: 4,
        isFavourite: false,
        miniatura: "./assets/Logo.png",
        },
    })


    type UserStateElements = {
        userState: LoggedUser;
        userSteState: React.Dispatch<React.SetStateAction<LoggedUser>>;
    }

export const LoggedUserContext = createContext<UserStateElements>({userState: placeholderUser, userSteState: ()=>{}});
