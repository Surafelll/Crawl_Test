import { Browser } from "puppeteer";

const puppeteer = require('puppeteer') ;

const url ='https://books.toscrape.com/' ;

const main = async() =>{
    const browser: Browser = await puppeteer.launch() ;
    // console.log("Test");
    await browser.close()
    
}

main()