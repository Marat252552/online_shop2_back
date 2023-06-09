"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const File = new mongoose_1.Schema({
    file_name: { type: String, unique: true, required: true },
    session_id: { type: String, required: true },
    exp_timestamp: { type: Number, required: true },
    uid: { type: String, required: true },
});
const FileModel = (0, mongoose_1.model)('file', File);
exports.default = FileModel;
