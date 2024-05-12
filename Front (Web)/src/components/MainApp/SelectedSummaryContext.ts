import {  Dispatch, SetStateAction, createContext } from "react";

export type selectedSummary ={
    idRes: string,
    title: string,
}

const placeHolderSummary: selectedSummary ={
    idRes: "-1",
    title: "Placeholder"
}


export const SelectedSummaryContext = createContext<[selectedSummary,Dispatch<SetStateAction<selectedSummary>>]>([placeHolderSummary, () => {}]);
