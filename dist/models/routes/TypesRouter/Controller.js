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
const ItemModel_1 = __importDefault(require("../../../database/models/ItemModel"));
const TypeModel_1 = __importDefault(require("../../../database/models/TypeModel"));
class Controller {
    createType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                yield TypeModel_1.default.create({ name });
                res.sendStatus(201);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let types = yield TypeModel_1.default.find();
                res.status(200).json({ types });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    deleteType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.body;
                let deleted_type = yield TypeModel_1.default.findOneAndDelete({ _id });
                if (!deleted_type)
                    return res.status(400).json({ message: 'Категория с указанным _id не найдена' });
                // Deleting all items of this brand
                yield ItemModel_1.default.deleteMany({ type_id: deleted_type._id });
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
