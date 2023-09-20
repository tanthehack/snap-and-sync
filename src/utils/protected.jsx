import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ path = "/", children }) => {
    const user = useSelector((state) => state.auth.value);
    const location = useLocation()

    return (
        user ?
            <>{children}</> :
            <Navigate to={path} state={{ from: location }} replace />
    )
}

export default Protected;
