import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext()
function DarkModeProvider({children}) {
    const [ darkMode, setDarkMode ] = useLocalStorageState(window.matchMedia("(prefers-color-scheme:dark)").matches,"dark-mode")
    function handleDarkMode() {
        setDarkMode((e)=>!e)
    }
    return (<DarkModeContext.Provider value={{darkMode,handleDarkMode }}>{children}</DarkModeContext.Provider>)
}
function useDarkMode() {
    const context = useContext(DarkModeContext)
    if (!context) throw new Error("you use the function in wrong place")
    return context
}
export {useDarkMode,DarkModeProvider}