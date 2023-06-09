import CartItemModel from "../../../database/models/CartItem"
import FavoriteItemModel from "../../../database/models/FavoriteItemModel"
import UserModel from "../../../database/models/UserModel"
import { Statuses, User_T } from "../../shared/types"
import { DeleteUserReq_T, GetUsersReq_T, GrantAccessReq_T } from "./types"



class Controller {
    async getUsers(req: GetUsersReq_T, res: any) {
        try {
            let statuses = JSON.parse(req.query.statuses) 
            console.log(statuses)
            let users: User_T[]
            if(statuses[0]) {
                users = await UserModel.find({status: statuses})
            } else {
                users = await UserModel.find()
            }
            res.status(200).json({ users })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async deleteUser(req: DeleteUserReq_T, res: any) {
        try {
            let { _id } = req.query

            let user = await UserModel.findOne({_id})

            if(!user || user.status === Statuses.admin) {
                return res.sendStatus(400)
            }

            // user deleting
            await UserModel.deleteOne({ _id })
            // deleting all cart items
            await CartItemModel.deleteMany({user_id: _id})
            // deleting all favorites items
            await FavoriteItemModel.deleteMany({user_id: _id})

            res.status(200).json({ _id })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async grantAccess(req: GrantAccessReq_T, res: any) {
        try {
            let { _id } = req.body

            await UserModel.updateOne({ _id, status: Statuses.user }, { status: Statuses.manager })
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async lowerAccess(req: GrantAccessReq_T, res: any) {
        try {
            let { _id } = req.body

            await UserModel.updateOne({ _id, status: Statuses.manager }, { status: Statuses.user })
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()