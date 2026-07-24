import type { ReactNode } from 'react';


type AppLayoutProps = {
  children: ReactNode;
};


export function AppLayout({ children }: AppLayoutProps){
    return (
        <div>
            <header>
                Mini-Jira <a href="/projects">Projects</a>
            </header>
                {children}
        </div>


    )
}
