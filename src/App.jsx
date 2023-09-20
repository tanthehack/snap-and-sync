import { Outlet } from "react-router-dom"
import { AuthLayout } from "./components/layouts/auth"

export const App = () => {
    return (
        <>
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        </>
    )
}