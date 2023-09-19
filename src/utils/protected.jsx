import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";

const Protected = ({ path = "/", children }) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation()

    return (
        token ?
            <>{children}</> :
            <Navigate to={path} state={{ from: location }} replace />
    )
}

export default Protected;
