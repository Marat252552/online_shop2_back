import { Schema, model } from "mongoose";


const CartItem = new Schema({
    user_id: {type: String, required: true},
    item_id: {type: String, required: true},
    amount: {type: Number, required: true}
})

const CartItemModel = model('cart_item', CartItem)

export default CartItemModel