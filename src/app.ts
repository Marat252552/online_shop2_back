import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import GetAuthRouter from './models/routes/AuthRouter/GetAuthRouter'
import GetAdminRouter from './models/routes/AdminRouter/GetAdminRouter'
import GetBrandsRouter from './models/routes/BrandsRouter/GetManagerRouter'
import GetTypesRouter from './models/routes/TypesRouter/GetTypesRouter'
import GetItemsRouter from './models/routes/ItemsRouter/GetItemsRouter'
import GetFilesRouter from './models/routes/FilesRouter/GetFilesRouter'
import OperativeFilesChecker from './OperativeFilesChecker'
import GetCartRouter from './models/routes/CartRouter/GetCartRouter'
import GetFavoritesRouter from './models/routes/FavoritesRouter/GetFavoritesRouter'

export const app = express()

const jsonBodyMiddleware = express.json()
export const corsOptions = 
{
    origin:['http://localhost:5173', 'https://online-shop-front.onrender.com', 'https://marat252552.github.io/todolist_front', 'https://marat252552.github.io', 'https://todolist-front2.onrender.com'],
    credentials:true,
    optionSuccessStatus:200
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(jsonBodyMiddleware)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors(corsOptions))
app.use(fileUpload({}))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))

const AuthRouter = GetAuthRouter()
const AdminRouter = GetAdminRouter()
const BrandsRouter = GetBrandsRouter()
const TypesRouter = GetTypesRouter()
const ItemsRouter = GetItemsRouter()
const FilesRouter = GetFilesRouter()
const CartRouter = GetCartRouter()
const FavoritesRouter = GetFavoritesRouter()

app.use('/auth', AuthRouter)
app.use('/admin', AdminRouter)
app.use('/brands', BrandsRouter)
app.use('/types', TypesRouter)
app.use('/items', ItemsRouter)
app.use('/files', FilesRouter)
app.use('/cart', CartRouter)
app.use('/favorites', FavoritesRouter)

OperativeFilesChecker()