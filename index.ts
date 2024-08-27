import puppeteer, { Browser } from 'puppeteer';

const url = 'https://books.toscrape.com/';

const main = async () => {
    try {
        const browser: Browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        console.log("Test");
        await page.goto(url);
        
        

        await browser.close();
    } 
    catch (error) {
        console.error('Error:', error);
    }
};

main();
