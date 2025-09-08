import dotenv from "dotenv"
dotenv.config();

export const envConfigs = {
  port: process.env.PORT,
  _jwt: {
    secretKey: process.env.JWT_SECRET_KEY
  },
  mongoConfig: {
    username: process.env.MONGO_DB_USERNAME,
    password: process.env.MONGO_DB_PASSWORD,
    cs: process.env.MONGO_DB_CS,
  }
}
console.log(process.env.MONGO_DB_CS);
