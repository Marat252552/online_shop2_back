import path from "path"
import FileModel from "./database/models/FileModel"
import fs from 'fs'

let TEN_MINUTES = 600000

const OperativeFilesChecker = () => {
    setInterval(async () => {
        try {
            let files = await FileModel.find()
            if (!files) return
            files.forEach(async (file) => {
                let { _id, exp_timestamp, file_name } = file
                if (exp_timestamp <= Date.now()) {

                    await FileModel.deleteOne({ _id })
                    fs.unlink(path.resolve(__dirname, './', 'operative', file_name!), (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Delete File successfully.");
                        }
                    });
                }
            })
        } catch (e) {
            console.log(e)
        }

    }, TEN_MINUTES)
}

export default OperativeFilesChecker