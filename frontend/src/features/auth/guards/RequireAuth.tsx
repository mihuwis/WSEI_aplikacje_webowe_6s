import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../../app/routes/routes.constants";
import { useAuth } from "../hooks/useAuth";

export function RequireAuth() {
    const { userProfile, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="text-sm text-slate-600">
                    Sprawdzanie sesji...
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

    return <Outlet />;
}