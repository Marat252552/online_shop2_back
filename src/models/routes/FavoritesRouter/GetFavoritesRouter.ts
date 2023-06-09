import { Router } from "express"
import UserAccessCheck from "../../middlewares/UserAccessCheck"
import Controller from "./Controller"



const GetFavoritesRouter = () => {
    const router = Router()
    router.post('/:item_id', UserAccessCheck, Controller.addFavorite)
    router.delete('/:favorite_item_id', UserAccessCheck, Controller.removeFavorite)
    router.get('/', UserAccessCheck, Controller.getFavorites)
    return router
}

export default GetFavoritesRouter