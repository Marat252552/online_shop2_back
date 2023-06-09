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
exports.CloudDelete = exports.CloudUpload = void 0;
const path_1 = __importDefault(require("path"));
const YandexBucketInit_1 = __importDefault(require("./YandexBucketInit"));
let CloudUpload = (image_name) => __awaiter(void 0, void 0, void 0, function* () {
    let upload = yield YandexBucketInit_1.default.Upload({
        path: path_1.default.resolve(__dirname, './../', 'operative', image_name),
        save_name: true
    }, '/online_shop/');
    return upload;
});
exports.CloudUpload = CloudUpload;
let CloudDelete = (key) => {
    return YandexBucketInit_1.default.Remove(key);
};
exports.CloudDelete = CloudDelete;
