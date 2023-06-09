"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartItem_1 = __importDefault(require("../../../database/models/CartItem"));
const FavoriteItemModel_1 = __importDefault(require("../../../database/models/FavoriteItemModel"));
const UserModel_1 = __importDefault(require("../../../database/models/UserModel"));
const types_1 = require("../../shared/types");
class Controller {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let statuses = JSON.parse(req.query.statuses);
                console.log(statuses);
                let users;
                if (statuses[0]) {
                    users = yield UserModel_1.default.find({ status: statuses });
                }
                else {
                    users = yield UserModel_1.default.find();
                }
                res.status(200).json({ users });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.query;
                let user = yield UserModel_1.default.findOne({ _id });
                if (!user || user.status === types_1.Statuses.admin) {
                    return res.sendStatus(400);
                }
                // user deleting
                yield UserModel_1.default.deleteOne({ _id });
                // deleting all cart items
                yield CartItem_1.default.deleteMany({ user_id: _id });
                // deleting all favorites items
                yield FavoriteItemModel_1.default.deleteMany({ user_id: _id });
                res.status(200).json({ _id });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    grantAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.body;
                yield UserModel_1.default.updateOne({ _id, status: types_1.Statuses.user }, { status: types_1.Statuses.manager });
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    lowerAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.body;
                yield UserModel_1.default.updateOne({ _id, status: types_1.Statuses.manager }, { status: types_1.Statuses.user });
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
