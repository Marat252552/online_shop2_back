import { v4 } from "uuid"
import ItemModel from "../../../database/models/ItemModel"
import { AddRatingReq_T, CreateItemReq_T, DeleteItemReq_T, GetItemRatingReq_T, GetItemReq_T, GetItemsReq_T } from "./types"
import path from "path"
import fs from 'fs'
import RatingModel from "../../../database/models/RatingModel"
import FileModel from "../../../database/models/FileModel"
import CartItemModel from "../../../database/models/CartItem"
import FavoriteItemModel from "../../../database/models/FavoriteItemModel"
import { DeleteFile, CloudUpload } from "../../../yandex_files/Actions"
import { UploadFile_T } from "../../../shared/types"


class Controller {
    async createItem(req: CreateItemReq_T, res: any) {
        try {
            let { brand_id, name, description, price, type_id, mainFileUID, imagesUIDs } = req.body.payload
            let { session_id } = req.body
            if (!brand_id || !name || !description || !price || !type_id) {
                return res.status(400).json({ message: 'Не все поля заполнены' })
            }

            let item = await ItemModel.findOne({ name })
            if (item) {
                return res.status(400).json({ message: 'Название уже используется' })
            }

            let files = await FileModel.find({ session_id })
            let images = []

            for await (const file of files) {
                let { file_name, uid } = file

                // checking whether this image is in imagesUIDs provided by client (client may delete file but it will not be deleted from DB)
                if (imagesUIDs.find(el => el === uid)) {
                    let {key, Location}: UploadFile_T = await CloudUpload(file_name)

                    let image = {key, link: Location, file_name}

                    images.push(image)
                }
            }

            let main_file = await FileModel.findOne({uid: mainFileUID})

            if(!main_file) {
                return res.sendStatus(400)
            }

            let {key, Location}: UploadFile_T = await CloudUpload(main_file.file_name)

            let main_image = {key, link: Location, file_name: main_file.file_name}

            await ItemModel.create({
                brand_id,
                name,
                description,
                price,
                type_id,
                main_image,
                images
            })

            res.sendStatus(201)

        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getItems(req: GetItemsReq_T, res: any) {
        try {
            let types = JSON.parse(req.query.types)
            let brands = JSON.parse(req.query.brands)
            let { searchValue } = req.query

            console.log(searchValue)

            let items
            if (!searchValue) {
                if (types[0] && brands[0]) {
                    items = await ItemModel.find({
                        brand_id: brands,
                        type_id: types
                    })
                } else if (types[0] && !brands[0]) {
                    items = await ItemModel.find({
                        type_id: types
                    })
                } else if (!types[0] && brands[0]) {
                    items = await ItemModel.find({
                        brand_id: brands
                    })
                } else {
                    items = await ItemModel.find()
                }
            } else {
                if (types[0] && brands[0]) {
                    items = await ItemModel.find({
                        brand_id: brands,
                        type_id: types,
                        name: { $regex: searchValue }
                    })
                } else if (types[0] && !brands[0]) {
                    items = await ItemModel.find({
                        type_id: types,
                        name: { $regex: searchValue }
                    })
                } else if (!types[0] && brands[0]) {
                    items = await ItemModel.find({
                        brand_id: brands,
                        name: { $regex: searchValue }
                    })
                } else {
                    items = await ItemModel.find({ name: { $regex: searchValue } })
                }
            }

            res.status(200).json({ items })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async deleteItem(req: DeleteItemReq_T, res: any) {
        try {
            let { _id } = req.body

            // item deleting
            let deleted_item = await ItemModel.findOneAndDelete({ _id })
            if (!deleted_item) return res.status(400).json({ message: 'Товар с указанным _id не найден' })

            for await (const file of deleted_item.images) {
                await DeleteFile(file.key)
            }

            await DeleteFile(deleted_item.main_image.key)

            await RatingModel.deleteMany({ item_id: _id })
            await FavoriteItemModel.deleteMany({ item_id: _id })
            await CartItemModel.deleteMany({ item_id: _id })

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async addRating(req: AddRatingReq_T, res: any) {
        try {
            let { item_id, value } = req.body
            let { _id } = req.tokenPayload

            let existingRating = await RatingModel.findOneAndUpdate(
                { item_id, user_id: _id },
                { item_id, user_id: _id, value }
            )
            if (!existingRating) {
                await RatingModel.create({ item_id, user_id: _id, value })
            }

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getItemRating(req: GetItemRatingReq_T, res: any) {
        try {
            let { item_id } = req.query

            let AllItemRatings = await RatingModel.find({ item_id })

            let RatingsSum = 0
            AllItemRatings.forEach(rating => {
                RatingsSum += rating.value
            })
            let RatingsAverage = RatingsSum / AllItemRatings.length

            res.status(200).json({ rating: RatingsAverage, amount: AllItemRatings.length })

        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getItem(req: GetItemReq_T, res: any) {
        try {
            let { _id } = req.params

            let item = await ItemModel.findOne({ _id })


            res.status(200).json({ item })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async getThreeBestItems(req: any, res: any) {
        try {
            let items = await ItemModel.find()

            let TopOfItems = []

            for await (const item of items) {
                let AllItemRatings = await RatingModel.find({ item_id: item._id })

                if (!AllItemRatings || !AllItemRatings[0]) return

                let RatingsSum = 0
                AllItemRatings.forEach(rating => {
                    RatingsSum += rating.value
                })
                let RatingsAverage = RatingsSum / AllItemRatings.length
                TopOfItems.push({ item, rating: RatingsAverage })
            }

            let SortedItems = TopOfItems.sort((a, b) => {
                if (a.rating < b.rating) {
                    return 1;
                }
                if (a.rating > b.rating) {
                    return -1;
                }
                return 0;
            })

            res.status(200).json({
                items: {
                    item1: SortedItems[0],
                    item2: SortedItems[1],
                    item3: SortedItems[2]
                }
            })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

}

export default new Controller()