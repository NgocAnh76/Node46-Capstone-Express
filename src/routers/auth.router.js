import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post(`/register`, authController.register);
authRouter.post(`/login`, authController.login);
authRouter.post("/facebook-login", authController.facebookLogin);
authRouter.post(`/refresh-token`, authController.refreshToken);
authRouter.get(`/get-user/:id`, authController.getUser);

export default authRouter;
