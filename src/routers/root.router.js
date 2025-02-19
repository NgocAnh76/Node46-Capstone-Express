import express from "express";
import authRouter from "./auth.router.js";
import imageRouter from "./image.router.js";

const rootRouter = express.Router();

rootRouter.get(`/`, (req, res, next) => {
  res.json(`ok`);
});

rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/image`, imageRouter);

export default rootRouter;
