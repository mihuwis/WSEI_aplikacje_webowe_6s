import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../../../app/routes/routes.constants";



export function LoginPage (){

    const {
        userProfile,
        isLoading,
        error,
        signInWithGoogle,
    } = useAuth();


    const handleSignIn = async () => {
        await signInWithGoogle();
 
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span
                        aria-hidden="true"
                        className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"
                    />
                    Sprawdzanie sesji...
                </div>
            </div>
        );
    }
    if (userProfile) {
        return (
            <Navigate
                to={ROUTES.projects}
                replace
            />
        );
    }
    return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white shadow-md">
                    M
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Zaloguj się do MiniJira
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Użyj konta Google, aby uzyskać dostęp do projektów,
                    stories i zadań.
                </p>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            <button
                type="button"
                onClick={handleSignIn}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold text-slate-900">
                    G
                </span>

                Kontynuuj z Google
            </button>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                Dostęp do aplikacji zależy od roli przypisanej do Twojego
                konta.
            </p>
        </section>
    </div>
);
}