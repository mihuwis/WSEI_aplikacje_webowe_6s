export type TaskPriority =
    |"high"
    |"medium"
    |"low";

export type TaskStatus =
    |"todo"
    |"doing"
    |"done";


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
    priority: TaskPriority
}

export interface UpdateTaskDto {
    title: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus,
    estimatedHours?: number,
    workedHours?: number,
    assignedUserId?: string,
    createdAt: string,
    completedAt?: string
}