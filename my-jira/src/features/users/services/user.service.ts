import type { User } from "../types/user.types";

const MOCK_USER_1: User = {
    id:"123", firstName:"Jan", lastName:"Nowak"
}

const getCurrentUser = () : User => {
    return MOCK_USER_1;
}

export const userService = {getCurrentUser}