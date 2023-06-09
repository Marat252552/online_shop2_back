import { Schema, model } from "mongoose";


const FavoriteItem = new Schema({
    item_id: {type: String, required: true},
    user_id: {type: String, required: true}
})

const FavoriteItemModel = model('favorite_item', FavoriteItem)

export default FavoriteItemModel