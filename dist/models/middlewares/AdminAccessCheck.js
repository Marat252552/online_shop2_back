"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../shared/types");
const AdminAccessCheck = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
        const token = req.headers.authorization.split(' ')[1];
        let DecodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_KEY);
        if (DecodedToken.status !== types_1.Statuses.admin) {
            return res.sendStatus(403);
        }
        req.DecodedToken = DecodedToken;
        next();
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};
exports.default = AdminAccessCheck;
