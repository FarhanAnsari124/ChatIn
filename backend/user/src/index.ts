import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import {createClient} from 'redis'
import userRoutes from './routes/user.js'
import { connectRabbitMQ } from "./config/rabbitmq.js";

dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 8000;
connectDb();
connectRabbitMQ()

export const redisClient = createClient({
    url:process.env.REDIS_URL!,
})

redisClient.connect().then(()=> console.log("Connected to redis")).catch((error) => console.log("Redis connection failed:", error));


app.use('/api/v1',userRoutes)
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
