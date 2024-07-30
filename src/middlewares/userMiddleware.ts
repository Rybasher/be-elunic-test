import { NextFunction, Response } from "express";

import { IRequestExtended } from "../interfaces/requestExtended";
import { userValidator } from "../validators/user";
import { ErrorHandler } from "../err/errorHandler";
import { users } from "../db/users";

class UserMiddleware {
  public async isUserExistForLogin(
    req: IRequestExtended,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userName } = req.body;
      const userFromDB = users.find((value) => value.userName === userName);
      if (!userFromDB) {
        next(new ErrorHandler("Wrong credentials....", 401));
        return;
      }
      req.user = userFromDB;
      next();
    } catch (err: any) {
      next(err);
    }
  }

  public async isUserExistForRegistration(
    req: IRequestExtended,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, userName } = req.body;
      const userFromDB = users.find(
        (user) => user.email === email || user.userName === userName
      );
      if (userFromDB) {
        next(new ErrorHandler("User Already exist....", 401));
        return;
      }
      req.user = userFromDB;
      next();
    } catch (err: any) {
      next(err);
    }
  }

  public async checkUserFields(
    req: IRequestExtended,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = userValidator.createUser.validate(req.body);
      if (error) {
        console.log(error);
        next(new ErrorHandler("Not Valid Fields", 400));
        return;
      }
      req.body = value;
      next();
    } catch (err: any) {
      next(err);
    }
  }

  public async checkUserFieldsOnLogin(
    req: IRequestExtended,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = userValidator.login.validate(req.body);
      if (error) {
        next(new ErrorHandler(error.details[0].message, 401));
        return;
      }
      req.body = value;
      next();
    } catch (err: any) {
      next(err);
    }
  }
}

export const userMiddleware = new UserMiddleware();
