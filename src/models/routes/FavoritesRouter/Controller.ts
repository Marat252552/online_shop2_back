import FavoriteItemModel from "../../../database/models/FavoriteItemModel"
import ItemModel from "../../../database/models/ItemModel"
import UserModel from "../../../database/models/UserModel"
import { AddFavoriteReq_T, GetFavoritesReq_T, RemoveFavoriteReq_T } from "./types"



class Controller {
    async addFavorite(req: AddFavoriteReq_T, res: any) {
        try {
            let user_id = req.tokenPayload._id
            let {item_id} = req.params

            let user = await UserModel.findOne({_id: user_id})
            let item = await ItemModel.findOne({_id: item_id})
            if(!user || !item) {
                return res.status(400).json({message: 'Некорректные данные'})
            }

            await FavoriteItemModel.create({
                user_id, item_id
            })

            res.sendStatus(200)

        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async removeFavorite(req: RemoveFavoriteReq_T, res: any) {
        try {
            let user_id = req.tokenPayload._id
            let {favorite_item_id} = req.params

            await FavoriteItemModel.deleteOne({
                _id: favorite_item_id, user_id
            })

            res.sendStatus(200)

        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getFavorites(req: GetFavoritesReq_T, res: any) {
        try {
            let user_id = req.tokenPayload._id

            let favorite_items = await FavoriteItemModel.find({user_id})

            res.status(200).json({favorite_items})
        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getFavorite(req: GetFavoritesReq_T, res: any) {
        try {
            let user_id = req.tokenPayload._id

            let favorite_items = await FavoriteItemModel.find({user_id})

            res.status(200).json({favorite_items})
        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()