import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");
    const location = useLocation();

    if (!token || !userString) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    const user = JSON.parse(userString);

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
};

export default ProtectedRoute;