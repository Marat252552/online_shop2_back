import { Schema, model } from "mongoose";


const File = new Schema({
    file_name: {type: String, unique: true, required: true},
    session_id: {type: String, required: true},
    exp_timestamp: {type: Number, required: true},
    uid: {type: String, required: true},
})

const FileModel = model('file', File)

export default FileModel