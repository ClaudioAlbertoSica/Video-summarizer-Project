import { Dispatch, SetStateAction, createContext } from "react";
import { ValidViewNames } from "./Views/ImTheActiveView.ts";

export const ButtonViewContext = createContext<Dispatch<SetStateAction<ValidViewNames>>>(() => {});
