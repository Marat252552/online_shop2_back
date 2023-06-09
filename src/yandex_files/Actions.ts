import path from "path";
import s3 from "./YandexBucketInit";


export let CloudUpload = async (image_name: string) => {
    let upload = await s3.Upload(
        {
            path: path.resolve(__dirname, './../', 'operative', image_name),
            save_name: true
        },
        '/online_shop/'
    );
    return upload
}

export let CloudDelete = (key: string) => {
    return s3.Remove(key)
}