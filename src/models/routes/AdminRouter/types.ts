import { Statuses } from "../../shared/types"

export type DeleteUserReq_T = {
    query: {
        _id: string
    }
}

export type GrantAccessReq_T = {
    body: {
        _id: string
    }
}

export type GetUsersReq_T = {
    query: {
        statuses: string
    }
}