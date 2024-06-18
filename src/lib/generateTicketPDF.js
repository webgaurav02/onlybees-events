import puppeteer from 'puppeteer';

export const generatePdfFromHtml = async (htmlContent) => {
    browser = await puppeteer.launch({
        headless: true, // Run in headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some environments
    });
    const page = await browser.newPage();
    
    // Set content to the HTML string
    await page.setContent(htmlContent, { waitUntil: 'load' });
    
    // Generate the PDF
    const pdfBuffer = await page.pdf({
        format: 'A3',
        printBackground: true,
    });
    
    await browser.close();
    
    return pdfBuffer;
};
