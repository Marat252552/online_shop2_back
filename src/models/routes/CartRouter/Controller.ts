import CartItemModel from "../../../database/models/CartItem"
import { AddItemToCartReq_T, GetCartItemAmount_T, GetCartItemsReq_T, RemoveALlSameItemsFromCartReq_T, RemoveItemFromCartReq_T } from "./types"



class Controller {
    async addItemToCart(req: AddItemToCartReq_T, res: any) {
        try {
            console.log(req.params)
            let {item_id} = req.params
            let {_id} = req.tokenPayload

            let cartItem = await CartItemModel.findOne({item_id, user_id: _id})

            if(!cartItem) {
                await CartItemModel.create({item_id, user_id: _id, amount: 1})
            } else {
                await CartItemModel.updateOne({item_id, user_id: _id}, {amount: cartItem.amount + 1})
            }

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async removeItemFromCart(req: RemoveItemFromCartReq_T, res: any) {
        try {
            let {item_id} = req.params
            let {_id} = req.tokenPayload

            let cartItem = await CartItemModel.findOne({item_id, user_id: _id})

            if(!cartItem) {
                return res.sendStatus(400)
            } else {
                if(cartItem.amount === 1) {
                    await CartItemModel.deleteOne({item_id, user_id: _id})
                } else {
                    await CartItemModel.updateOne({item_id, user_id: _id}, {amount: cartItem.amount - 1})
                }
                
            }

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async removeAllSameItemsFromCart(req: RemoveALlSameItemsFromCartReq_T, res: any) {
        try {
            let {item_id} = req.params
            let {_id} = req.tokenPayload

            let cartItem = await CartItemModel.findOne({item_id, user_id: _id})

            if(!cartItem) {
                return res.sendStatus(400)
            } else {
                await CartItemModel.deleteOne({item_id, user_id: _id})
            }

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getCartItems(req: GetCartItemsReq_T, res: any) {
        try {
            let {_id} = req.tokenPayload

            let cart_items = await CartItemModel.find({user_id: _id})

            res.status(200).json({cart_items})
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getCartItemAmount(req: GetCartItemAmount_T, res: any) {
        try {
            let {_id} = req.tokenPayload
            let {item_id} = req.params

            let cart_item = await CartItemModel.findOne({user_id: _id, item_id})
            if(!cart_item) {
                res.status(200).json({amount: 0})
            } else {
                res.status(200).json({amount: cart_item.amount})
            }
         
            
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getCartInfo(req: any, res: any) {
        try {
        } catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()