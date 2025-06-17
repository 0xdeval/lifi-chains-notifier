import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { sendTelegramMessage } from "./utils/telegram";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REMOTE_URL =
  "https://raw.githubusercontent.com/lifinance/contracts/refs/heads/main/config/networks.json";
const LOCAL_CACHE = path.join(__dirname, "networks.cache.json");

interface NetworkMap {
  [chainId: string]: any;
}

// Format: DD.MM.YYYY
const getFormattedDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString("en-GB").replace(/\//g, ".");
};

function fetchRemoteJson(url: string): Promise<NetworkMap> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
}

async function checkForNewChains() {
  const latestData = await fetchRemoteJson(REMOTE_URL);
  const newKeys = Object.keys(latestData);

  let previousKeys: string[] = [];
  if (fs.existsSync(LOCAL_CACHE)) {
    const oldData: NetworkMap = JSON.parse(
      fs.readFileSync(LOCAL_CACHE, "utf8")
    );
    previousKeys = Object.keys(oldData);
  }

  const added = newKeys.filter((key) => !previousKeys.includes(key));
  const removed = previousKeys.filter((key) => !newKeys.includes(key));

  if (added.length || removed.length) {
    let message = `*LiFi Chain Monitor*\n📅 ${getFormattedDate()}\n`;
    if (added.length) message += `🆕 Added: \`${added.join("`, `")}\`\n`;
    if (removed.length) message += `❌ Removed: \`${removed.join("`, `")}\``;
    await sendTelegramMessage(message);
  } else {
    console.log("✅ No changes in chain list.");
  }

  fs.writeFileSync(LOCAL_CACHE, JSON.stringify(latestData, null, 2));
}

checkForNewChains().catch((err) => {
  console.error("[-] Script error:", err.message);
  process.exit(1);
});
