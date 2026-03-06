import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute() {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated === null) return <Loader />; // still checking
    if (!isAuthenticated) return <Navigate to="/login" />;
    return <Outlet/>;
}
export default ProtectedRoute;