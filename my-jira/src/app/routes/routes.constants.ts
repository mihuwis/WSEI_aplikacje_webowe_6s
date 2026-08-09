export const ROUTES = {
  home: "/",
  projects: "/projects",
  projectDetails: "/projects/:projectId",
  storyDetails: "/projects/:projectId/stories/:storyId",
  taskDetails: "/projects/:projectId/tasks/:taskId",
  addTask: "/projects/:projectId/tasks/new",
  projectBoard: "/projects/:projectId/board",
  notFound: "*",
} as const;