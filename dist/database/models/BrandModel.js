"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema_1 = __importDefault(require("./ImageSchema"));
const Brand = new mongoose_1.Schema({
    name: { type: String, unique: true },
    main_image: { type: ImageSchema_1.default, unique: true, required: true }
});
const BrandModel = (0, mongoose_1.model)('brand', Brand);
exports.default = BrandModel;
