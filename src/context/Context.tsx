'use client';
import { createContext} from "react";

// export const ContextGlobal=createContext({})
interface ContextGlobalType {
  isSelected: boolean;
  setIsSelected: (isSelected:boolean)=>void;
//   setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextGlobal = createContext<ContextGlobalType>({
  isSelected: true,
  setIsSelected: () => {},
});