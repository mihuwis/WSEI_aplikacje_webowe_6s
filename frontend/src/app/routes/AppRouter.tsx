import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { HomePage } from "../pages/HomePage";
import { ROUTES } from './routes.constants';
import { RequireAuth } from "../../features/auth/guards/RequireAuth";
import { RequireActiveUser } from "../../features/auth/guards/RequireActiveUser";
import { AccountStatusPage } from "../../features/auth/pages/AccountStatusPage";
import { RequireAdmin } from "../../features/auth/guards/RequireAdmin";
import { AdminUsersPage } from "../../features/users/pages/AdminUsersPage";
import { AppLayout } from '../layout/AppLayout';

// PROJECT
import { ProjectsPage } from '../../features/projects/pages/ProjectsPage';
import { ProjectDetailsPage } from '../../features/projects/pages/ProjectDetailsPage';
import { AddProjectPage } from '../../features/projects/pages/AddProjectPage';
import { EditProjectPage } from '../../features/projects/pages/EditProjectPage';
// STORY
import { StoryBoardPage } from '../../features/stories/pages/StoryBoardPage';
import { StoryDetailsPage } from '../../features/stories/pages/StoryDetailsPage';
import { AddStoryPage } from '../../features/stories/pages/AddStoryPage';
import { EditStoryPage } from '../../features/stories/pages/EditStoryPage';
//TASK

import { AddTaskPage } from '../../features/tasks/pages/AddTaskPage';

import { TaskDetailsPage } from '../../features/tasks/pages/TaskDetailsPage';





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
                          path={ROUTES.addProject}
                          element={<AddProjectPage />}
                      />

                    <Route
                          path={ROUTES.editProject}
                          element={<EditProjectPage />}
                      />

                    <Route
                          path={ROUTES.projectDetails}
                          element={<ProjectDetailsPage />}
                      />

                    <Route
                          path={ROUTES.storyBoard}
                          element={<StoryBoardPage />}
                      />

                    <Route
                          path={ROUTES.storyDetails}
                          element={<StoryDetailsPage />}
                      />

                    <Route
                          path={ROUTES.addStory}
                          element={<AddStoryPage />}
                      />

                    <Route
                          path={ROUTES.editStory}
                          element={<EditStoryPage />}
                      />

                    <Route
                          path={ROUTES.taskDetails}
                          element={<TaskDetailsPage />}
                      />

                    <Route
                          path={ROUTES.addTask}
                          element={<AddTaskPage />}
                      />
                    <Route element={<RequireAdmin />}>
                            <Route
                                path={ROUTES.adminUsers}
                                element={<AdminUsersPage />}
    />
                      </Route>
                  </Route>
              </Route>
          </Route>
      </Routes>
    </BrowserRouter>
    )
}
