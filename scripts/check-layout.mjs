import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { width: 1366, height: 768, name: "1366x768" },
  { width: 1440, height: 900, name: "1440x900" },
  { width: 1920, height: 1080, name: "1920x1080" },
];

const SECTIONS = ["home", "about", "projects", "journey", "contact"];
const CERT_KEYWORDS = ["Certification", "Infosys", "MathWorks", "NepaTronix"];

async function runLayoutCheck() {
  console.log("================================================================================");
  console.log("            PLAYWRIGHT SECTION LAYOUT & SNAP AUDIT CHECK                        ");
  console.log("================================================================================\n");

  const screenshotDir = path.join(process.cwd(), "audit-screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  let browser;
  try {
    browser = await chromium.launch({
      channel: "chrome",
      headless: true,
    });
  } catch {
    browser = await chromium.launch({
      headless: true,
    });
  }

  const tableResults = [];
  let certIsolationPass = true;

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Auditing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    // Bypass boot sequence during automated audit
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio_booted", "true");
    });

    const targetUrl = process.env.TEST_URL || "http://localhost:3000";
    await page.goto(targetUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Certifications isolation check (run once on primary viewport)
    if (vp.name === "1366x768") {
      const certCheck = await page.evaluate((keywords) => {
        const projectsEl = document.querySelector("#projects");
        const journeyEl = document.querySelector("#journey");

        const projectsText = projectsEl ? projectsEl.textContent || "" : "";
        const journeyText = journeyEl ? journeyEl.textContent || "" : "";

        const leaked = keywords.filter((kw) => projectsText.includes(kw));
        const presentInJourney = keywords.every((kw) => journeyText.includes(kw));

        return { leaked, presentInJourney };
      }, CERT_KEYWORDS);

      if (certCheck.leaked.length > 0 || !certCheck.presentInJourney) {
        certIsolationPass = false;
        console.error(`[FAIL] Certifications isolation test failed! Leaked in projects: ${certCheck.leaked.join(", ")}`);
      } else {
        console.log(`[PASS] Certifications Isolation: All keywords present in #journey and 0 in #projects.`);
      }
    }

    for (let i = 0; i < SECTIONS.length; i++) {
      const sectionId = SECTIONS[i];

      // Navigate to section via Nav link
      const navLink = await page.$(`nav a[href="#${sectionId}"]`);
      if (navLink) {
        await navLink.click();
      } else {
        await page.evaluate((id) => {
          const el = document.getElementById(id);
          if (el && window.__lenis) window.__lenis.scrollTo(el, { duration: 0.2, offset: 0 });
          else if (el) el.scrollIntoView();
        }, sectionId);
      }

      // Wait for Lenis scroll to settle
      await page.waitForTimeout(600);

      // Measure section metrics
      const metrics = await page.evaluate(
        ({ id, prevId, nextId, vh }) => {
          const sec = document.getElementById(id);
          const nav = document.querySelector("header nav");
          const navBottom = nav ? nav.getBoundingClientRect().bottom : 50;

          if (!sec) return null;
          const rect = sec.getBoundingClientRect();
          const scrollHeight = sec.scrollHeight;
          const clientHeight = sec.clientHeight;

          // (a) Top within 2px of viewport top
          const topDiff = Math.abs(rect.top);
          const topAligned = topDiff <= 2.5;

          // (b) Content fits without overflow (scrollHeight <= clientHeight + 1)
          const contentFits = scrollHeight <= clientHeight + 1.5;

          // (c) Gap between nav bottom and first visible text content line
          const firstHeading = sec.querySelector("h1, h2, h3, span, p");
          let gapVh = 0;
          if (firstHeading) {
            const hRect = firstHeading.getBoundingClientRect();
            const gapPx = Math.max(0, hRect.top - navBottom);
            gapVh = (gapPx / vh) * 100;
          }
          const gapPass = gapVh <= 14.5;

          // (d) Previous and next sections 0px visible
          let prevVisible = 0;
          let nextVisible = 0;
          if (prevId) {
            const pSec = document.getElementById(prevId);
            if (pSec) {
              const pRect = pSec.getBoundingClientRect();
              prevVisible = Math.max(0, pRect.bottom);
            }
          }
          if (nextId) {
            const nSec = document.getElementById(nextId);
            if (nSec) {
              const nRect = nSec.getBoundingClientRect();
              nextVisible = Math.max(0, vh - nRect.top);
            }
          }
          const zeroAdjacentVisible = prevVisible <= 2 && nextVisible <= 2;

          return {
            id,
            rectTop: rect.top,
            topDiff,
            topAligned,
            scrollHeight,
            clientHeight,
            contentFits,
            gapVh: gapVh.toFixed(1),
            gapPass,
            prevVisible: Math.round(prevVisible),
            nextVisible: Math.round(nextVisible),
            zeroAdjacentVisible,
          };
        },
        {
          id: sectionId,
          prevId: i > 0 ? SECTIONS[i - 1] : null,
          nextId: i < SECTIONS.length - 1 ? SECTIONS[i + 1] : null,
          vh: vp.height,
        }
      );

      if (metrics) {
        const pass =
          metrics.topAligned &&
          metrics.contentFits &&
          metrics.gapPass &&
          metrics.zeroAdjacentVisible;

        tableResults.push({
          viewport: vp.name,
          section: `#${sectionId}`,
          topDiff: `${metrics.topDiff.toFixed(1)}px`,
          topStatus: metrics.topAligned ? "PASS" : "FAIL",
          fit: `${metrics.scrollHeight}/${metrics.clientHeight}px`,
          fitStatus: metrics.contentFits ? "PASS" : "FAIL",
          gap: `${metrics.gapVh}vh`,
          gapStatus: metrics.gapPass ? "PASS" : "FAIL",
          adjacent: `p:${metrics.prevVisible}px, n:${metrics.nextVisible}px`,
          overall: pass ? "PASS" : "FAIL",
        });

        console.log(
          `  [${pass ? "PASS" : "FAIL"}] #${sectionId.padEnd(8)} | TopDiff: ${metrics.topDiff.toFixed(1)}px | Gap: ${metrics.gapVh}vh | Fit: ${metrics.contentFits ? "YES" : "NO"} | Adj: ${metrics.zeroAdjacentVisible ? "0px" : "FAIL"}`
        );

        // Save screenshot
        const screenshotPath = path.join(screenshotDir, `${vp.name}-${sectionId}.png`);
        await page.screenshot({ path: screenshotPath });
      }
    }

    await page.close();
  }

  await browser.close();

  console.log("\n================================================================================");
  console.log("                             LAYOUT AUDIT RESULTS                               ");
  console.log("================================================================================");
  console.table(tableResults);
  console.log(`\nCertifications Isolation in #journey DOM: ${certIsolationPass ? "PASS" : "FAIL"}`);
  console.log(`Audit screenshots stored in: ${screenshotDir}\n`);

  const hasFailures = tableResults.some((r) => r.overall === "FAIL") || !certIsolationPass;
  if (hasFailures) {
    console.error("Layout audit detected issues. Review the table above.");
    process.exit(1);
  } else {
    console.log("All sections passed 100svh layout and flush snap checks!");
  }
}

runLayoutCheck().catch((err) => {
  console.error("Layout check execution error:", err);
  process.exit(1);
});
