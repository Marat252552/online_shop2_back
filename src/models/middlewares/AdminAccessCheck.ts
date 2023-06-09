import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenPayload_T } from '../shared/types'
import { Statuses } from '../shared/types' 


const AdminAccessCheck = (req: any, res: any, next: any) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {

        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Пользователь не авторизован' })
        }
        const token = req.headers.authorization.split(' ')[1]
        
        let DecodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY!) as TokenPayload_T
        
        if(DecodedToken.status !== Statuses.admin) {
            return res.sendStatus(403)
        }

        req.DecodedToken = DecodedToken
        next()
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export default AdminAccessCheck