import { Outlet } from "react-router-dom"
import { AuthLayout } from "./components/layouts/auth"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { saveUser } from "./auth/authSlice";

export const App = () => {

    const user = useSelector((state) => state.auth.value);

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(saveUser(user.refreshToken));
            } else {
                dispatch(saveUser(undefined));
            }
        });
    }, [auth, dispatch]);

    return (
        <>
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        </>
    )
}