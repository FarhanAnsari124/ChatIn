import amqp from "amqplib";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const startSendOtpConsumer =async ()=>{
    try {
        const connection = await amqp.connect({
            protocol:"amqp",
            hostname: process.env.RABBITMQ_HOST!,
			port: Number(process.env.RABBITMQ_PORT!),
			username: process.env.RABBITMQ_USERNAME!,
			password: process.env.RABBITMQ_PASSWORD!,
        })
        const channel = await connection.createChannel()

        const queueName = "send-otp"
        await channel.assertQueue(queueName,{durable:true})

        console.log("✅ Mail Service consumer started, Listening for otp mail")
        channel.consume(queueName,async(msg)=>{
            if(msg){
                try {
                    const {to,subject,body} = JSON.parse(msg.content.toString())
                    const transporter = nodemailer.createTransport({
                        host:"smtp.gmail.com",
                        port:465,
                        auth:{
                            user:process.env.USER,
                            pass:process.env.PASSWORD
                        }
                    })
                    await transporter.sendMail({
                        from:"ChatIn",
                        to,
                        subject,
                        text:body,
                    })
                    console.log(`Otp mail sent to ${to}`)
                    channel.ack(msg)

                } catch (error) {
                    console.log("Failed to send otp",error)
                }
            }
        })
        
    } catch (error) {
        console.log("Failed to start rabbitmq consumer",error)
    }
}