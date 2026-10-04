import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function runDialogTests() {
  console.log("================================================================================");
  console.log("                 PLAYWRIGHT PROJECT DIALOG ACCESSIBILITY TEST                   ");
  console.log("================================================================================\n");

  const screenshotDir = path.join(process.cwd(), "audit-screenshots");
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

  // Viewports to test: Desktop (1366x768) and Mobile (390x844)
  const testConfigs = [
    { name: "1366x768 Desktop", width: 1366, height: 768, isMobile: false },
    { name: "390x844 Mobile", width: 390, height: 844, isMobile: true },
  ];

  for (const cfg of testConfigs) {
    console.log(`\n--- Testing Dialog on: ${cfg.name} ---`);
    const page = await browser.newPage({ viewport: { width: cfg.width, height: cfg.height } });

    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio_booted", "true");
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Scroll to projects section
    await page.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(600);

    // Find non-link project buttons with aria-haspopup="dialog"
    const dialogButtons = await page.$$('section#projects button[aria-haspopup="dialog"]');
    console.log(`Found ${dialogButtons.length} non-link project dialog triggers.`);

    for (let i = 0; i < dialogButtons.length; i++) {
      const btn = dialogButtons[i];
      const projectLabel = (await btn.getAttribute("aria-label")) || `Project-${i}`;
      console.log(`\nTesting trigger [${i + 1}/${dialogButtons.length}]: ${projectLabel}`);

      // 1. Mouse Click Test
      await btn.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      const scrollYBefore = await page.evaluate(() => window.scrollY);

      await btn.click();
      await page.waitForTimeout(300);

      // Assert dialog is open and visible
      const dialogStatusOpen = await page.evaluate(() => {
        const dialog = document.querySelector("dialog.project-dialog");
        const title = document.querySelector("#dialog-project-title");
        return {
          exists: Boolean(dialog),
          open: dialog ? dialog.open : false,
          visible: dialog ? window.getComputedStyle(dialog).display !== "none" : false,
          titleText: title ? title.textContent : "",
        };
      });

      const openPass = dialogStatusOpen.open && dialogStatusOpen.visible;
      console.log(`  [${openPass ? "PASS" : "FAIL"}] Dialog Open via Mouse: "${dialogStatusOpen.titleText}"`);

      // Save screenshot of open dialog
      const dialogScreenshotName = cfg.isMobile
        ? `dialog-390x844-${i === 0 ? "research-collab-hub" : "iot-weather"}.png`
        : `dialog-1366x768-${i === 0 ? "research-collab-hub" : "iot-weather"}.png`;
      await page.screenshot({ path: path.join(screenshotDir, dialogScreenshotName) });
      console.log(`  [INFO] Captured screenshot: audit-screenshots/${dialogScreenshotName}`);

      // Press Escape to close
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);

      // Assert closed
      const dialogStatusClosed = await page.evaluate(() => {
        const dialog = document.querySelector("dialog.project-dialog");
        return {
          open: dialog ? dialog.open : false,
        };
      });
      const closePass = !dialogStatusClosed.open;
      console.log(`  [${closePass ? "PASS" : "FAIL"}] Dialog Closed via Escape`);

      // Assert focus returned to trigger button
      const focusReturned = await page.evaluate((triggerIdx) => {
        const triggers = document.querySelectorAll('section#projects button[aria-haspopup="dialog"]');
        return document.activeElement === triggers[triggerIdx];
      }, i);
      console.log(`  [${focusReturned ? "PASS" : "FAIL"}] Focus Returned to Trigger Button`);

      // Assert scrollY unchanged
      const scrollYAfter = await page.evaluate(() => window.scrollY);
      const scrollUnchanged = Math.abs(scrollYAfter - scrollYBefore) <= 2;
      console.log(
        `  [${scrollUnchanged ? "PASS" : "FAIL"}] Scroll Position Unchanged (${scrollYBefore}px -> ${scrollYAfter}px)`
      );

      // 2. Keyboard Test (Tab / Focus -> Enter -> Escape)
      console.log(`  Testing keyboard interaction (Focus -> Enter -> Esc)...`);
      await btn.focus();
      await page.keyboard.press("Enter");
      await page.waitForTimeout(300);

      const kbdOpen = await page.evaluate(() => {
        const dialog = document.querySelector("dialog.project-dialog");
        return dialog && dialog.open;
      });

      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);

      const kbdClosed = await page.evaluate(() => {
        const dialog = document.querySelector("dialog.project-dialog");
        return !dialog || !dialog.open;
      });

      const kbdPass = kbdOpen && kbdClosed;
      console.log(`  [${kbdPass ? "PASS" : "FAIL"}] Keyboard Open & Close (Enter / Esc)`);

      results.push({
        viewport: cfg.name,
        trigger: projectLabel,
        mouseOpen: openPass ? "PASS" : "FAIL",
        closeEsc: closePass ? "PASS" : "FAIL",
        focusRestore: focusReturned ? "PASS" : "FAIL",
        scrollPreserved: scrollUnchanged ? "PASS" : "FAIL",
        keyboardNav: kbdPass ? "PASS" : "FAIL",
      });
    }

    await page.close();
  }

  await browser.close();

  console.log("\n================================================================================");
  console.log("                           DIALOG TEST SUMMARY TABLE                            ");
  console.log("================================================================================");
  console.table(results);

  const anyFailures = results.some(
    (r) =>
      r.mouseOpen === "FAIL" ||
      r.closeEsc === "FAIL" ||
      r.focusRestore === "FAIL" ||
      r.scrollPreserved === "FAIL" ||
      r.keyboardNav === "FAIL"
  );

  if (anyFailures) {
    console.error("Some dialog tests failed. Check summary above.");
    process.exit(1);
  } else {
    console.log("\nAll project dialog accessibility and scroll tests passed 100%!");
  }
}

runDialogTests().catch((err) => {
  console.error("Dialog test run failed:", err);
  process.exit(1);
});
