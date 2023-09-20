
import { Navigate, useSearchParams } from "react-router-dom";

export const AuthAction = ({ children }) => {
    const [searchParams] = useSearchParams()

    let mode = searchParams.get('mode')
    let oobCode = searchParams.get('oobCode')

    if (mode === 'resetPassword') {
        const resetPasswordPath = `/password-reset?oobCode=${oobCode}`;

        return <Navigate to={resetPasswordPath} replace />
    } else if (mode === 'verifyEmail') {
        const confirmEmailPath = `/confirm-email?oobCode=${oobCode}`;

        return <Navigate to={confirmEmailPath} replace />
    }

    return children;
}
