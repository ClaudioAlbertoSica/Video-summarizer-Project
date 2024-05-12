import { createContext } from "react";


export type LoggedUser = {
id: string;
userName: string;
passwd: string;
inventory: Summary[]; // Data to create the List of previous summaries
selectedSummary: Summary; // Data to display a full summary, when List is clicked
}


export type Summary = {
    idRes: string;
    title: string;
    point: number;
    miniatura: string;
    }

export const placeholderUser: LoggedUser = Object.freeze({
    id: "-1",
    userName: "placeholer@placeholder.com",
    passwd: "placeholder",
    inventory: [{
        idRes: "1",
        title: "placeholder1",
        point: 0,
        miniatura: "./assets/Logo.png",
        },
        {
            idRes: "2",
            title: "placeholder2",
            point: 3,
            miniatura: "./assets/Logo.png",
            },],
    selectedSummary: {
        idRes: "-1",
        title: "PlaceHolder Title",
        point: 4,
        miniatura: "./assets/Logo.png",
        },
    })


    type UserStateElements = {
        userState: LoggedUser;
        userSteState: React.Dispatch<React.SetStateAction<LoggedUser>>;
    }

export const LoggedUserContext = createContext<UserStateElements>({userState: placeholderUser, userSteState: ()=>{}});
