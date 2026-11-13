import { publishToQueue } from "../config/rabbitmq.js";
import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";

export const loginUser = TryCatch(async (req, res) => {
	const { email } = req.body;
     if (!email || typeof email !== "string") {
        res.status(400).json({
            message: "Valid email is required",
        });
        return;
     }
    const normalizedEmail = email.trim().toLowerCase();
    const rateLimitKey = `otp:ratelimit:${normalizedEmail}`;
	const rateLimit = await redisClient.get(rateLimitKey);
	if (rateLimit) {
		res.status(429).json({
			message: "Too many requests, Please wait before requesting new Otp",
		});
		return;
	}
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	const otpKey = `otp:${email}`;
	await redisClient.set(otpKey, otp, {
		EX: 300,
	});
	await redisClient.set(rateLimitKey, "true", {
		EX: 60,
	});
	const message = {
		to: normalizedEmail,
		subject: "Your OTP code",
		body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
	};
    await publishToQueue("send-otp",message)
    res.status(200).json({
        message:"OTP sent to your mail."
    })
});
