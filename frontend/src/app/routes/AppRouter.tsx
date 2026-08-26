import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectsPage } from '../../features/projects/pages/ProjectsPage';
import { ProjectDetailsPage } from '../../features/projects/pages/ProjectDetailsPage';
import { StoryDetailsPage } from '../../features/stories/pages/StoryDetailsPage';
import { ROUTES } from './routes.constants';
import { AddTaskPage } from '../../features/tasks/pages/AddTaskPage';
import { AppLayout } from '../layout/AppLayout';
import { TaskDetailsPage } from '../../features/tasks/pages/TaskDetailsPage';
import { StoryBoardPage } from '../../features/stories/pages/StoryBoardPage';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { HomePage } from "../pages/HomePage";
import { RequireAuth } from "../../features/auth/guards/RequireAuth";
import { RequireActiveUser } from "../../features/auth/guards/RequireActiveUser";
import { AccountStatusPage } from "../../features/auth/pages/AccountStatusPage";


export function AppRouter() {
    return (
    <BrowserRouter>
      <Routes>
          <Route
              path={ROUTES.home}
              element={<HomePage />}
          />

          <Route
              path={ROUTES.login}
              element={<LoginPage />}
          />

          <Route element={<RequireAuth />}>
              <Route
                  path={ROUTES.accountStatus}
                  element={<AccountStatusPage />}
              />

              <Route element={<RequireActiveUser />}>
                  <Route element={<AppLayout />}>
                      <Route
                          path={ROUTES.projects}
                          element={<ProjectsPage />}
                      />

                      <Route
                          path={ROUTES.storyBoard}
                          element={<StoryBoardPage />}
                      />

                      <Route
                          path={ROUTES.projectDetails}
                          element={<ProjectDetailsPage />}
                      />

                      <Route
                          path={ROUTES.storyDetails}
                          element={<StoryDetailsPage />}
                      />

                      <Route
                          path={ROUTES.taskDetails}
                          element={<TaskDetailsPage />}
                      />

                      <Route
                          path={ROUTES.addTask}
                          element={<AddTaskPage />}
                      />
                  </Route>
              </Route>
          </Route>
      </Routes>
    </BrowserRouter>
    )
}
