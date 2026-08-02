import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../features/users/services/user.service';


type AppLayoutProps = {
  children: ReactNode;
};

const currentUser = userService.getCurrentUser();


export function AppLayout({ children }: AppLayoutProps){
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
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                        {currentUser.firstName} · {currentUser.role}
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl p-6">
                {children}
            </main>
        </div>

    )
}
