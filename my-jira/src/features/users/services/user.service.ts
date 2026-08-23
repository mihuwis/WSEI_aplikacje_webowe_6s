import type { User } from "../types/user.types";

const MOCK_USER_1_ADMIN: User = {
    uid:"123", firstName:"Jan", lastName:"Nowak", role: "admin"
}
const MOCK_USER_2_ADMIN: User = {
    uid:"125", firstName:"Sybilla", lastName:"Kociupko", role: "admin"
}
const MOCK_USER_3_DEVOPS: User = {
    uid:"127", firstName:"Greg", lastName:"Kociupko", role: "devops"
}
const MOCK_USER_4_DEVELOPER: User = {
    uid:"129", firstName:"Mat", lastName:"Bed", role: "developer"
}

const LIST_OF_MOCK_USERS : User[] =
    [MOCK_USER_1_ADMIN, MOCK_USER_2_ADMIN, MOCK_USER_3_DEVOPS, MOCK_USER_4_DEVELOPER]


const getCurrentUser = () : User => {
    return MOCK_USER_2_ADMIN;
}

export const getAllUsers = () : User[] => {
    return LIST_OF_MOCK_USERS;
}

export const userService = {getCurrentUser, getAllUsers}