import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransporter({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
    }
})

export async function contactUs(req,res) {
    const {Name,Subject,Message} = req.body
    const mailOptions = {
        from:'joelanzovule@gmail.com',
        to:'joelanzovule@gmail.com',
        subject:`${Subject}`,
        text:`My name is ${Name} and my message is ${Message}`
    }
    try {
        transporter.sendMail(mailOptions,(error,info) => {
            if (error) {
                console.log(error)
                res.status(400).json({
                    "message":"Email not sent !",
                    "error":error
                })
            } else {
                res.status(200).json({
                    "message":"Email sent successfully"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            "message":"Failed something went wrong",
            "error":error.message
        })
    }
    
}