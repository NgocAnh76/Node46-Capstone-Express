import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const imageService = {
  imageList: async (req) => {
    const images = await prisma.images.findMany();
    return images;
  },
  imageListByName: async (req) => {
    const { imageName } = req.params;
    console.log({ imageName });
    if (!imageName)
      throw new BadRequestException(`Please provide the image name`);
    const imageDetail = await prisma.images.findMany({
      where: {
        title: {
          contains: imageName,
        },
      },
    });
    if (imageDetail.length === 0)
      throw new BadRequestException(`Image not found`);
    return imageDetail;
  },
  imageDetail: async (req) => {
    const { id } = req.params;
    if (!id) throw new BadRequestException(`Please provide the image ID`);

    const imgDetail = await prisma.images.findUnique({
      // Find image by id
      where: {
        images_id: +id,
      },
      // Get name user
      include: {
        users: { select: { full_name: true } },
      },
    });
    if (!imgDetail) throw new BadRequestException(`Image not found`);
    return imgDetail;
  },
  getComment: async (req) => {
    const { id } = req.params;
    if (!id) throw new BadRequestException(`Please provide the video ID`);

    const comment = await prisma.comments.findMany({
      where: {
        images_id: +id,
      },
      include: {
        users: { select: { full_name: true } },
      },
    });
    if (comment.length === 0)
      throw new BadRequestException(`Comment not found`);
    return comment;
  },
  isSaved: async (req) => {
    const { id } = req.params;
    if (!id) throw new BadRequestException(`Please provide the image ID`);
    const { users_id } = req.query;
    console.log({ users_id });
    if (!users_id) throw new BadRequestException(`Please provide the user ID`);

    const isSaved = await prisma.saved_image.findFirst({
      where: {
        users_id: +users_id,
        images_id: +id,
      },
    });
    return { saved: !!isSaved };
  },
  addComment: async (req) => {
    const { id } = req.params;
    const { content, users_id } = req.body;
    if (!content || !users_id)
      throw new BadRequestException(`Content anb user_id are required`);

    const imageExist = await prisma.images.findUnique({
      where: { images_id: +id },
    });
    if (!imageExist) throw new BadRequestException(`Image does not exist`);

    const userExist = await prisma.users.findUnique({ where: { users_id } });
    if (!userExist) throw new BadRequestException(`User does not exist`);

    const newComment = await prisma.comments.create({
      data: {
        images_id: +id,
        users_id,
        content,
      },
    });
    return newComment;
  },
  saveImageByUserId: async (req) => {
    const { userId } = req.params;
    if (!userId) throw new BadRequestException(`Please provide the user Id`);

    const images = await prisma.saved_image.findMany({
      where: { users_id: +userId },
      include: { images: true },
    });
    if (images.length === 0) throw new BadRequestException(`Images not found`);
    return images;
  },
  createImageByUserId: async (req) => {
    const { userId } = req.params;
    if (!userId) throw new BadRequestException(`Please provide the user Id`);
    const images = await prisma.images.findMany({
      where: { users_id: +userId },
    });
    if (images.length === 0) throw new BadRequestException(`Images not found`);
    return images;
  },
  imageDelete: async (req) => {
    const { id } = req.params;
    if (!id) throw new BadRequestException(`Please provide the video ID`);

    const imageExist = await prisma.images.findUnique({
      where: { images_id: +id },
    });
    if (!imageExist) throw new BadRequestException(`Images does not exist`);
    await prisma.images.delete({ where: { images_id: +id } });
    return `Delate image successfully`;
  },
};

export default imageService;
