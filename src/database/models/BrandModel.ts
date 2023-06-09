import {Schema, model} from 'mongoose' 
import ImageSchema from './ImageSchema'



const Brand = new Schema({
    name: {type: String, unique: true},
    main_image: {type: ImageSchema, unique: true, required: true}
})

const BrandModel = model('brand', Brand)

export default BrandModel