import express from "express";
import { loginUser, verifyUser } from "../controllers/user.js";

const Router = express.Router()

Router.post("/login",loginUser)
Router.post("/verify",verifyUser)

export default Router