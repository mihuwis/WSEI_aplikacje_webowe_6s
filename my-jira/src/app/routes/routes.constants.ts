export const ROUTES = {
  home: "/",
  projects: "/projects",
  projectDetails: "/projects/:projectId",
  storyDetails: "/projects/:projectId/stories/:storyId",
  taskDetails: "/projects/:projectId/stories/:storyId/tasks/:taskId",
  projectBoard: "/projects/:projectId/board",
  notFound: "*",
} as const;