"use client"
import {  useState } from "react"
import { ContextGlobal } from "./Context"
import { ReactNode } from "react";
interface ProviderProps {
  children: ReactNode;
}


export const Provider = ({children}: ProviderProps)=>{

    const [isSelected, setIsSelected] = useState(true)

    return<ContextGlobal.Provider value={{isSelected, setIsSelected}}>
        {children}
    </ContextGlobal.Provider>}