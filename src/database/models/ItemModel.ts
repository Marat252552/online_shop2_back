import { Schema, model } from 'mongoose'
import ImageSchema from './ImageSchema'


const Item = new Schema({
    name: { type: String, unique: true, required: true },
    main_image: { type: ImageSchema, unique: true, required: true },
    images: [ImageSchema],
    description: { type: String, default: '' },
    brand_id: { type: String, required: true },
    type_id: { type: String, required: true },
    price: { type: Number, required: true },
})

const ItemModel = model('item', Item)

export default ItemModel