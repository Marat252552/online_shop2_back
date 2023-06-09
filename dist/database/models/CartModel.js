"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Cart = new mongoose_1.Schema({
    user_id: { type: String, unique: true, required: true }
});
const CartModel = (0, mongoose_1.model)('cart', Cart);
exports.default = CartModel;
