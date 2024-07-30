import { NextFunction, Response, Request } from "express";

import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import { IRequestExtended } from "../interfaces/requestExtended";
import { IUser } from "../interfaces/user.interface";
import { ErrorHandler } from "../err/errorHandler";

class AuthController {
  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const createdUser = await userService.createUser(req.body);
      const { accessToken, refreshToken } =
        authService.generateTokenPair(createdUser);
      res
        .json({
          token: {
            accessToken,
            refreshToken,
          },
          user: createdUser,
        })
        .status(200);
    } catch (e: any) {
      next(e);
    }
  }

  public async login(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { password: hashPassword } = req.user as IUser;
      const { password } = req.body;

      const passwordMatched = await userService.compareUserPassword(
        password,
        hashPassword
      );

      if (!passwordMatched) {
        next(new ErrorHandler("Wrong credentials....", 401));
        return;
      }

      const user = req.user;

      if (!user) {
        next(new ErrorHandler("Wrong credentials....", 401));
        return;
      }

      const { accessToken, refreshToken } = authService.generateTokenPair(user);

      const { userName, email, type } = user;

      res
        .json({
          token: {
            accessToken,
            refreshToken,
          },
          user: {
            userName,
            email,
            type,
          },
        })
        .status(200);
    } catch (err: any) {
      next(err);
    }
  }
}

export const authController = new AuthController();
