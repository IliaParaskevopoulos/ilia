// Render each HTML source in this folder to a PDF in ../
// Usage: node render.js
const { chromium } = require('playwright');
const path = require('path');

const docs = ['icp', 'competitors', 'positioning', 'messaging'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const name of docs) {
    await page.goto('file://' + path.join(__dirname, name + '.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(__dirname, '..', `PAJ_${name}.pdf`),
      preferCSSPageSize: true,
      printBackground: true,
    });
    console.log('wrote', `PAJ_${name}.pdf`);
  }
  await browser.close();
})();
