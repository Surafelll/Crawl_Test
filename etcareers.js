const puppeteer = require('puppeteer');
const url = 'https://etcareers.com/jobs/';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 900000000 });

    let jobs = [];
    
    // Function to scrape jobs on the current page
    const scrapeJobs = async () => {
        const jobsOnPage = await page.evaluate(() => {
            const jobElements = document.querySelectorAll('.widgets__container > .section > article > .media-body');
            const jobArray = [];

            for (const jobElement of jobElements) {
                const heading = jobElement.querySelector('.media-heading')?.textContent.trim();
                const flexibility = jobElement.querySelector('.media-right .listing-item__date')?.textContent.trim();
                const employmentType = jobElement.querySelector('.media-right .listing-item__employment-type')?.textContent.trim();
                const company = jobElement.querySelector('.listing-item__info .listing-item__info--item-company')?.textContent.trim();
                const location = jobElement.querySelector('.listing-item__info .listing-item__info--item-location')?.textContent.trim();
                const description = jobElement.querySelector('.media-body .listing-item__desc')?.textContent.trim();

                jobArray.push({
                    heading: heading || 'No heading found',
                    flexibility: flexibility || 'No date found',
                    employmentType: employmentType || 'No employment type found',
                    company: company || 'No company found',
                    location: location || 'No location found',
                    description: description || 'No description found'
                });
            }
            return jobArray;
        });

        jobs = jobs.concat(jobsOnPage);
    };

    // Scrape the first page
    await scrapeJobs();

    // Loop through pagination
    /*
    while (true) {
        const nextButton = await page.$('.load-more'); // Update the selector based on the actual "Next" button

        if (!nextButton) {
            break; // Exit loop if no "Next" button is found (last page)
        }

        await Promise.all([
            nextButton.click(),
            page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 900000000 })
        ]);

        // Scrape the jobs on the new page
        await scrapeJobs();
    }
    */

    // Output each job in the desired format
    jobs.forEach(job => {
        console.log(`heading: '${job.heading}',`);
        console.log(`flexibility: '${job.flexibility}',`);
        console.log(`employmentType: '${job.employmentType}',`);
        console.log(`company: '${job.company}',`);
        console.log(`location: '${job.location}',`);
        console.log(`description: '${job.description}'\n`);
    });

    await browser.close();
})();
