export type Priority =
    |"high"
    |"medium"
    |"low";

export type Status =
    |"todo"
    |"doing"
    |"done";

export interface Story {
    id: string,
    name: string,
    description: string,
    priority: Priority,
    projectId: string,
    createdAt: string,
    status: Status,
    ownerId: string,
}

export interface CreateStoryDto {
    name: string,
    description: string,
    priority: Priority
}

export interface UpdateStoryDto {
    name?: string,
    description?: string,
    priority?: Priority,
    status?: Status
}