import type { UserRole} from "./user.types"

export interface UserProfile{
    uid: string,
    email: string,
    displayName: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    isBlocked: boolean,
    createdAt: string,
    updatedAt: string
}

