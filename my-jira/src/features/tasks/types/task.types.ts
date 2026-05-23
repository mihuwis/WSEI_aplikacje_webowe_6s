export type Priority =
    |"high"
    |"medium"
    |"low";

export type Status =
    |"todo"
    |"doing"
    |"done";



export interface Task {
    id: string,
    priority: Priority,
    storyId: string,
    estimatedTimeToComplete: string,
    status: Status,
    assignedUserId?: string,
    createdAt: string,
    startedAt: string,
    completedAt: string,
    reportedTo: string

}