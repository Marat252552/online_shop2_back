import { Router } from "express"
import ManagerAccessCheck from "../../middlewares/ManagerAccessCheck"
import Controller from "./Controller"
import UserAccessCheck from "../../middlewares/UserAccessCheck"


const GetItemsRouter = () => {
    let router = Router()
    router.post('/', ManagerAccessCheck, Controller.createItem)
    router.get('/', Controller.getItems)
    router.get('/item/:_id', Controller.getItem)
    router.get('/rating/threebestitems', Controller.getThreeBestItems)
    router.get('/rating', Controller.getItemRating)
    router.post('/rating', UserAccessCheck, Controller.addRating)
    
    router.delete('/', Controller.deleteItem)
    return router
}

export default GetItemsRouter