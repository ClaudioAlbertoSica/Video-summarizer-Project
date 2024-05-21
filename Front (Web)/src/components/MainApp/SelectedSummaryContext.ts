import {   createContext } from "react";
import { Summary } from "../../Services/Types/UserTypes";


export const defaultSummary: Summary = {
    idres: "-1",
    title: "",
    points: 0,
    miniatura: "",
    isFavourite: false,
}

type SummaryStateElements = {
    State: Summary;
    SetState: React.Dispatch<React.SetStateAction<Summary>>;
}



export const SelectedSummaryContext = createContext<SummaryStateElements>({State: defaultSummary, SetState: ()=>{}});
