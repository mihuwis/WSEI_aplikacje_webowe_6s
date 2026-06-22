export type TaskPriority =
    |"high"
    |"medium"
    |"low";

export type TaskStatus =
    |"todo"
    |"doing"
    |"done";

export type TaskOperationResult =
    | {
        success: true;
        task: Task;
        }
    | {
        success: false;
        reason: TaskErrorReason;
        };

export type TaskErrorReason =
    | "task-not-found"
    | "story-not-found"
    | "user-not-found"
    | "user-not-assigned"
    | "user-role-not-allowed"
    | "invalid-title"
    | "invalid-description"
    | "invalid-estimated-hours"
    | "no-fields-to-update";
export interface Task {
    id: string,
    title: string,
    description: string,
    priority: TaskPriority,

    storyId: string,

    estimatedHours?: number
    workedHours?: number;

    status: TaskStatus,

    assignedUserId?: string,

    createdAt: string,
    startedAt?: string,
    completedAt?: string

}

export interface CreateTaskDto {
    title: string,
    description: string,
    priority: TaskPriority,
    estimatedHours?: number
}

export interface UpdateTaskDto {
    title?: string,
    description?: string,
    priority?: TaskPriority,
    estimatedHours?: number,
    workedHours?: number
}
