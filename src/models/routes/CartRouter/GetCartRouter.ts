import { Router } from "express"
import UserAccessCheck from "../../middlewares/UserAccessCheck"
import Controller from "./Controller"


const GetCartRouter = () => {
    const router = Router()
    router.post('/', UserAccessCheck, Controller.addItemToCart)
    router.get('/', UserAccessCheck, Controller.getCartItems)
    router.get('/:item_id', UserAccessCheck, Controller.getCartItemAmount)
    router.delete('/:item_id', UserAccessCheck, Controller.removeItemFromCart)
    router.delete('/remove_all_same/:item_id', UserAccessCheck, Controller.removeAllSameItemsFromCart)
    router.post('/:item_id', UserAccessCheck, Controller.addItemToCart)
    return router
}

export default GetCartRouter