const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the HTML file
    const htmlPath = path.join(__dirname, 'README.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    // Generate PDF with clickable links
    await page.pdf({
        path: 'README.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    });

    console.log('✅ PDF created successfully: README.pdf');
    await browser.close();
})();
