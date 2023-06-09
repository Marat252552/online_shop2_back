"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetManagerRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/brands');
    return router;
};
exports.default = GetManagerRouter;
