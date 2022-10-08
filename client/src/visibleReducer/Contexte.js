import { createContext, useReducer } from "react"
import { Reducer } from "./Reducer";

import { STORE } from "./Store"

export const VisibleContexte = createContext();

const Visible = ({children})=>{
    const [stateVisible, dispacthVisible] = useReducer(Reducer, STORE);
     return (
        <VisibleContexte.Provider value={{stateVisible, dispacthVisible}}>
            {children}
        </VisibleContexte.Provider>
     )
}

export default Visible;