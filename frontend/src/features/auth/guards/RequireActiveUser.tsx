import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../../app/routes/routes.constants";
import { useAuth } from "../hooks/useAuth";

export function RequireActiveUser() {
    const { userProfile, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="text-sm text-slate-600">
                    Sprawdzanie uprawnień...
                </p>
            </div>
        );
    }

    if (!userProfile) {
        return (
            <Navigate
                to={ROUTES.home}
                replace
            />
        );
    }

    const hasActiveRole =
        userProfile.role === "developer" ||
        userProfile.role === "devops" ||
        userProfile.role === "admin";

    if (userProfile.isBlocked || !hasActiveRole) {
        return (
            <Navigate
                to={ROUTES.accountStatus}
                replace
            />
        );
    }

    return <Outlet />;
}