import { Router } from "express"
import AdminAccessCheck from "../../middlewares/AdminAccessCheck"
import Controller from "./Controller"



const GetAdminRouter = () => {
    let router = Router()
    router.get('/users', AdminAccessCheck, Controller.getUsers)
    router.delete('/users', AdminAccessCheck, Controller.deleteUser)
    router.put('/access', AdminAccessCheck, Controller.grantAccess)
    router.delete('/access', AdminAccessCheck, Controller.lowerAccess)
    return router
}

export default GetAdminRouter