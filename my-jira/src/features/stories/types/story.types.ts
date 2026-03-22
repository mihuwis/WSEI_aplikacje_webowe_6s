export interface Story {
    id: string,
    name: string,
    description: string,
    priority: Priority,
    projektId: string,
    createdAt: string,
    status: Status,
    ownerId: string,
}

export type Priority =
    |"high"
    |"medium"
    |"low";


export type Status =
    |"pending"
    |"in progress"
    |"resolved";