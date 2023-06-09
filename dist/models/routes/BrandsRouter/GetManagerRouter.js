"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./Controller"));
const ManagerAccessCheck_1 = __importDefault(require("../../middlewares/ManagerAccessCheck"));
const GetBrandsRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/', ManagerAccessCheck_1.default, Controller_1.default.createBrand);
    router.get('/', Controller_1.default.getBrands);
    router.delete('/', ManagerAccessCheck_1.default, Controller_1.default.deleteBrand);
    return router;
};
exports.default = GetBrandsRouter;
