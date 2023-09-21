import { Outlet } from "react-router-dom"
import { Header } from "../global/header"
import { SideBar } from "../global/sideBar"
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const MainAppLayout = () => {
    let isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <main className="bg-white text-slate-900 dark:text-white dark:bg-slate-900 font-outfit h-[100dvh] w-full relative overflow-hidden">
            <Header />
            <div className={`${isMobile ? "flex-col-reverse" : "flex-row"} flex h-[calc(100%-90px)]`}>
                <SideBar />
                <Outlet />
            </div>
        </main>
    )
}