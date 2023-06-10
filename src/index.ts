import dotenv from 'dotenv'
import DBconnect from './database/DBconnect'
import {app} from './app'

dotenv.config()

const start = async () => {
    let PORT = process.env.PORT || 3000
    try {
        DBconnect()
        app.listen(PORT, () => {
            console.log('server is running in port ' + PORT)
        })
    } catch(e) {
        console.log(e)
    }
}

start()