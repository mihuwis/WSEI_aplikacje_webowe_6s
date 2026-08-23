export interface User {
    uid: string,
    firstName: string,
    lastName: string,
    role: UserRole
}

export type UserRole = "admin" | "devops" | "developer" | "guest"