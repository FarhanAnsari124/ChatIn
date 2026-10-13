import amqp from "amqplib";
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST,
            port: Number(process.env.RABBITMQ_PORT),
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
        });
        channel = await connection.createChannel();
        console.log("✅ Connected to rabbitMQ");
    }
    catch (error) {
        console.log("Failed to connect to rabbitMQ", error);
    }
};
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("RabbitMq channel is not initialised");
        return;
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
};
//# sourceMappingURL=rabbitmq.js.map