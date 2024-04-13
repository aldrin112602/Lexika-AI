// import { PlatformNode } from "@builder.io/qwik-city/middleware/node";
import {
  type PlatformNode,
} from "@builder.io/qwik-city/middleware/node";

import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import { join } from "path";
import fs from "fs";


declare global {
  interface QwikCityPlatform extends PlatformNode { }
}

const distDir = join(fileURLToPath(import.meta.url), "..", "..", "dist");
const buildDir = join(distDir, "build");

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(`/build`, express.static(buildDir, { immutable: true, maxAge: "1y" }));
app.use(express.static(distDir, { redirect: false }));

const readJSONData = async (path: string) => {
  try {
    const data = await fs.promises.readFile(path, "utf-8");
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
};

app.get("/", async (req, res) => {
  try {
    const data = await readJSONData("./chat_history.json");
    res.send(data);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}/`);
});
