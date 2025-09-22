import { createContext } from "react";
import { contextI } from "../interface/context";


export const ContextAutenticacion = createContext<contextI>({
    autenticacion:null,
    setEstadoAutenticacion() {
        
    },
    logout() {
        
    },
})