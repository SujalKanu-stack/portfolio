import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { width: 390, height: 844, name: "390x844-mobile" },
  { width: 768, height: 1024, name: "768x1024-tablet" },
  { width: 1366, height: 768, name: "1366x768-desktop" },
  { width: 1440, height: 900, name: "1440x900-desktop" },
];

const SECTIONS = ["home", "about", "projects", "journey", "contact"];
const CERT_KEYWORDS = ["Certification", "Infosys", "MathWorks", "NepaTronix"];
const FORBIDDEN_PROJECTS_KEYWORDS = ["MATLAB", "Curve", "Residual", "Regression"];

async function runLayoutCheck() {
  console.log("================================================================================");
  console.log("            PLAYWRIGHT RESPONSIVE CONTENT LAYOUT & AUDIT CHECK (v5)             ");
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
  let matlabIsolationPass = true;

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

    // Certifications isolation and MATLAB removal check (run once on primary desktop)
    if (vp.name.includes("1366x768")) {
      const domChecks = await page.evaluate(
        ({ certKeywords, forbiddenKeywords }) => {
          const projectsEl = document.querySelector("#projects");
          const journeyEl = document.querySelector("#journey");

          const projectsText = projectsEl ? projectsEl.textContent || "" : "";
          const journeyText = journeyEl ? journeyEl.textContent || "" : "";

          const certsLeakedInProjects = certKeywords.filter((kw) => projectsText.includes(kw));
          const certsPresentInJourney = certKeywords.every((kw) => journeyText.includes(kw));

          const forbiddenLeakedInProjects = forbiddenKeywords.filter((kw) => projectsText.includes(kw));

          return {
            certsLeakedInProjects,
            certsPresentInJourney,
            forbiddenLeakedInProjects,
          };
        },
        { certKeywords: CERT_KEYWORDS, forbiddenKeywords: FORBIDDEN_PROJECTS_KEYWORDS }
      );

      if (domChecks.certsLeakedInProjects.length > 0 || !domChecks.certsPresentInJourney) {
        certIsolationPass = false;
        console.error(`[FAIL] Certifications isolation test failed! Leaked in projects: ${domChecks.certsLeakedInProjects.join(", ")}`);
      } else {
        console.log(`[PASS] Certifications Isolation: All keywords present in #journey and 0 in #projects.`);
      }

      if (domChecks.forbiddenLeakedInProjects.length > 0) {
        matlabIsolationPass = false;
        console.error(`[FAIL] MATLAB project leaked into #projects DOM: ${domChecks.forbiddenLeakedInProjects.join(", ")}`);
      } else {
        console.log(`[PASS] MATLAB Removal: Zero references to MATLAB / Curve in #projects DOM.`);
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
          if (el && window.__lenis) window.__lenis.scrollTo(el, { duration: 0.3, offset: -16 });
          else if (el) el.scrollIntoView();
        }, sectionId);
      }

      await page.waitForTimeout(600);

      // Measure section metrics
      const metrics = await page.evaluate(
        ({ id, vh, vw }) => {
          const sec = document.getElementById(id);
          const nav = document.querySelector("header nav");
          const navBottom = nav ? nav.getBoundingClientRect().bottom : 50;

          if (!sec) return null;
          const rect = sec.getBoundingClientRect();

          // 1. Heading visible below nav
          const heading = sec.querySelector("h1, h2, [id$='heading']");
          let headingVisible = true;
          let headingTop = 0;
          if (heading) {
            const hRect = heading.getBoundingClientRect();
            headingTop = Math.round(hRect.top);
            headingVisible = hRect.top >= navBottom - 24 && hRect.top <= vh;
          }

          // 2. Horizontal fit (no page-level x-overflow)
          const noXOverflow = document.documentElement.scrollWidth <= vw + 2;

          // 3. Side index right bounds (desktop only)
          const sideIndexLabel = document.querySelector(`[data-testid="side-index-label-${id}"]`);
          let sideIndexPass = true;
          let sideIndexRight = 0;
          if (sideIndexLabel && vw >= 1024) {
            const sRect = sideIndexLabel.getBoundingClientRect();
            sideIndexRight = Math.round(sRect.right);
            sideIndexPass = sRect.right <= vw - 8;
          }

          return {
            id,
            rectTop: Math.round(rect.top),
            headingTop,
            headingVisible,
            noXOverflow,
            sideIndexRight,
            sideIndexPass,
          };
        },
        {
          id: sectionId,
          vh: vp.height,
          vw: vp.width,
        }
      );

      if (metrics) {
        const pass = metrics.headingVisible && metrics.noXOverflow && metrics.sideIndexPass;

        tableResults.push({
          viewport: vp.name,
          section: `#${sectionId}`,
          headingTop: `${metrics.headingTop}px`,
          headingStatus: metrics.headingVisible ? "PASS" : "FAIL",
          noXOverflow: metrics.noXOverflow ? "PASS" : "FAIL",
          sideIndex: `${metrics.sideIndexRight}px`,
          sideIndexStatus: metrics.sideIndexPass ? "PASS" : "FAIL",
          overall: pass ? "PASS" : "FAIL",
        });

        console.log(
          `  [${pass ? "PASS" : "FAIL"}] #${sectionId.padEnd(8)} | HeadingTop: ${metrics.headingTop}px | Overflow: ${metrics.noXOverflow ? "OK" : "OVERFLOW"} | SideIndex: ${metrics.sideIndexPass ? "PASS" : "FAIL"}`
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
  console.log(`MATLAB Removal from #projects DOM: ${matlabIsolationPass ? "PASS" : "FAIL"}`);
  console.log(`Audit screenshots stored in: ${screenshotDir}\n`);

  const hasFailures =
    tableResults.some((r) => r.overall === "FAIL") ||
    !certIsolationPass ||
    !matlabIsolationPass;

  if (hasFailures) {
    console.error("Layout audit detected issues. Review the table above.");
    process.exit(1);
  } else {
    console.log("All sections passed responsive content layout and side-index checks!");
  }
}

runLayoutCheck().catch((err) => {
  console.error("Layout check execution error:", err);
  process.exit(1);
});
