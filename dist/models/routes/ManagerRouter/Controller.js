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
const uuid_1 = require("uuid");
class Controller {
    createBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name } = req.body;
                let { img } = req.files;
                if (!name || !img) {
                    return res.sendStatus(400).end();
                }
                let imgName = (0, uuid_1.v4)() + '.jpg';
                yield BrandModel_1.default.create();
                img.mv(path.resolve(__dirname, './../../', 'static', imgName));
                res
                    .json({ brand })
                    .status(201)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
