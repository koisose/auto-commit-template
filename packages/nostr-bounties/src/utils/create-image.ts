import playwright from 'playwright';
import sharp from 'sharp';
export async function generateOgImage(url: string): void {
    const decoded=decodeURIComponent(url.split('.').slice(0, -1).join('.'));
    const browser = await playwright.chromium.launch({
        headless: true,
        executablePath: process.env.NODE_ENV !== 'production'
      ? process.env.PW_CHROMIUM_PATH
      : '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--headless', '--disable-gpu'],
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Set the viewport size to match the desired image dimensions.
    await page.setViewportSize({ width: 512, height: 512 });

    // Navigate to the provided URL.
    await page.goto(decoded);

    // Capture a screenshot of the page as the OG image.
    const buffer = await page.screenshot({ type: 'png' });

    // Convert the buffer to an image object
    const image = await sharp(buffer).png().toBuffer();

    const resizedImage = await sharp(image).resize(512, 512).toBuffer();

    // Close the browser.
    await browser.close();
 
}