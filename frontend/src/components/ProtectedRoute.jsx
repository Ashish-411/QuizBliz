import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated === null) return <Loader />; // still checking
    if (!isAuthenticated) return <Navigate to="/login" />;
    return children;
}
export default ProtectedRoute;