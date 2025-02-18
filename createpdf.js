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
    width: 1200,
    height: 1600,
    deviceScaleFactor: 0.8,
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
      top: "1mm",
      bottom: "1mm",
      left: "1mm",
      right: "1mm",
    },
    displayHeaderFooter: false,
    scale: 1.0,
  };

  await page.pdf(pdfOptions);
  await browser.close();
  console.log("PDF generated successfully: resume.pdf");
}

generateResumePdf().catch((err) => {
  console.error("Error generating PDF:", err);
});
