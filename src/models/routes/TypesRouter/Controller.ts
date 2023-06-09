import ItemModel from "../../../database/models/ItemModel"
import TypeModel from "../../../database/models/TypeModel"
import { CreateTypeReq_T, DeleteTypeReq_T } from "./types"



class Controller {
    async createType(req: CreateTypeReq_T, res: any) {
        try {
            const {name} = req.body

            await TypeModel.create({name})

            res.sendStatus(201)
        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getTypes(req: any, res: any) {
        try {
            let types = await TypeModel.find()
            
            res.status(200).json({types})
        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async deleteType(req: DeleteTypeReq_T, res: any) {
        try {
            let {_id} = req.body

            let deleted_type = await TypeModel.findOneAndDelete({_id})
            if(!deleted_type) return res.status(400).json({message: 'Категория с указанным _id не найдена'})

            // Deleting all items of this brand
            await ItemModel.deleteMany({type_id: deleted_type._id})

            res.sendStatus(200)
        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()