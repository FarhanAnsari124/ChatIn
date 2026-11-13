import express from "express";
import { loginUser } from "../controllers/user.js";

const Router = express.Router()

Router.post("/login",loginUser)

export default Router