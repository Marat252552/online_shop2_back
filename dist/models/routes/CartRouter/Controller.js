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
class Controller {
    addItemToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                let { item_id } = req.params;
                let { _id } = req.tokenPayload;
                let cartItem = yield CartItem_1.default.findOne({ item_id, user_id: _id });
                if (!cartItem) {
                    yield CartItem_1.default.create({ item_id, user_id: _id, amount: 1 });
                }
                else {
                    yield CartItem_1.default.updateOne({ item_id, user_id: _id }, { amount: cartItem.amount + 1 });
                }
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    removeItemFromCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { item_id } = req.params;
                let { _id } = req.tokenPayload;
                let cartItem = yield CartItem_1.default.findOne({ item_id, user_id: _id });
                if (!cartItem) {
                    return res.sendStatus(400);
                }
                else {
                    if (cartItem.amount === 1) {
                        yield CartItem_1.default.deleteOne({ item_id, user_id: _id });
                    }
                    else {
                        yield CartItem_1.default.updateOne({ item_id, user_id: _id }, { amount: cartItem.amount - 1 });
                    }
                }
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    removeAllSameItemsFromCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { item_id } = req.params;
                let { _id } = req.tokenPayload;
                let cartItem = yield CartItem_1.default.findOne({ item_id, user_id: _id });
                if (!cartItem) {
                    return res.sendStatus(400);
                }
                else {
                    yield CartItem_1.default.deleteOne({ item_id, user_id: _id });
                }
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getCartItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.tokenPayload;
                let cart_items = yield CartItem_1.default.find({ user_id: _id });
                res.status(200).json({ cart_items });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getCartItemAmount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.tokenPayload;
                let { item_id } = req.params;
                let cart_item = yield CartItem_1.default.findOne({ user_id: _id, item_id });
                if (!cart_item) {
                    res.status(200).json({ amount: 0 });
                }
                else {
                    res.status(200).json({ amount: cart_item.amount });
                }
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getCartInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
