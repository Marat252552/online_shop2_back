"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Type = new mongoose_1.Schema({
    name: { type: String, unique: true },
});
const TypeModel = (0, mongoose_1.model)('type', Type);
exports.default = TypeModel;
