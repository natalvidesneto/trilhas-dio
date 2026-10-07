import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  API_KEY: process.env.API_KEY ?? "",
};

if (!env.API_KEY) {
  throw new Error("API_KEY não definida no .env");
}