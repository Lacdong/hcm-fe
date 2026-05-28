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

function readApiKeyFromFile(filePath) {
  if (!existsSync(filePath)) return undefined;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) continue;

    const match = /^(?:export\s+)?OPENROUTER_API_KEY\s*=\s*(.*)$/.exec(trimmedLine);

    if (match) {
      return stripEnvValueQuotes(match[1]);
    }
  }

  return undefined;
}

function getLocalApiKey(mode) {
  const envFiles = [
    ".env",
    ".env.local",
    `.env.${mode}`,
    `.env.${mode}.local`,
  ];
  let hasEnvFileKey = false;
  let apiKey = "";

  for (const envFile of envFiles) {
    const value = readApiKeyFromFile(resolve(process.cwd(), envFile));

    if (value !== undefined) {
      hasEnvFileKey = true;
      apiKey = value;
    }
  }

  if (hasEnvFileKey) {
    return apiKey.trim();
  }

  return String(process.env.OPENROUTER_API_KEY || "").trim();
}

function localApiPlugin(apiKey) {
  return {
    name: "local-openrouter-api",
    configureServer(server) {
      server.middlewares.use("/api/gemini", async (request, response) => {
        if (apiKey) {
          process.env.OPENROUTER_API_KEY = apiKey;
        } else {
          delete process.env.OPENROUTER_API_KEY;
        }

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
  const apiKey = getLocalApiKey(mode);

  return {
    plugins: [react(), tailwindcss(), localApiPlugin(apiKey)],
  };
});
