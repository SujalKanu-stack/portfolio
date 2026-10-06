import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const DEVICES = [
  { name: "iPhone-SE-1st-Gen-320px", width: 320, height: 568, isMobile: true, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1" },
  { name: "iPhone-SE-375px", width: 375, height: 667, isMobile: true, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1" },
  { name: "iPhone-14-Pro-393px", width: 393, height: 852, isMobile: true, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1" },
  { name: "Samsung-Galaxy-S23-360px", width: 360, height: 780, isMobile: true, userAgent: "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36" },
  { name: "Pixel-7-412px", width: 412, height: 915, isMobile: true, userAgent: "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36" },
  { name: "iPad-Tablet-820px", width: 820, height: 1180, isMobile: true, userAgent: "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1" },
  { name: "Laptop-1366px", width: 1366, height: 768, isMobile: false },
  { name: "Desktop-1920px", width: 1920, height: 1080, isMobile: false },
];

const SECTIONS = ["home", "about", "projects", "journey", "contact"];

async function runDeviceAudit() {
  console.log("================================================================================");
  console.log("         COMPREHENSIVE MULTI-DEVICE RESPONSIVE & SCROLL AUDIT                   ");
  console.log("================================================================================\n");

  const screenshotDir = path.join(process.cwd(), "audit-screenshots", "devices");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome", headless: true });
  } catch {
    browser = await chromium.launch({ headless: true });
  }

  const results = [];
  const targetUrl = process.env.TEST_URL || "http://localhost:3000";

  for (const device of DEVICES) {
    console.log(`\nAuditing Device: ${device.name} (${device.width}x${device.height})`);
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      userAgent: device.userAgent,
      isMobile: device.isMobile,
      hasTouch: device.isMobile,
    });

    const page = await context.newPage();

    // Bypass boot sequence during automated audit
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio_booted", "true");
    });

    await page.goto(targetUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    // 1. Initial Page Horizontal Fit Check
    const initialOverflow = await page.evaluate((vw) => {
      return document.documentElement.scrollWidth <= vw;
    }, device.width);

    // Capture Home screenshot
    const homeScreenshot = path.join(screenshotDir, `${device.name}-01-home.png`);
    await page.screenshot({ path: homeScreenshot });

    // 2. Audit each section navigation
    for (const secId of SECTIONS) {
      // Scroll to section
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el && window.__lenis) {
          window.__lenis.scrollTo(el, { duration: 0.4, offset: 0 });
        } else if (el) {
          el.scrollIntoView();
        }
      }, secId);

      await page.waitForTimeout(500);

      const secMetrics = await page.evaluate(
        ({ id, vw, vh }) => {
          const sec = document.getElementById(id);
          const nav = document.querySelector("header nav");
          const navBottom = nav ? nav.getBoundingClientRect().bottom : 55;

          if (!sec) return { found: false };
          const rect = sec.getBoundingClientRect();
          const heading = sec.querySelector("h1, h2, [id$='heading']");

          let headingVisible = true;
          let headingTop = 0;
          if (heading) {
            const hRect = heading.getBoundingClientRect();
            headingTop = Math.round(hRect.top);
            // Heading should not be obscured by top navbar (allow small leeway)
            headingVisible = hRect.top >= navBottom - 24 && hRect.top <= vh;
          }

          const noXOverflow = document.documentElement.scrollWidth <= vw + 1;

          return {
            found: true,
            headingTop,
            headingVisible,
            noXOverflow,
          };
        },
        { id: secId, vw: device.width, vh: device.height }
      );

      const pass = secMetrics.found && secMetrics.headingVisible && secMetrics.noXOverflow;

      results.push({
        device: device.name,
        section: `#${secId}`,
        headingTop: `${secMetrics.headingTop}px`,
        visible: secMetrics.headingVisible ? "PASS" : "FAIL",
        noXOverflow: secMetrics.noXOverflow ? "PASS" : "FAIL",
        status: pass ? "PASS" : "FAIL",
      });

      console.log(`  [${pass ? "PASS" : "FAIL"}] #${secId.padEnd(8)} | Heading: ${secMetrics.headingTop}px | NoOverflow: ${secMetrics.noXOverflow ? "PASS" : "FAIL"}`);
    }

    // Capture Full Page screenshot for mobile and tablet
    const fullScreenshot = path.join(screenshotDir, `${device.name}-full.png`);
    await page.screenshot({ path: fullScreenshot, fullPage: true });

    await context.close();
  }

  await browser.close();

  console.log("\n================================================================================");
  console.log("                     MULTI-DEVICE AUDIT RESULTS SUMMARY                         ");
  console.log("================================================================================");
  console.table(results);

  const failures = results.filter((r) => r.status === "FAIL");
  if (failures.length > 0) {
    console.error(`\n[FAIL] Audit found ${failures.length} issues across devices.`);
    process.exit(1);
  } else {
    console.log(`\n[PASS] All 8 devices (320px to 1920px) passed 100%! No horizontal scrolling, no overflowing elements.`);
    console.log(`Screenshots saved to: ${screenshotDir}\n`);
  }
}

runDeviceAudit().catch((err) => {
  console.error("Device audit execution failed:", err);
  process.exit(1);
});
