import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
    const {isAuthenticated} = useAuth();
    if (isAuthenticated === null) return <Loader />; // still checking
    if (!isAuthenticated) return <Navigate to="/login" />;
    return children;
}
export default ProtectedRoute;