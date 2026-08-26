import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routes.constants";


export function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
            <section className="w-full max-w-2xl text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-white shadow-lg">
                    M
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
                    Zarządzanie projektami
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                    Witamy w MiniJira
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
                    Organizuj projekty, stories i zadania zespołu
                    w jednym, przejrzystym miejscu.
                </p>

                <div className="mt-8 flex justify-center">
                    <Link
                        to={ROUTES.login}
                        className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    >
                        Zaloguj się przez Google
                    </Link>
                </div>
            </section>
        </main>
    );
}