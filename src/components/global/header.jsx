import { ThemeSwitcher } from "./themeSwitcher"
import logo from '../../assets/icons/logo.svg'
import logoWhite from '../../assets/icons/logoWhite.svg'
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useState } from "react"
import { SearchBar } from "./search"

export const Header = () => {
    let isMobile = useMediaQuery("(max-width: 768px)");

    // State to control the visibility of the search bar
    const [showSearch, setShowSearch] = useState(true)

    // Function to handle showing/hiding the search bar
    const handleShowSearch = (value) => {
        setShowSearch(value)
    }

    const mobileHeader = <header className="bg-white text-slate-900 dark:text-white dark:bg-slate-900 flex items-center justify-between relative px-6 py-3 border-b-[2px] border-slate-300 dark:border-slate-500 h-[90px]">
        <img src={logo} alt="logo" className={`${!showSearch ? "translate-x-[-200%]" : "translate-x-0"} w-16 h-16 dark:hidden transition ease-in-out delay-150 duration-300`} />
        <img src={logoWhite} alt="logo" className={`${!showSearch ? "translate-x-[-200%]" : "translate-x-0"} w-16 h-16 hidden dark:block transition ease-in-out delay-150 duration-300`} />
        <div className="flex items-center">
            <SearchBar isMobile={true} showSearch={handleShowSearch} />
            <ThemeSwitcher className={`${!showSearch ? "translate-x-[-120dvw]" : "translate-x-0"} transition ease-in-out delay-150 duration-300`} />
        </div>
    </header>

    const desktopHeader = <header className="bg-white text-slate-900 dark:text-white dark:bg-slate-900 flex items-center justify-between relative px-6 py-3 border-b-[2px] border-slate-300 dark:border-slate-500  h-[90px]">
        <img src={logo} alt="logo" className="w-16 h-16 dark:hidden" />
        <img src={logoWhite} alt="logo" className="w-16 h-16 hidden dark:block" />
        <SearchBar />
        <ThemeSwitcher />
    </header>

    return (
        <>
            {isMobile ? mobileHeader : desktopHeader}
        </>
    )
}