import { Router } from "express"
import Controller from "./Controller"
import ManagerAccessCheck from "../../middlewares/ManagerAccessCheck"


const GetBrandsRouter = () => {
    const router = Router()

    router.post('/', ManagerAccessCheck, Controller.createBrand)
    router.get('/', Controller.getBrands)
    router.delete('/', ManagerAccessCheck, Controller.deleteBrand)

    return router
}

export default GetBrandsRouter