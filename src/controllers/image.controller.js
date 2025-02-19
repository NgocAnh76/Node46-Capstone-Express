import { responseSuccess } from "../common/helpers/response.helper.js";
import imageService from "../services/images.service.js";

const imageController = {
  imageList: async (req, res, next) => {
    try {
      const images = await imageService.imageList(req);
      const resData = responseSuccess(
        images,
        `Get list video successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  imageListByName: async (req, res, next) => {
    try {
      const images = await imageService.imageListByName(req);
      const resData = responseSuccess(images, `Get video successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  imageDetail: async (req, res, next) => {
    try {
      const imageDetail = await imageService.imageDetail(req);
      const resData = responseSuccess(
        imageDetail,
        `Get video successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getComment: async (req, res, next) => {
    try {
      const comment = await imageService.getComment(req);
      const resData = responseSuccess(comment, `Get comment successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  isSaved: async (req, res, next) => {
    try {
      const images = await imageService.isSaved(req);
      const resData = responseSuccess(
        images,
        `Check if the image was saved successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  addComment: async (req, res, next) => {
    try {
      const comment = await imageService.addComment(req);
      const resData = responseSuccess(comment, `Add comment successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  saveImageByUserId: async (req, res, next) => {
    try {
      const listImages = await imageService.saveImageByUserId(req);
      const resData = responseSuccess(
        listImages,
        `Get list images by user successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  createImageByUserId: async (req, res, next) => {
    try {
      const listImages = await imageService.createImageByUserId(req);
      const resData = responseSuccess(
        listImages,
        `Get list images by user successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  imageDelete: async (req, res, next) => {
    try {
      const image = await imageService.imageDelete(req);
      const resData = responseSuccess(image, `Delete images successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};
export default imageController;
