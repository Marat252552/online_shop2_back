export enum Statuses {
    user = 'USER',
    manager = 'MANAGER',
    admin = 'ADMIN'
}

export type User_T = {
    _id: string,
    login: string,
    password: string,
    status: Statuses
}

export type UserRD_T = {
    _id: string,
    login: string,
    status: string
}

export type TokenPayload_T = {
    _id: string,
    login: string,
    status: string
}

export type Item_T = {
    _id: string,
    name: string,
    img_name: string,
    brand_id: string,
    type_id: string,
    price: number,
    description: string
}

export type Rating_T = {
    _id: string,
    value: number,
    user_id: string,
    item_id: string
}

export type CartItem_T = {
    _id: string,
    user_id: string,
    item_id: string,
    amount: number
}