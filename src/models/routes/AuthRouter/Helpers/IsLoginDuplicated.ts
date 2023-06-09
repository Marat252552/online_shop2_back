import UserModel from "../../../../database/models/UserModel"



const isLoginDuplicated = async (login: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await UserModel.findOne({login})
            if(user) {
                resolve(true)
            }
            resolve(false)
        } catch(e) {
            console.log(e)
            resolve(true)
        }
    })
}

export default isLoginDuplicated