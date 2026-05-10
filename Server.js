import express from 'express'
import connectDatabase from './Config/database.js'
import studentsRouter from './Routes/studentsRoutes.js'
import candidatesRouter from './Routes/candidatesRoutes.js'
import adminRouter from './Routes/adminRoutes.js'
import votesRouter from './Routes/votesRoutes.js'
import staffRouter from './Routes/staffRoutes.js'
import morgan from 'morgan'
import helmet from 'helmet'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
export const io = new Server(server,{
    cors:{origin:process.env.FRONTEND_URL}
})

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use('/v1/api/Students',studentsRouter)
app.use('/v1/api/Candidates',candidatesRouter)
app.use('/v1/api/admin',adminRouter)
app.use('/v1/api/Votes',votesRouter)
app.use('/v1/api/Staff',staffRouter)

server.listen(PORT,async ()=>{
    await connectDatabase()
    console.log(`Server listening on port ${PORT}`);  
})