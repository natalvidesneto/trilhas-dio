import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import type { PodcastModel } from "../models/podecastModel";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const podcastSearch = async (): Promise<PodcastModel[]> => {
    const local = path.join(__dirname, "../data/podcast.json");
    const raw = await fs.readFile(local, "utf-8");
    return JSON.parse(raw) as PodcastModel[];
};