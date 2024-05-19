import { PaletteMode } from "@mui/material";


//Represents the user that is LoggedIn, in the Front-Web
export type LoggedUser = {
    id: string;
    userName: string;
    passwd: string;
    inProgress: boolean;
    config: Config;
    inventario: Summary[]; // Data to create the List of previous summaries
    selectedSummary?: Summary; // Data to display a full summary, when List is clicked
    }


//Represents the user, as it is stored in the DB. Has some differences with respect to the last one: DarkMMode is a boolean, instead of a PaletteMode-string, and has no selectedSummary.
export type DBuser ={
        id: string;
        userName: string;
        passwd: string;
        inProgress: boolean;
        config: ConfigDB;
        inventario: Summary[]; // Data to create the List of previous summaries
    }
    



//Secondary types, used by user-types as parameters.
    type ConfigDB ={
        isDark: boolean;
    }
    
    
    type Config ={
        isDark: PaletteMode;
    }
    
    
    export type Summary = {
        idres: string;
        title: string;
        points: number;
        miniatura: string;
        }

