import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectsPage } from '../../features/projects/pages/ProjectsPage';
import { ProjectDetailsPage } from '../../features/projects/pages/ProjectDetailsPage';
import { StoryDetailsPage } from '../../features/stories/pages/StoryDetailsPage';
import { ROUTES } from './routes.constants';
import { AddTaskPage } from '../../features/tasks/pages/AddTaskPage';
import { AppLayout } from '../layout/AppLayout';
import { TaskDetailsPage } from '../../features/tasks/pages/TaskDetailsPage';
import { StoryBoardPage } from '../../features/stories/pages/StoryBoardPage';


export function AppRouter() {
    return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.home} element={<Navigate to={ROUTES.projects} replace />}/>
          <Route path={ROUTES.projects} element={<ProjectsPage />} />
          <Route path={ROUTES.storyBoard} element={<StoryBoardPage />} />
          <Route path={ROUTES.projectDetails} element={<ProjectDetailsPage />} />
          <Route path={ROUTES.storyDetails} element={<StoryDetailsPage />}/>
          <Route path={ROUTES.taskDetails} element={<TaskDetailsPage />}/>
          <Route path={ROUTES.addTask} element={<AddTaskPage />}/>
          <Route path={ROUTES.storyDetails} element={<StoryDetailsPage />}/>
        </Routes>
      </AppLayout>
    </BrowserRouter>
    )
}
