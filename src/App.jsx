import { Outlet } from "react-router-dom"
import { AuthLayout } from "./components/layouts/auth"
import Protected from "./utils/protected"

export const App = () => {
    return (
        <>
            <Protected path="/app">
                <AuthLayout>
                    <Outlet />
                </AuthLayout>
            </Protected>
        </>
    )
}