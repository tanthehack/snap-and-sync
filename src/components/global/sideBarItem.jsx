import { NavLink, useLocation } from "react-router-dom"
import { cloneElement } from "react"

export const SideBarItem = ({ icon, mobile, url }) => {
    const location = useLocation()
    let activeUrl = location.pathname

    return (
        <NavLink to={url} className={`${url == activeUrl ? "border-sky-400" : "dark:border-slate-900 border-white"} ${mobile ? "border-t-[6px] h-full px-8" : "border-r-[6px]"} p-[10px] rounded-[3px] flex justify-center`}>
            {/* Render the provided icon with optional customization */}
            {icon &&
                cloneElement(icon, {
                    className: `w-6 h-6`,
                    strokeColor: 'currentColor',
                })
            }
        </NavLink>
    )
}
