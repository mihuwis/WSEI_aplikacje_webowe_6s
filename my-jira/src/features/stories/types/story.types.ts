export interface Story {
    id: string,
    nazwa: string,
    opis: string,
    priority: Priority,
    projekt: string,
    dateOfCreation: string,
    stan: Status,
    owner: string,
}

export type Priority =
    |"high"
    |"medium"
    |"low";


export type Status =
    |"pending"
    |"in progress"
    |"resolved";