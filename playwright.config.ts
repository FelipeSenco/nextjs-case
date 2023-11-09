import { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config: PlaywrightTestConfig = {
  testDir: "./src/Playwright",
  use: {
    headless: false,
  },
};
export default config;
