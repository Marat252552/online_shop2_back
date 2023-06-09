import BrandModel from "../../../database/models/BrandModel"
import { CreateBrandReq_T, DeleteBrandReq_T } from "./types"
import ItemModel from "../../../database/models/ItemModel"
import { UploadFile_T } from "../../../shared/types"
import FileModel from "../../../database/models/FileModel"
import { CloudDelete, CloudUpload } from "../../../yandex_files/Actions"


class Controller {
    async createBrand(req: CreateBrandReq_T, res: any) {
        try {
            let { name, session_id, main_img_UID } = req.body
            if (!name || !session_id || !main_img_UID) {
                return res.sendStatus(400).end()
            }

            let file = await FileModel.findOne({session_id})
            if(!file) return res.sendStatus(500)
            let {file_name} = file

            let {Location, key}: UploadFile_T = await CloudUpload(file_name)
            let main_image = {link: Location, key, file_name}

            await BrandModel.create({ name, main_image })

            res
                .sendStatus(201)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getBrands(req: any, res: any) {
        try {
            let brands = await BrandModel.find()

            res.status(200).json({ brands })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async deleteBrand(req: DeleteBrandReq_T, res: any) {
        try {
            let { _id } = req.body

            // Deleting brand
            let brand = await BrandModel.findOneAndDelete({_id})
            if(!brand) return res.status(400).json({message: 'Производитель с указанным _id не найден'})

            // Deleting main_image from Cloud
            await CloudDelete(brand.main_image.key)

            // Deleting all items of this brand
            await ItemModel.deleteMany({brand_id: brand._id})

            res.sendStatus(200)

        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()