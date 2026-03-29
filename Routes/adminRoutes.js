import express from 'express'
import { getAdminUsers,createNewAdminUser,loginAdminUser,generateOTPs} from '../Controllers/adminControllers.js'
const adminRouter = express.Router()

adminRouter.get('/',getAdminUsers)
adminRouter.post('/auth/register',createNewAdminUser)
adminRouter.post('/auth/login',loginAdminUser)
adminRouter.post('/generateOTPs',generateOTPs)
export default adminRouter