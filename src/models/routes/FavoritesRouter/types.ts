import { TokenPayload_T } from "../../shared/types"

export type AddFavoriteReq_T = {
    params: {
        item_id: string
    },
    tokenPayload: TokenPayload_T
}

export type RemoveFavoriteReq_T = {
    params: {
        favorite_item_id: string
    },
    tokenPayload: TokenPayload_T
}

export type GetFavoritesReq_T = {
    tokenPayload: TokenPayload_T
}