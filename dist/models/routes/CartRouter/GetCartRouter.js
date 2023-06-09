"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAccessCheck_1 = __importDefault(require("../../middlewares/UserAccessCheck"));
const Controller_1 = __importDefault(require("./Controller"));
const GetCartRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/', UserAccessCheck_1.default, Controller_1.default.addItemToCart);
    router.get('/', UserAccessCheck_1.default, Controller_1.default.getCartItems);
    router.get('/:item_id', UserAccessCheck_1.default, Controller_1.default.getCartItemAmount);
    router.delete('/:item_id', UserAccessCheck_1.default, Controller_1.default.removeItemFromCart);
    router.delete('/remove_all_same/:item_id', UserAccessCheck_1.default, Controller_1.default.removeAllSameItemsFromCart);
    router.post('/:item_id', UserAccessCheck_1.default, Controller_1.default.addItemToCart);
    return router;
};
exports.default = GetCartRouter;
