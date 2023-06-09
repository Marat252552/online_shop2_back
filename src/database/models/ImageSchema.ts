import { Schema } from "mongoose";


const ImageSchema = new Schema({
    key: {type: String, required: true, unique: true},
    file_name: {type: String, required: true, unique: true},
    link: {type: String, required: true, unique: true},
})

export default ImageSchema