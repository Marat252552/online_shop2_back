import path from "path"
import { UploadFilesReq_T } from "./types"
import { v4 } from "uuid"
import FileModel from "../../../database/models/FileModel"


class Controller {
    async uploadFile(req: UploadFilesReq_T, res: any) {
        try {
            let { file } = req.files
            let { uid, session_id } = req.body

            if (file.size > 2000000) {
                return res.status(413).json({ message: 'Размер файла не может быть больше 2х Мбайт' })
            }

            if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/webp') return res.sendStatus(400)
            let file_name = v4() + '.' + file.mimetype.split('/')[1]

            let ONE_HOUR = 3600000
            let THIRTY_SECONDS = 30000
            let TEN_MINUTES = 600000

            // Time in future when this file should be auto deleted if not used
            let exp_timestamp = Date.now() + TEN_MINUTES

            await FileModel.create({
                file_name, exp_timestamp, session_id, uid
            })

            file.mv(path.resolve(__dirname, './../../../', 'operative', file_name))

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()