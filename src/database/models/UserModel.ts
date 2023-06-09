import {Schema, model} from 'mongoose' 


const User = new Schema({
    login: {type: String, unique: true},
    password: {type: String},
    status: {type: String, default: 'USER'}
})

const UserModel = model('user', User)

export default UserModel