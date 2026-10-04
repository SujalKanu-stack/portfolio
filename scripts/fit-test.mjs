import { chromium } from "playwright";

const VIEWPORTS = [
  { width: 1366, height: 768, name: "1366x768" },
  { width: 1440, height: 900, name: "1440x900" },
  { width: 1920, height: 1080, name: "1920x1080" },
];

async function runFitTest() {
  console.log("Starting Section Fit Test with Chromium...\n");

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const results = {};

  for (const vp of VIEWPORTS) {
    console.log(`Testing Viewport: ${vp.name} (${vp.width} x ${vp.height})`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    // Set sessionStorage to bypass boot overlay during automated measurement
    await page.addInitScript(() => {
      sessionStorage.setItem("portfolio_booted", "true");
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const sectionFits = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll("section[id]"));
      return sections.map((sec) => {
        const id = sec.id;
        const scrollHeight = sec.scrollHeight;
        const clientHeight = sec.clientHeight;
        const innerHeight = window.innerHeight;
        // Check if content fits within viewport height with a 2px subpixel tolerance
        const fits = scrollHeight <= innerHeight + 2;
        return { id, scrollHeight, clientHeight, innerHeight, fits };
      });
    });

    results[vp.name] = sectionFits;
    sectionFits.forEach((s) => {
      const status = s.fits ? "PASS" : "FAIL";
      console.log(`  [${status}] #${s.id.padEnd(8)}: scrollHeight=${s.scrollHeight}px, windowHeight=${s.innerHeight}px`);
    });

    // Take screenshots of Home and About
    if (vp.name === "1366x768" || vp.name === "1920x1080") {
      await page.screenshot({ path: `public/screenshot-home-${vp.name}.png` });
      const aboutElem = await page.$("#about");
      if (aboutElem) {
        await aboutElem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({ path: `public/screenshot-about-${vp.name}.png` });
      }
    }

    await page.close();
    console.log("");
  }

  await browser.close();
  console.log("Fit Test Completed Successfully!");
}

runFitTest().catch((err) => {
  console.error("Fit test error:", err);
  process.exit(1);
});
