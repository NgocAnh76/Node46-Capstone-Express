import {
  BadRequestException,
  UnAuthorizationException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";

const authService = {
  register: async (req) => {
    const { full_name, email, password } = req.body;
    console.log({ full_name, email, password });

    const userExits = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (userExits) {
      throw new BadRequestException("Account already exists please login");
    }
    const passHash = bcrypt.hashSync(password, 10);

    const userNew = await prisma.users.create({
      data: {
        email,
        full_name,
        password: passHash,
      },
    });

    delete userNew.password;

    return userNew;
  },
  login: async (req) => {
    const { email, password } = req.body;

    const userExits = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!userExits)
      throw new BadRequestException(`Account does not exist, please register`);

    const isPassword = bcrypt.compareSync(password, userExits.password);
    if (!isPassword) {
      throw new BadRequestException("Password is incorrect, please re-enter");
    }
    const tokens = authService.createToken(userExits.users_id);
    return tokens;
  },
  facebookLogin: async (req) => {
    const { name, email, picture, id } = req.body;
    const avatar = picture.data.url;
    let userExists = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!userExists) {
      userExists = await prisma.users.create({
        data: {
          email: email,
          full_name: name,
          avatar: avatar,
          face_app_id: id,
        },
      });
    }
    const tokens = authService.createToken(userExists.user_id);
    return tokens;
  },

  refreshToken: async (req) => {
    const refreshToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw new UnAuthorizationException(
        `Please provide token to continue using`
      );
    }
    const accessToken = req.headers[`x-access-token`];
    if (!accessToken) {
      throw new UnAuthorizationException(
        `Please provide token to continue using`
      );
    }

    const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
      throw new UnAuthorizationException(`Invalid token pair`);
    }
    const userExits = await prisma.users.findUnique({
      where: {
        users_id: decodeRefreshToken.userId,
      },
    });
    if (!userExits) throw new UnAuthorizationException(`User does not exist`);
    const tokens = authService.createToken(userExits.users_id);
    return tokens;
  },

  createToken: (userId) => {
    if (!userId) throw new BadRequestException(`No userId to generate token`);
    const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  },
  getUser: async (req) => {
    const { id } = req.params;
    if (!id) throw new BadRequestException(`Please provide the video ID`);

    const user = await prisma.users.findUnique({ where: { users_id: +id } });
    if (!user) throw new BadRequestException(`User not found`);
    return user;
  },
};
export default authService;
