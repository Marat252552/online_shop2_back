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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemModel_1 = __importDefault(require("../../../database/models/ItemModel"));
const RatingModel_1 = __importDefault(require("../../../database/models/RatingModel"));
const FileModel_1 = __importDefault(require("../../../database/models/FileModel"));
const CartItem_1 = __importDefault(require("../../../database/models/CartItem"));
const FavoriteItemModel_1 = __importDefault(require("../../../database/models/FavoriteItemModel"));
const Actions_1 = require("../../../yandex_files/Actions");
class Controller {
    createItem(req, res) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { brand_id, name, description, price, type_id, mainFileUID, imagesUIDs } = req.body.payload;
                let { session_id } = req.body;
                if (!brand_id || !name || !description || !price || !type_id) {
                    return res.status(400).json({ message: 'Не все поля заполнены' });
                }
                let item = yield ItemModel_1.default.findOne({ name });
                if (item) {
                    return res.status(400).json({ message: 'Название уже используется' });
                }
                let files = yield FileModel_1.default.find({ session_id });
                let images = [];
                try {
                    for (var _d = true, files_1 = __asyncValues(files), files_1_1; files_1_1 = yield files_1.next(), _a = files_1_1.done, !_a;) {
                        _c = files_1_1.value;
                        _d = false;
                        try {
                            const file = _c;
                            let { file_name, uid } = file;
                            // checking whether this image is in imagesUIDs provided by client (client may delete file but it will not be deleted from DB)
                            if (imagesUIDs.find(el => el === uid)) {
                                let { key, Location } = yield (0, Actions_1.CloudUpload)(file_name);
                                let image = { key, link: Location, file_name };
                                images.push(image);
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = files_1.return)) yield _b.call(files_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                let main_file = yield FileModel_1.default.findOne({ uid: mainFileUID });
                if (!main_file) {
                    return res.sendStatus(400);
                }
                let { key, Location } = yield (0, Actions_1.CloudUpload)(main_file.file_name);
                let main_image = { key, link: Location, file_name: main_file.file_name };
                yield ItemModel_1.default.create({
                    brand_id,
                    name,
                    description,
                    price,
                    type_id,
                    main_image,
                    images
                });
                res.sendStatus(201);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let types = JSON.parse(req.query.types);
                let brands = JSON.parse(req.query.brands);
                let { searchValue } = req.query;
                console.log(searchValue);
                let items;
                if (!searchValue) {
                    if (types[0] && brands[0]) {
                        items = yield ItemModel_1.default.find({
                            brand_id: brands,
                            type_id: types
                        });
                    }
                    else if (types[0] && !brands[0]) {
                        items = yield ItemModel_1.default.find({
                            type_id: types
                        });
                    }
                    else if (!types[0] && brands[0]) {
                        items = yield ItemModel_1.default.find({
                            brand_id: brands
                        });
                    }
                    else {
                        items = yield ItemModel_1.default.find();
                    }
                }
                else {
                    if (types[0] && brands[0]) {
                        items = yield ItemModel_1.default.find({
                            brand_id: brands,
                            type_id: types,
                            name: { $regex: searchValue }
                        });
                    }
                    else if (types[0] && !brands[0]) {
                        items = yield ItemModel_1.default.find({
                            type_id: types,
                            name: { $regex: searchValue }
                        });
                    }
                    else if (!types[0] && brands[0]) {
                        items = yield ItemModel_1.default.find({
                            brand_id: brands,
                            name: { $regex: searchValue }
                        });
                    }
                    else {
                        items = yield ItemModel_1.default.find({ name: { $regex: searchValue } });
                    }
                }
                res.status(200).json({ items });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    deleteItem(req, res) {
        var _a, e_2, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.body;
                // item deleting
                let deleted_item = yield ItemModel_1.default.findOneAndDelete({ _id });
                if (!deleted_item)
                    return res.status(400).json({ message: 'Товар с указанным _id не найден' });
                try {
                    for (var _d = true, _e = __asyncValues(deleted_item.images), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                        _c = _f.value;
                        _d = false;
                        try {
                            const file = _c;
                            yield (0, Actions_1.DeleteFile)(file.key);
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                yield (0, Actions_1.DeleteFile)(deleted_item.main_image.key);
                yield RatingModel_1.default.deleteMany({ item_id: _id });
                yield FavoriteItemModel_1.default.deleteMany({ item_id: _id });
                yield CartItem_1.default.deleteMany({ item_id: _id });
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    addRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { item_id, value } = req.body;
                let { _id } = req.tokenPayload;
                let existingRating = yield RatingModel_1.default.findOneAndUpdate({ item_id, user_id: _id }, { item_id, user_id: _id, value });
                if (!existingRating) {
                    yield RatingModel_1.default.create({ item_id, user_id: _id, value });
                }
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getItemRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { item_id } = req.query;
                let AllItemRatings = yield RatingModel_1.default.find({ item_id });
                let RatingsSum = 0;
                AllItemRatings.forEach(rating => {
                    RatingsSum += rating.value;
                });
                let RatingsAverage = RatingsSum / AllItemRatings.length;
                res.status(200).json({ rating: RatingsAverage, amount: AllItemRatings.length });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id } = req.params;
                let item = yield ItemModel_1.default.findOne({ _id });
                res.status(200).json({ item });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    getThreeBestItems(req, res) {
        var _a, e_3, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let items = yield ItemModel_1.default.find();
                let TopOfItems = [];
                try {
                    for (var _d = true, items_1 = __asyncValues(items), items_1_1; items_1_1 = yield items_1.next(), _a = items_1_1.done, !_a;) {
                        _c = items_1_1.value;
                        _d = false;
                        try {
                            const item = _c;
                            let AllItemRatings = yield RatingModel_1.default.find({ item_id: item._id });
                            if (!AllItemRatings || !AllItemRatings[0])
                                return;
                            let RatingsSum = 0;
                            AllItemRatings.forEach(rating => {
                                RatingsSum += rating.value;
                            });
                            let RatingsAverage = RatingsSum / AllItemRatings.length;
                            TopOfItems.push({ item, rating: RatingsAverage });
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = items_1.return)) yield _b.call(items_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                let SortedItems = TopOfItems.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    return 0;
                });
                res.status(200).json({
                    items: {
                        item1: SortedItems[0],
                        item2: SortedItems[1],
                        item3: SortedItems[2]
                    }
                });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.default = new Controller();
