import * as bcrypt from "bcryptjs";

import { IUser } from "../interfaces/user.interface";
import { users } from "../db/users";

class UserService {
  public async createUser(user: IUser): Promise<Partial<IUser>> {
    const { password } = user;
    const hashPassword = await this.hashPassword(password);
    users.push({ ...user, password: hashPassword });
    const findUser = users.find((u) => u.userName === user.userName) as IUser;
    return {
      userName: findUser.userName,
      email: findUser.email,
      type: findUser.type,
    };
  }

  public async users(): Promise<Partial<IUser>[]> {
    return users.map((user) => {
      return {
        userName: user.userName,
        email: user.email,
        type: user.type,
      };
    });
  }

  public async compareUserPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export const userService = new UserService();
