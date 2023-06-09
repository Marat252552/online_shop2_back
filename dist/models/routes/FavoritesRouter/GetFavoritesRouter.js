"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAccessCheck_1 = __importDefault(require("../../middlewares/UserAccessCheck"));
const Controller_1 = __importDefault(require("./Controller"));
const GetFavoritesRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/:item_id', UserAccessCheck_1.default, Controller_1.default.addFavorite);
    router.delete('/:favorite_item_id', UserAccessCheck_1.default, Controller_1.default.removeFavorite);
    router.get('/', UserAccessCheck_1.default, Controller_1.default.getFavorites);
    return router;
};
exports.default = GetFavoritesRouter;
