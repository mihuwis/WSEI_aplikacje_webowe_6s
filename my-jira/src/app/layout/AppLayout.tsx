import type { ReactNode } from 'react';
import { userService } from '../../features/users/services/user.service';


type AppLayoutProps = {
  children: ReactNode;
};

var currentUser : User = userService.getCurrentUser();


export function AppLayout({ children }: AppLayoutProps){
    return (
        <div>
            <header>
                Mini-Jira | <a href="/projects">Projects</a> | Hello { currentUser.firstName } your role is { currentUser.role }
            </header>
                {children}
        </div>

    )
}
