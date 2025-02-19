import jwt from "jsonwebtoken";
import { responseError } from "./response.helper.js";

export const handleError = (err, req, res, next) => {
  console.log(err);

  if (err instanceof jwt.JsonWebTokenError) {
    err.code = 401;
  }
  if (err instanceof jwt.TokenExpiredError) {
    err.code = 403;
  }

  const resData = responseError(err.message, err.code, err.stack);
  res.status(resData.code).json(resData);
};

export class BadRequestException extends Error {
  constructor(message = `BadRequestException`) {
    super(message);
    this.code = 400;
  }
}
export class ForbiddenException extends Error {
  constructor(message = `ForbiddenException`) {
    super(message);
    this.code = 403;
  }
}
export class UnAuthorizationException extends Error {
  constructor(message = `UnAuthorizationException`) {
    super(message);
    this.code = 401;
  }
}
