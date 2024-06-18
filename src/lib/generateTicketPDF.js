import puppeteer from 'puppeteer';

export const generatePdfFromHtml = async (htmlContent) => {
    const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
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
