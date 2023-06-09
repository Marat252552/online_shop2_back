export type CreateBrandReq_T = {
    body: {
        name: string,
        session_id: string,
        main_img_UID: string
    }
}

export type DeleteBrandReq_T = {
    body: {
        _id: string
    }
}