import { HiOutlineMoon } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import { useDarkMode } from "../context/DarkModeContext"
import { useEffect } from "react"
import { HiOutlineSun } from "react-icons/hi"

function DarkModeToggle() {
    const { darkMode, handleDarkMode } = useDarkMode()
    useEffect(function () {
        if (darkMode) {
            
            document.documentElement.classList.add("dark-mode")
            document.documentElement.classList.remove("light-mode")
        } else {
              document.documentElement.classList.add("light-mode");
              document.documentElement.classList.remove("dark-mode");
        }
},[darkMode])
    return (
        <ButtonIcon onClick={handleDarkMode}>{darkMode?<HiOutlineSun/>: <HiOutlineMoon/>}</ButtonIcon>
    )
}

export default DarkModeToggle
