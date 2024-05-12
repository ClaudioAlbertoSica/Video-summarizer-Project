import { createContext } from "react";


export type LoggedUser = {
id: string;
userName: string;
passwd: string;
inventario: Resumen[]; // Data to create the List of previous summaries
selectedSummary: selectedSummary; // Data to display a full summary, when List is clicked
}

export type selectedSummary ={
    idRes: string,
    title: string,
}

export type Resumen = {
    idres: string;
    title: string;
    point: number;
    miniatura: string;
    }

export const placeholderUser: LoggedUser = Object.freeze({
    id: "-1",
    userName: "placeholer@placeholder.com",
    passwd: "placeholder",
    inventario: [{
        idres: "1",
        title: "placeholder1",
        point: 0,
        miniatura: "./assets/Logo.png",
        },
        {
            idres: "2",
            title: "placeholder2",
            point: 3,
            miniatura: "./assets/Logo.png",
            }],
 selectedSummary:{
    idRes: "-1",
    title: "placeHolder"
 }
    })


    type UserStateElements = {
        userState: LoggedUser;
        userSteState: React.Dispatch<React.SetStateAction<LoggedUser>>;
    }

export const LoggedUserContext = createContext<UserStateElements>({userState: placeholderUser, userSteState: ()=>{}});
