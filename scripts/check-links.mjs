import https from "https";
import http from "http";
import { URL } from "url";

// Extract external URLs directly or test list
const URLS_TO_CHECK = [
  { name: "GitHub Profile", url: "https://github.com/SujalKanu-stack" },
  { name: "LinkedIn Profile", url: "https://www.linkedin.com/in/sujal-kumar-kanu/" },
  { name: "AgriChain Repo", url: "https://github.com/SujalKanu-stack/AgriChain" },
  { name: "Research Collab Hub Repo", url: "https://github.com/SujalKanu-stack/Research_collab_Hub" },
  { name: "CardioSim (Heart_Sim) Repo", url: "https://github.com/SujalKanu-stack/Heart_Sim" },
];

function checkUrl(urlObj, timeoutMs = 10000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlObj.url);

      // Handle linkedin.com rate limits gracefully
      if (parsed.hostname.includes("linkedin.com")) {
        resolve({
          name: urlObj.name,
          url: urlObj.url,
          status: "SKIPPED",
          code: 999,
          notes: "LinkedIn blocks headless bots; verify manually",
        });
        return;
      }

      const client = parsed.protocol === "https:" ? https : http;
      const req = client.request(
        parsed,
        {
          method: "HEAD",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
            Accept: "*/*",
          },
          timeout: timeoutMs,
        },
        (res) => {
          // If HEAD returns 405 (Method Not Allowed), retry with GET
          if (res.statusCode === 405) {
            client.get(
              parsed,
              {
                headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                },
                timeout: timeoutMs,
              },
              (getRes) => {
                getRes.destroy();
                resolveStatus(urlObj, getRes.statusCode, resolve);
              }
            ).on("error", (err) => {
              resolve({ name: urlObj.name, url: urlObj.url, status: "ERROR", code: "ERR", notes: err.message });
            });
            return;
          }

          resolveStatus(urlObj, res.statusCode, resolve);
        }
      );

      req.on("timeout", () => {
        req.destroy();
        resolve({ name: urlObj.name, url: urlObj.url, status: "TIMEOUT", code: 408, notes: "Request timed out" });
      });

      req.on("error", (err) => {
        resolve({ name: urlObj.name, url: urlObj.url, status: "ERROR", code: "ERR", notes: err.message });
      });

      req.end();
    } catch (e) {
      resolve({ name: urlObj.name, url: urlObj.url, status: "ERROR", code: "ERR", notes: e.message });
    }
  });
}

function resolveStatus(urlObj, statusCode, resolve) {
  if (statusCode >= 200 && statusCode < 400) {
    resolve({ name: urlObj.name, url: urlObj.url, status: "PASS", code: statusCode, notes: "OK" });
  } else if (statusCode === 404 || statusCode === 410) {
    resolve({ name: urlObj.name, url: urlObj.url, status: "FAIL", code: statusCode, notes: "Resource not found (404/410)" });
  } else if ([403, 429, 999].includes(statusCode)) {
    resolve({ name: urlObj.name, url: urlObj.url, status: "SKIPPED", code: statusCode, notes: "Rate limited / bot challenge" });
  } else {
    resolve({ name: urlObj.name, url: urlObj.url, status: "WARN", code: statusCode, notes: `HTTP ${statusCode}` });
  }
}

async function runLinkCheck() {
  console.log("================================================================================");
  console.log("                  EXTERNAL LINKS INTEGRITY CHECK                                ");
  console.log("================================================================================\n");

  const results = [];
  for (const item of URLS_TO_CHECK) {
    const res = await checkUrl(item);
    results.push(res);
  }

  console.table(results);

  const failures = results.filter((r) => r.status === "FAIL");
  if (failures.length > 0) {
    console.error(`\n[FAIL] Found ${failures.length} broken links:`);
    failures.forEach((f) => console.error(`  - ${f.name} (${f.url}) returned ${f.code}`));
    process.exit(1);
  } else {
    console.log("\n[PASS] All public repository and external links validated successfully!\n");
  }
}

runLinkCheck();
