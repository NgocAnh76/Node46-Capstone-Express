import express from "express";
import imageController from "../controllers/image.controller.js";

const imageRouter = express.Router();

imageRouter.get(`/image-list`, imageController.imageList);
imageRouter.get(`/image-search/:imageName`, imageController.imageListByName);
imageRouter.get(`/image-detail/:id`, imageController.imageDetail);
imageRouter.get(`/image-comment/:id`, imageController.getComment);
imageRouter.get(`/image-isSave/:id/isSaved`, imageController.isSaved);
imageRouter.post(`/image-addComment/:id`, imageController.addComment);
imageRouter.get(`/image-saveByUser/:userId`, imageController.saveImageByUserId);
imageRouter.get(
  `/image-createByUser/:userId`,
  imageController.createImageByUserId
);
imageRouter.delete(`/image-delete/:id`, imageController.imageDelete);

export default imageRouter;
