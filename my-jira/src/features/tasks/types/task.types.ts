export type TaskPriority =
    |"high"
    |"medium"
    |"low";

export type TaskStatus =
    |"todo"
    |"doing"
    |"done";

export type TaskActionResult = 
    | {success : true; task: Task}
    | {
        success : false;
        reason: "task-not-found" | "user-not-assigned" | "story-not-found" | "user-role-not-allowed";
    }

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
