import UserModel from "../../../database/models/UserModel";
import { TokenPayload_T, UserRD_T } from "../../shared/types";
import FindUserAndComparePassword from "./Helpers/DoesUsersExist";
import GenerateTokens from "./Helpers/GenerateTokens";
import isLoginDuplicated from "./Helpers/IsLoginDuplicated";
import { IsLoginDuplReq_T, LoginReq_T, RefreshReq_T, SigninReq_T, isLoggedReq_T } from "./types";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class Controller {
    async signin(req: SigninReq_T, res: any) {
        try {
            const { login, password } = req.body
            if (!login || !password) {
                return res.status(400).send('Не все поля заполнены')
            }

            if (await isLoginDuplicated(login)) {
                return res.status(400).send('Логин занят')
            }

            let hashPassword = bcrypt.hashSync(password, 7)
            let user = await UserModel.create({
                login, password: hashPassword
            })
            let {_id, status} = user
            let { accessToken, refreshToken } = GenerateTokens({ _id: _id.toString(), status, login })

            res
                .status(201)
                .cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                .json({ user, accessToken })
        } catch (e) {
            res.sendStatus(500)
        }
    }
    async login(req: LoginReq_T, res: any) {
        try {
            let { login, password, remember = true } = req.body

            let user = await UserModel.findOne({login})
            if(!user) {
                res.status(400).json({message: 'Пользователя с таким логином нет'}).end()
                return
            }
            let isPasswordValid = bcrypt.compareSync(password, user!.password!)
            if(!isPasswordValid) {
                res.status(400).json({message: 'Неверный пароль'}).end()
                return
            }

            let {_id, status} = user
            let { accessToken, refreshToken } = GenerateTokens({ _id: _id.toString(), status, login })
                
            let userRD: UserRD_T = {
                login,
                _id: _id.toString(),
                status
            }
            if (remember) {
                res
                    .status(200)
                    .cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'Strict' })
                    .json({ accessToken, user: userRD }).end()
                return
            }
            res
                .status(200)
                .json({ accessToken, user: userRD }).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500).end()
        }
    }
    async isLoginDupl(req: IsLoginDuplReq_T, res: any) {
        try {
            let { login } = req.body

            let user = await UserModel.findOne({ login })
            if (user) return res.status(200).json({ response: true }).end()

            res.status(200).json({ response: false }).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(200).end()
        }
    }
    async refresh(req: RefreshReq_T, res: any) {
        try {
            let RefreshToken = req.headers.cookie.split('=')[1]
            if (!RefreshToken) return res.sendStatus(400)

            let isTokenValid = jwt.verify(RefreshToken, process.env.JWT_REFRESH_KEY!) as TokenPayload_T
            if (!isTokenValid) return res.sendStatus(400)
            let { login } = isTokenValid

            let user = await UserModel.findOne({ login })
            if(!user) {
                res.status(400).json({message: 'Пользователя с таким логином нет'}).end()
                return
            }

            let {_id, status} = user
            let userRD: UserRD_T = {
                login,
                _id: _id.toString(),
                status
            }
            
            let { accessToken, refreshToken } = GenerateTokens({ _id: _id.toString(), status, login })
            res
                .status(200)
                .cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                .json({ user: userRD, accessToken })
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    async isLogged(req: isLoggedReq_T, res: any) {
        try {
            if(!req.headers.authorization) {
                return res.sendStatus(401)
            }
            let accessToken = req.headers.authorization.split(' ')[1]

            let token = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY!) as TokenPayload_T

            let { login } = token
            let user = await UserModel.findOne({ login })
            if(!user) {
                return res.sendStatus(403)
            }
            let {_id, status} = user
            let userRD: UserRD_T = {
                login,
                _id: _id.toString(),
                status
            }
            res.status(200).json({ user: userRD, accessToken })
        } catch (e) {
            console.log(e)
            res.sendStatus(403)
        }
    }
    async logout(req: any, res: any) {
        try {
            res.clearCookie('refreshToken').status(200).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export default new Controller()