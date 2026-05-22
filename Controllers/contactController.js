import {Resend} from 'resend'
import dotenv from 'dotenv'
dotenv.config()
const resend = new Resend(process.env.RESEND_API_KEY)
export async function contactUs(req,res) {
    const {Name,Subject,Message} = req.body
    console.log(Name,Subject,Message)
    try{
        const emailResponse = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: 'joelanzovule@gmail.com',
            subject: Subject || 'New contact form submission',
            html: `<p>Name: ${Name}</p><br/><p>Message: ${Message}</p>`
        })

        console.log('Resend email response:', emailResponse)

        res.status(200).json({
            "message": "Email sent successfully",
            "response": emailResponse
        })
    } catch(error){
        console.error('Resend email error:', error)

        res.status(500).json({
            "message":"Failed to send email",
            "error":error.message
        })
    }
}