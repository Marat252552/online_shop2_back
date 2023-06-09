import { TokenPayload_T } from "../../shared/types"

export type CreateItemReq_T = {
    body: {
        payload: {
            name: string,
            brand_id: string,
            type_id: string,
            price: number,
            description: string,
            mainFileUID: string,
            imagesUIDs: string[]
        },
        session_id: string
    }
}

export type DeleteItemReq_T = {
    body: {
        _id: string
    }
}

export type GetItemsReq_T = {
    query: {
        types: string,
        brands: string,
        searchValue: string
    }
}

export type GetItemReq_T = {
    params: {
        _id: string
    }
}

export type AddRatingReq_T = {
    body: {
        value: number,
        item_id: number,
    },
    tokenPayload: TokenPayload_T
}

export type GetItemRatingReq_T = {
    query: {
        item_id: string
    }
}

