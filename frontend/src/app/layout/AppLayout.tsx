import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ROUTES } from "../routes/routes.constants";



export function AppLayout(){

    const { userProfile, signOut } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const userMenuButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
    if (!isOpen) {
        return;
    }

    const handlePointerDown = (event: PointerEvent) => {
        if (
            event.target instanceof Node &&
            !userMenuRef.current?.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsOpen(false);
            userMenuButtonRef.current?.focus();
        }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener(
            "pointerdown",
            handlePointerDown,
        );

        document.removeEventListener(
            "keydown",
            handleKeyDown,
        );
    };
}, [isOpen]);

    const handleSignOut = async () => {
        await signOut();
        setIsOpen(false);
        navigate(ROUTES.home, { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-6">
                        <Link to="/projects" className="text-lg font-semibold tracking-tight text-slate-950">
                            Mini-Jira
                        </Link>
                        <nav>
                            <Link to="/projects" className="text-sm font-medium text-slate-600 hover:text-slate-950">
                                Projekty
                            </Link>
                        </nav>
                    </div>
                    <div ref={userMenuRef} className="relative">
                        <button
                            ref={userMenuButtonRef}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls="user-menu-panel"
                            onClick={() => setIsOpen((current) => !current)}
                            className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100"                        >
                            {userProfile
                                ? `${userProfile.displayName} · ${userProfile.role}`
                                : "Niezalogowany"}
                        </button>

                        {isOpen && userProfile && (
                            <div
                                id="user-menu-panel"
                                className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
                            >
                                <p className="font-medium text-slate-950">
                                    {userProfile.displayName}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {userProfile.email}
                                </p>

                                <p className="mt-2 text-xs uppercase text-slate-500">
                                    {userProfile.role}
                                </p>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="mt-4 w-full cursor-pointer rounded-lg border border-red-200 px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    Wyloguj się
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl p-6">
                <Outlet />
            </main>
        </div>

    )
}
