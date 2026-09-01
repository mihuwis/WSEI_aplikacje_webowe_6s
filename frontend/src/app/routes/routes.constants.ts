export const ROUTES = {
  home: "/",
  projects: "/projects",
  projectDetails: "/projects/:projectId",
  addProject: "/projects/new",
  storyBoard: "/projects/:projectId/stories",
  storyDetails: "/projects/:projectId/stories/:storyId",
  taskDetails: "/projects/:projectId/tasks/:taskId",
  addTask: "/projects/:projectId/tasks/new",
  adminUsers: "/admin/users",
  login: "/login",
  accountStatus: "/account-status",
  notFound: "*",
} as const;