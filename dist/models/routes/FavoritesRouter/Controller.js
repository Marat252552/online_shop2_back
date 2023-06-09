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
const FavoriteItemModel_1 = __importDefault(require("../../../database/models/FavoriteItemModel"));
const ItemModel_1 = __importDefault(require("../../../database/models/ItemModel"));
const UserModel_1 = __importDefault(require("../../../database/models/UserModel"));
class Controller {
    addFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = req.tokenPayload._id;
                let { item_id } = req.params;
                let user = yield UserModel_1.default.findOne({ _id: user_id });
                let item = yield ItemModel_1.default.findOne({ _id: item_id });
                if (!user || !item) {
                    return res.status(400).json({ message: 'Некорректные данные' });
                }
                yield FavoriteItemModel_1.default.create({
                    user_id, item_id
                });
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    removeFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = req.tokenPayload._id;
                let { favorite_item_id } = req.params;
                yield FavoriteItemModel_1.default.deleteOne({
                    _id: favorite_item_id, user_id
                });
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = req.tokenPayload._id;
                let favorite_items = yield FavoriteItemModel_1.default.find({ user_id });
                res.status(200).json({ favorite_items });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = req.tokenPayload._id;
                let favorite_items = yield FavoriteItemModel_1.default.find({ user_id });
                res.status(200).json({ favorite_items });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
