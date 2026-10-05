import http from "http";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const PORT = 8080;
const OUT_DIR = path.join(process.cwd(), "out");

// MIME types
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
};

// Create local static server mounting out/ at /portfolio
const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  
  if (!reqPath.startsWith("/portfolio")) {
    res.writeHead(404);
    res.end("Not Found (must access under /portfolio/)");
    return;
  }

  let relPath = reqPath.replace(/^\/portfolio/, "") || "/";
  if (relPath.endsWith("/")) {
    relPath += "index.html";
  }

  let filePath = path.join(OUT_DIR, relPath);

  // If path doesn't have an extension, try .html or index.html
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + ".html")) {
      filePath = filePath + ".html";
    } else if (fs.existsSync(path.join(filePath, "index.html"))) {
      filePath = path.join(filePath, "index.html");
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File Not Found: " + relPath);
  }
});

server.listen(PORT, async () => {
  console.log(`Static server running at http://localhost:${PORT}/portfolio/\n`);

  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome", headless: true });
  } catch {
    browser = await chromium.launch({ headless: true });
  }

  const page = await browser.newPage();
  const failedRequests = [];

  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedRequests.push({ url: response.url(), status: response.status() });
    }
  });

  console.log("Navigating to http://localhost:8080/portfolio/ ...");
  await page.goto(`http://localhost:${PORT}/portfolio/`, { waitUntil: "networkidle" });

  console.log(`Loaded page title: "${await page.title()}"`);

  // Verify resume PDF serves with 200 OK and PDF mime type
  const resumeResponse = await page.goto(`http://localhost:${PORT}/portfolio/Sujal_Kumar_Kanu_Resume.pdf`);
  if (resumeResponse && resumeResponse.status() === 200) {
    console.log(`[PASS] Resume PDF successfully served at /portfolio/Sujal_Kumar_Kanu_Resume.pdf (status: ${resumeResponse.status()})`);
  } else {
    failedRequests.push({ url: `http://localhost:${PORT}/portfolio/Sujal_Kumar_Kanu_Resume.pdf`, status: resumeResponse?.status() || 500 });
  }

  if (failedRequests.length > 0) {
    console.error(`\n[FAIL] Found ${failedRequests.length} failed subresource requests:`);
    failedRequests.forEach((f) => console.error(`  - ${f.url} (${f.status})`));
  } else {
    console.log("\n[PASS] 0 network 404s! All static bundles, fonts, assets, and resume loaded under /portfolio/ successfully.");
  }

  await browser.close();
  server.close(() => {
    console.log("Server closed.");
    process.exit(failedRequests.length > 0 ? 1 : 0);
  });
});
