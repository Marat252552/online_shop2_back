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
const BrandModel_1 = __importDefault(require("../../../database/models/BrandModel"));
const ItemModel_1 = __importDefault(require("../../../database/models/ItemModel"));
const FileModel_1 = __importDefault(require("../../../database/models/FileModel"));
const Actions_1 = require("../../../yandex_files/Actions");
class Controller {
    createBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, session_id, main_img_UID } = req.body;
                if (!name || !session_id || !main_img_UID) {
                    return res.sendStatus(400).end();
                }
                let file = yield FileModel_1.default.findOne({ session_id });
                if (!file)
                    return res.sendStatus(500);
                let { file_name } = file;
                let { Location, key } = yield (0, Actions_1.CloudUpload)(file_name);
                let main_image = { link: Location, key, file_name };
                yield BrandModel_1.default.create({ name, main_image });
                res
                    .sendStatus(201);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getBrands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let brands = yield BrandModel_1.default.find();
                res.status(200).json({ brands });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    deleteBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.body;
                // Deleting brand
                let brand = yield BrandModel_1.default.findOneAndDelete({ _id });
                if (!brand)
                    return res.status(400).json({ message: 'Производитель с указанным _id не найден' });
                // Deleting main_image from Cloud
                yield (0, Actions_1.CloudDelete)(brand.main_image.key);
                // Deleting all items of this brand
                yield ItemModel_1.default.deleteMany({ brand_id: brand._id });
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
