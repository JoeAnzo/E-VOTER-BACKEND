import express from 'express'
import connectDatabase from './Config/database.js'
import studentsRouter from './Routes/studentsRoutes.js'
import candidatesRouter from './Routes/candidatesRoutes.js'
import adminRouter from './Routes/adminRoutes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/v1/api/Students',studentsRouter)
app.use('/v1/api/Candidates',candidatesRouter)
app.use('/v1/api/admin',adminRouter)

const PORT = 3000
app.listen(PORT,'0.0.0.0',async ()=>{
    await connectDatabase()
    console.log(`Server listening on port ${PORT}`);  
})