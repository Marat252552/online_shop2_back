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
const BrandModel_1 = __importDefault(require("../../database/models/BrandModel"));
const TypeModel_1 = __importDefault(require("../../database/models/TypeModel"));
const GetItemsRF = (items) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let brands = JSON.parse((yield BrandModel_1.default.find()).toLocaleString);
        let types = yield TypeModel_1.default.find();
        console.log(brands);
        let itemsRF = items.map(item => {
            var _a, _b;
            // @ts-ignore
            let brand_name = ((_a = brands.find(el => el._id === item.brand_id)) === null || _a === void 0 ? void 0 : _a.name) || '';
            // @ts-ignore
            let type_name = ((_b = types.find(el => el._id === item.type_id)) === null || _b === void 0 ? void 0 : _b.name) || '';
            return Object.assign(Object.assign({}, item), { brand_name,
                type_name });
        });
        resolve(itemsRF);
    }));
};
exports.default = GetItemsRF;
