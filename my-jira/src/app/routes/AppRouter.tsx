import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectsPage } from '../../features/projects/pages/ProjectsPage';
import { ProjectDetailsPage } from '../../features/projects/pages/ProjectDetailsPage';
import { StoryDetailsPage } from '../../features/stories/pages/StoryDetailsPage';
import { ROUTES } from './routes.constants';

import { AppLayout } from '../layout/AppLayout';
import { TaskDetailsPage } from '../../features/tasks/pages/TaskDetailsPage';

import { TasksBoardPage } from '../../features/tasks/pages/TasksBoardPage';
    

export function AppRouter() {
    return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.home} element={<Navigate to={ROUTES.projects} replace />}/>
          <Route path={ROUTES.projects} element={<ProjectsPage />} />
          <Route path={ROUTES.projectBoard} element={<TasksBoardPage />} />
          <Route path={ROUTES.projectDetails} element={<ProjectDetailsPage />} />
          <Route path={ROUTES.storyDetails} element={<StoryDetailsPage />}/>
          <Route path={ROUTES.taskDetails} element={<TaskDetailsPage />}/>
          <Route path={ROUTES.storyDetails} element={<StoryDetailsPage />}/>
        </Routes>
      </AppLayout>
    </BrowserRouter>
    )
}
