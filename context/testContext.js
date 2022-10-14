import React from "react";
import { useContext, useState } from "react";

export const TestVisibleContext = React.createContext();

export function useTestVisible() {
  return useContext(TestVisibleContext);
}

export function TestVisibleProvider({children}) {
  const [isTestVisible, setIsTestVisible] = useState(true);

  return(
    <TestVisibleContext.Provider value={{isTestVisible, setIsTestVisible}}>
      {children}
    </TestVisibleContext.Provider>    
  )
}