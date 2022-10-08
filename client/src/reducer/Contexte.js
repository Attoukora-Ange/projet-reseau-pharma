import { createContext, useReducer } from "react"
import { Reducer } from "./Reducer";

import { STORE } from "./Store"

export const MonContexte = createContext();

const Contexte = ({children})=>{
    const [state, dispacth] = useReducer(Reducer, STORE);
     return (
        <MonContexte.Provider value={{state, dispacth}}>
            {children}
        </MonContexte.Provider>
     )
}

export default Contexte;