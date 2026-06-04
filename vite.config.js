import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import geminiApi from "./api/gemini.js";

function stripEnvValueQuotes(value) {
  const trimmedValue = value.trim();
  const quote = trimmedValue[0];

  if ((quote === "\"" || quote === "'") && trimmedValue.endsWith(quote)) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

// Doc tat ca bien moi truong tu file .env
function readEnvFile(filePath) {
  if (!existsSync(filePath)) return {};

  const result = {};
  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) continue;

    const match = /^(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/.exec(trimmedLine);
    if (match) {
      result[match[1]] = stripEnvValueQuotes(match[2]);
    }
  }

  return result;
}

function getLocalApiKeys(mode) {
  const envFiles = [
    ".env",
    ".env.local",
    `.env.${mode}`,
    `.env.${mode}.local`,
  ];

  let keys = {};

  for (const envFile of envFiles) {
    const parsed = readEnvFile(resolve(process.cwd(), envFile));
    keys = { ...keys, ...parsed };
  }

  return {
    geminiApiKey: keys.GEMINI_API_KEY || process.env.GEMINI_API_KEY || "",
    openRouterApiKey: keys.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || "",
  };
}

function localApiPlugin(geminiApiKey, openRouterApiKey) {
  return {
    name: "local-ai-api",
    configureServer(server) {
      server.middlewares.use("/api/gemini", async (request, response) => {
        // Set ca hai keys de handler chinh quyet dinh dung cai nao
        if (geminiApiKey) process.env.GEMINI_API_KEY = geminiApiKey;
        else delete process.env.GEMINI_API_KEY;

        if (openRouterApiKey) process.env.OPENROUTER_API_KEY = openRouterApiKey;
        else delete process.env.OPENROUTER_API_KEY;

        const body = await new Promise((resolve, reject) => {
          const chunks = [];

          request.on("data", (chunk) => chunks.push(chunk));
          request.on("end", () => resolve(Buffer.concat(chunks)));
          request.on("error", reject);
        });

        const apiResponse = await geminiApi.fetch(
          new Request("http://localhost/api/gemini", {
            method: request.method,
            headers: request.headers,
            body: body.length > 0 ? body : undefined,
          }),
        );

        response.statusCode = apiResponse.status;
        apiResponse.headers.forEach((value, key) => {
          response.setHeader(key, value);
        });
        response.end(Buffer.from(await apiResponse.arrayBuffer()));
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const { geminiApiKey, openRouterApiKey } = getLocalApiKeys(mode);

  return {
    plugins: [react(), tailwindcss(), localApiPlugin(geminiApiKey, openRouterApiKey)],
  };
});
