import * as jwt from "jsonwebtoken";

import { IUser } from "../interfaces/user.interface";
import { ITokenPair } from "../interfaces/token";
import { configEnv } from "../config/config";

class AuthService {
  public generateTokenPair(payload: Partial<IUser>): ITokenPair {
    const accessToken = jwt.sign(payload, configEnv.secret_key, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, configEnv.secret_key_refresh, {
      expiresIn: "4d",
    });

    return {
      refreshToken,
      accessToken,
    };
  }
}

export const authService = new AuthService();
