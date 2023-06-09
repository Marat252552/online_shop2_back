"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema_1 = __importDefault(require("./ImageSchema"));
const Item = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    main_image: { type: ImageSchema_1.default, unique: true, required: true },
    images: [ImageSchema_1.default],
    description: { type: String, default: '' },
    brand_id: { type: String, required: true },
    type_id: { type: String, required: true },
    price: { type: Number, required: true },
});
const ItemModel = (0, mongoose_1.model)('item', Item);
exports.default = ItemModel;
