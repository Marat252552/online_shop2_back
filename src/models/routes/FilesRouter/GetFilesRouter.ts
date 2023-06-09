import { Router } from "express"
import Controller from "./Controller"
import ManagerAccessCheck from "../../middlewares/ManagerAccessCheck"


const GetFilesRouter = () => {
    const router = Router()
    router.post('/', ManagerAccessCheck, Controller.uploadFile)
    return router
}

export default GetFilesRouter