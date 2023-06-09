import { TokenPayload_T } from "../../shared/types"

export type AddItemToCartReq_T = {
    params: {
        item_id: string
    },
    tokenPayload: TokenPayload_T
}

export type RemoveItemFromCartReq_T = {
    params: {
        item_id: string
    },
    tokenPayload: TokenPayload_T
}

export type RemoveALlSameItemsFromCartReq_T = {
    params: {
        item_id: string
    },
    tokenPayload: TokenPayload_T
}

export type GetCartItemsReq_T = {
    tokenPayload: TokenPayload_T
}

export type GetCartItemAmount_T = {
    params: {
        item_id: string
    },
    tokenPayload: TokenPayload_T
}