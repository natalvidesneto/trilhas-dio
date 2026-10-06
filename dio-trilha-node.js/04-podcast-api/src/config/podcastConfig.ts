import "dotenv/config";

export const PORT = Number(process.env["PORT"]) || 3000;
export const API_KEY = process.env["API_KEY"] ?? "anime-podcast-secret-key";