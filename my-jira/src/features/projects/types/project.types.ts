export interface Project {
    id: string,
    name: string,
    description: string
}

export interface CreateProjectDTO {
    name: string,
    description: string
}

export interface UpdateProjectDTO {
    name?: string,
    description?: string
}