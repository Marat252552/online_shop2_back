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
const path_1 = __importDefault(require("path"));
const FileModel_1 = __importDefault(require("./database/models/FileModel"));
const fs_1 = __importDefault(require("fs"));
let TEN_MINUTES = 600000;
const OperativeFilesChecker = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let files = yield FileModel_1.default.find();
            if (!files)
                return;
            files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
                let { _id, exp_timestamp, file_name } = file;
                if (exp_timestamp <= Date.now()) {
                    yield FileModel_1.default.deleteOne({ _id });
                    fs_1.default.unlink(path_1.default.resolve(__dirname, './', 'operative', file_name), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Delete File successfully.");
                        }
                    });
                }
            }));
        }
        catch (e) {
            console.log(e);
        }
    }), TEN_MINUTES);
};
exports.default = OperativeFilesChecker;
