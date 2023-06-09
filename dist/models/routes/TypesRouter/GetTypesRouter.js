"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ManagerAccessCheck_1 = __importDefault(require("../../middlewares/ManagerAccessCheck"));
const Controller_1 = __importDefault(require("./Controller"));
const GetTypesRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/', ManagerAccessCheck_1.default, Controller_1.default.createType);
    router.get('/', Controller_1.default.getTypes);
    router.delete('/', Controller_1.default.deleteType);
    return router;
};
exports.default = GetTypesRouter;
