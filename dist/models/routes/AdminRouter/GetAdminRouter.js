"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminAccessCheck_1 = __importDefault(require("../../middlewares/AdminAccessCheck"));
const Controller_1 = __importDefault(require("./Controller"));
const GetAdminRouter = () => {
    let router = (0, express_1.Router)();
    router.get('/users', AdminAccessCheck_1.default, Controller_1.default.getUsers);
    router.delete('/users', AdminAccessCheck_1.default, Controller_1.default.deleteUser);
    router.put('/access', AdminAccessCheck_1.default, Controller_1.default.grantAccess);
    router.delete('/access', AdminAccessCheck_1.default, Controller_1.default.lowerAccess);
    return router;
};
exports.default = GetAdminRouter;
