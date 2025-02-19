import { BadRequestException } from "../helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";

export const checkUserExist = async (users_id) => {
  const userExist = await prisma.users.findUnique({
    where: { users_id: +users_id },
  });
  if (!userExist) throw new BadRequestException(`User does not exist`);
  return userExist;
};
export const checkImagesExist = async (images_id) => {
  const imagesExist = await prisma.images.findUnique({
    where: { images_id: +images_id },
  });
  if (!imagesExist) throw new BadRequestException(`Images does not exist`);
  return imagesExist;
};
