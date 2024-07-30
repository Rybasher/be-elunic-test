import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

class UserController {
  public async users(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.users();
      res.json(users).status(200);
    } catch (e: any) {
      next(e);
    }
  }
}

export const userController = new UserController();
