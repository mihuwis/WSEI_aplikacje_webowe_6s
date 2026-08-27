import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../../app/routes/routes.constants";
import { useAuth } from "../hooks/useAuth";

export function RequireAdmin() {
    const { userProfile } = useAuth();

    if (!userProfile || userProfile.role !== "admin") {
        return <Navigate to={ROUTES.projects} replace />;
    }

    return <Outlet />;
}