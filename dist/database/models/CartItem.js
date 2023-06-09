"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartItem = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    item_id: { type: String, required: true },
    amount: { type: Number, required: true }
});
const CartItemModel = (0, mongoose_1.model)('cart_item', CartItem);
exports.default = CartItemModel;
