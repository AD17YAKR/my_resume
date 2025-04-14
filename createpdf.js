const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generateResumePdf() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 800,
    height: 1100,
    deviceScaleFactor: 1.0,
  });

  const htmlPath = path.join(__dirname, "index.html");
  await page.goto(`file://${htmlPath}`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  const pdfOptions = {
    path: "resume.pdf",
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0.4cm",
      bottom: "0.4cm",
      left: "0.8cm",
      right: "0.8cm",
    },
    displayHeaderFooter: false,
    scale: 0.95, // Slightly reduced from 1.0 to fit content better
  };

  await page.pdf(pdfOptions);
  await browser.close();
  console.log("PDF generated successfully: resume.pdf");
}

generateResumePdf().catch((err) => {
  console.error("Error generating PDF:", err);
});
