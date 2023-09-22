import { signOut } from "firebase/auth";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Button } from "./button";
import { SideBarItem } from "./sideBarItem"
import * as Icon from '@heroicons/react/24/solid'
import { toast } from "react-toastify";
import { auth } from "../../firebaseConfig";

export const SideBar = () => {
    let isMobile = useMediaQuery("(max-width: 768px)");

    const handleLogOut = async () => {
        await signOut(auth)
            .then(() => {
                toast.success("User Logged out");
            })
            .catch((error) => {
                toast.error("error", error);
            });
    }

    const mobileNav = <nav className="h-[70px] border-t-[2px] border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-500 flex items-center justify-between w-full sticky bottom-0 left-0">
        <SideBarItem icon={<Icon.HomeIcon />} url="/app" mobile={isMobile} />
        <SideBarItem icon={<Icon.TagIcon />} url="/app/tags" mobile={isMobile} />
        <Button widthFit icon={<Icon.ArrowRightOnRectangleIcon className="text-gray-900 dark:text-white w-6 h-6 hover:text-sky-400" />} onClick={handleLogOut} />
    </nav>

    const desktopNav = <nav className="w-[84px] border-r-[2px] border-slate-300 dark:border-slate-500 pt-[100px] py-6 flex flex-col justify-between">
        <div className="space-y-6">
            <SideBarItem icon={<Icon.HomeIcon />} url="/app" />
            <SideBarItem icon={<Icon.TagIcon />} url="/app/tags" />
        </div>
        <Button icon={<Icon.ArrowRightOnRectangleIcon className="text-gray-900 dark:text-white w-6 h-6 hover:text-sky-400" />} onClick={handleLogOut} />
    </nav>

    return (
        <>
            {isMobile ? mobileNav : desktopNav}
        </>
    )
}