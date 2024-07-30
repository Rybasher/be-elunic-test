import { config } from "dotenv";
void config();

interface IConfig {
  secret_key: string;
  secret_key_refresh: string;
}

export const configEnv: IConfig = {
  secret_key: process.env.SECRET_KEY || "test",
  secret_key_refresh: process.env.SECRET_KEY_REFRESH || "test",
};
