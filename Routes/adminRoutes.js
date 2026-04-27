import express from 'express'
import { getAdminUsers,createNewAdminUser,loginAdminUser,generateOTPsForStaffMembers,generateOTPsForStudents} from '../Controllers/adminControllers.js'
const adminRouter = express.Router()

adminRouter.get('/',getAdminUsers)
adminRouter.post('/auth/register',createNewAdminUser)
adminRouter.post('/auth/login',loginAdminUser)
adminRouter.post('/generateOTPs/Staff',generateOTPsForStaffMembers)
adminRouter.post('/generateOTPs/Students',generateOTPsForStudents)
export default adminRouter