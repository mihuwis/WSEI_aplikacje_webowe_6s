import type { User } from "../types/user.types";

const MOCK_USER_1: User = {
    id:"123", firstName:"Jan", lastName:"Nowak"
}
const MOCK_USER_2: User = {
    id:"125", firstName:"Sybilla", lastName:"Kociupko"
}

const LIST_OF_MOCK_USERS : User[] =
    [MOCK_USER_1, MOCK_USER_2]


const getCurrentUser = () : User => {
    return MOCK_USER_1;
}

const getAllUsers = () : User[] => {
    return LIST_OF_MOCK_USERS;
}

export const userService = {getCurrentUser}