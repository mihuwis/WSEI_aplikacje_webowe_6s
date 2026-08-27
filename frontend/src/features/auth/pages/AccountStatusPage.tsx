import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../../../app/routes/routes.constants";

export function AccountStatusPage(){
    const {
        userProfile,
        isLoading,
        signOut,
    } = useAuth();

    

        if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span
                        aria-hidden="true"
                        className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"
                    />
                    Sprawdzanie konta...
                </div>
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

        if (!userProfile.isBlocked && userProfile.role !== "guest") {
        return (
            <Navigate
                to={ROUTES.projects}
                replace
            />
        );
    }

    const handleSignOut = async () => {
        await signOut();
    };

    const accountTitle = userProfile.isBlocked
        ? "Konto zostało zablokowane"
        : "Konto oczekuje na akceptację";

    const accountMessage = userProfile.isBlocked
        ? "Skontaktuj się z administratorem, aby wyjaśnić blokadę konta."
        : "Administrator musi przypisać Ci rolę, zanim uzyskasz dostęp do aplikacji.";

    return (
        <div>
            <h1>{accountTitle}</h1>
            <p>{accountMessage}</p>
            <p>{userProfile.email}</p>
        
            <button
                type="button"
                onClick={handleSignOut}
                className="mt-6 cursor-pointer rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
                Wyloguj się
            </button>
        </div>
    )

}