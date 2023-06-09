"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ManagerAccessCheck_1 = __importDefault(require("../../middlewares/ManagerAccessCheck"));
const Controller_1 = __importDefault(require("./Controller"));
const UserAccessCheck_1 = __importDefault(require("../../middlewares/UserAccessCheck"));
const GetItemsRouter = () => {
    let router = (0, express_1.Router)();
    router.post('/', ManagerAccessCheck_1.default, Controller_1.default.createItem);
    router.get('/', Controller_1.default.getItems);
    router.get('/item/:_id', Controller_1.default.getItem);
    router.get('/rating/threebestitems', Controller_1.default.getThreeBestItems);
    router.get('/rating', Controller_1.default.getItemRating);
    router.post('/rating', UserAccessCheck_1.default, Controller_1.default.addRating);
    router.delete('/', Controller_1.default.deleteItem);
    return router;
};
exports.default = GetItemsRouter;
