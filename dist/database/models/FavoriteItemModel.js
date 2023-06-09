"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FavoriteItem = new mongoose_1.Schema({
    item_id: { type: String, required: true },
    user_id: { type: String, required: true }
});
const FavoriteItemModel = (0, mongoose_1.model)('favorite_item', FavoriteItem);
exports.default = FavoriteItemModel;
