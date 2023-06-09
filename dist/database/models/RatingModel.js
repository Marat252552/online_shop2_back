"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Rating = new mongoose_1.Schema({
    item_id: { type: String, required: true },
    user_id: { type: String, required: true },
    value: { type: Number, required: true }
});
const RatingModel = (0, mongoose_1.model)('rating', Rating);
exports.default = RatingModel;
