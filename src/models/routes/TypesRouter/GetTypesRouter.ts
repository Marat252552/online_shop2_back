import { Router } from "express"
import ManagerAccessCheck from "../../middlewares/ManagerAccessCheck"
import Controller from "./Controller"


const GetTypesRouter = () => {
    const router = Router()
    router.post('/', ManagerAccessCheck, Controller.createType)
    router.get('/', Controller.getTypes)
    router.delete('/', Controller.deleteType)
    return router
}

export default GetTypesRouter