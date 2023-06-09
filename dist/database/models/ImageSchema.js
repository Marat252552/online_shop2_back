"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    key: { type: String, required: true, unique: true },
    file_name: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
});
exports.default = ImageSchema;
