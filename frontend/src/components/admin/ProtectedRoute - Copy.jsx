import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth); // Assuming `auth` slice contains `user`.
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'recruiter') {
            navigate("/"); // Redirect to home if not authenticated or wrong role.
        }
    }, [user, navigate]); // Add dependencies to ensure effect runs on changes.

    // Optionally, show a fallback UI or loading state while checking auth
    if (!user) {
        return <div>Loading...</div>;
    }

    return <>{children}</>; // Render children only if checks pass.
};

export default ProtectedRoute;
