export const ROUTES = {
  home: "/",
  projects: "/projects",
  projectDetails: "/projects/:projectId",
  storyBoard: "/projects/:projectId/stories",
  storyDetails: "/projects/:projectId/stories/:storyId",
  taskDetails: "/projects/:projectId/tasks/:taskId",
  addTask: "/projects/:projectId/tasks/new",
  notFound: "*",
} as const;