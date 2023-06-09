import {Schema, model} from 'mongoose' 


const Type = new Schema({
    name: {type: String, unique: true},
})

const TypeModel = model('type', Type)

export default TypeModel