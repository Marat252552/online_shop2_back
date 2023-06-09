"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const GetAuthRouter_1 = __importDefault(require("./models/routes/AuthRouter/GetAuthRouter"));
const GetAdminRouter_1 = __importDefault(require("./models/routes/AdminRouter/GetAdminRouter"));
const GetManagerRouter_1 = __importDefault(require("./models/routes/BrandsRouter/GetManagerRouter"));
const GetTypesRouter_1 = __importDefault(require("./models/routes/TypesRouter/GetTypesRouter"));
const GetItemsRouter_1 = __importDefault(require("./models/routes/ItemsRouter/GetItemsRouter"));
const GetFilesRouter_1 = __importDefault(require("./models/routes/FilesRouter/GetFilesRouter"));
const OperativeFilesChecker_1 = __importDefault(require("./OperativeFilesChecker"));
const GetCartRouter_1 = __importDefault(require("./models/routes/CartRouter/GetCartRouter"));
const GetFavoritesRouter_1 = __importDefault(require("./models/routes/FavoritesRouter/GetFavoritesRouter"));
exports.app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
exports.corsOptions = {
    origin: ['http://localhost:5173', 'https://online-shop-front.onrender.com', 'https://marat252552.github.io/todolist_front', 'https://marat252552.github.io', 'https://todolist-front2.onrender.com'],
    credentials: true,
    optionSuccessStatus: 200
};
exports.app.use(body_parser_1.default.urlencoded({
    extended: true
}));
exports.app.use(jsonBodyMiddleware);
exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
exports.app.use((0, cors_1.default)(exports.corsOptions));
exports.app.use((0, express_fileupload_1.default)({}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
const AuthRouter = (0, GetAuthRouter_1.default)();
const AdminRouter = (0, GetAdminRouter_1.default)();
const BrandsRouter = (0, GetManagerRouter_1.default)();
const TypesRouter = (0, GetTypesRouter_1.default)();
const ItemsRouter = (0, GetItemsRouter_1.default)();
const FilesRouter = (0, GetFilesRouter_1.default)();
const CartRouter = (0, GetCartRouter_1.default)();
const FavoritesRouter = (0, GetFavoritesRouter_1.default)();
exports.app.use('/auth', AuthRouter);
exports.app.use('/admin', AdminRouter);
exports.app.use('/brands', BrandsRouter);
exports.app.use('/types', TypesRouter);
exports.app.use('/items', ItemsRouter);
exports.app.use('/files', FilesRouter);
exports.app.use('/cart', CartRouter);
exports.app.use('/favorites', FavoritesRouter);
(0, OperativeFilesChecker_1.default)();
