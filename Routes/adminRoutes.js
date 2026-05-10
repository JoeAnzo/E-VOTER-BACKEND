import express from 'express'
import xslx from 'xlsx'
import multer from 'multer'
import { getAdminUsers,createNewAdminUser,exportStaffListAsCSV,uploadStaffList,exportStudentListAsCSV,loginAdminUser,generateOTPsForStaffMembers,generateOTPsForStudents,uploadStudentsList} from '../Controllers/adminControllers.js'

const adminRouter = express.Router()
const upload = multer({dest:'uploads/'})

adminRouter.get('/',getAdminUsers)
adminRouter.post('/auth/register',createNewAdminUser)
adminRouter.post('/auth/login',loginAdminUser)
adminRouter.post('/generateOTPs/Staff',generateOTPsForStaffMembers)
adminRouter.post('/generateOTPs/Students',generateOTPsForStudents)
adminRouter.post('/students/upload',upload.single('excelFile'),uploadStudentsList)
adminRouter.post('/staff/upload',upload.single('excelFile',uploadStaffList))
adminRouter.get('/students/export-csv',exportStudentListAsCSV)
adminRouter.get('/staff/export-csv',exportStaffListAsCSV)
export default adminRouter