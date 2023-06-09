import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenPayload_T } from '../shared/types' 
import { Statuses } from '../shared/types'


const UserAccessCheck = (req: any, res: any, next: any) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        if(!req.headers.authorization) {
            return res.status(401).json({ message: 'Пользователь не авторизован' })
        }
        const token = req.headers.authorization.split(' ')[1]

        let tokenPayload

        try {
            tokenPayload = jwt.verify(token, process.env.JWT_ACCESS_KEY!) as TokenPayload_T
        } catch(e) {
            console.log(e)
            res.sendStatus(403)
        }

        if(!tokenPayload) {
            return res.sendStatus(403)
        }
        
        if(tokenPayload.status !== Statuses.user) {
            return res.sendStatus(403)
        }

        req.tokenPayload = tokenPayload
        next()
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export default UserAccessCheck