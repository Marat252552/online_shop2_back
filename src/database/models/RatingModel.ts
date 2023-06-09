import { Schema, model } from "mongoose";

const Rating = new Schema({
    item_id: {type: String, required: true},
    user_id: {type: String, required: true},
    value: {type: Number, required: true}
})

const RatingModel = model('rating', Rating)

export default RatingModel