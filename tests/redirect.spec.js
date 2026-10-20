const { test, expect } = require('@playwright/test');

test('redirects to /portfolio/ on the same host, keeping query and hash', async ({ page, baseURL }) => {
  await page.goto('/?ref=x#top');
  await expect(page).toHaveURL(`${baseURL}/portfolio/?ref=x#top`);
});

test('redirects without JavaScript too', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(`${baseURL}/portfolio/`);
  await context.close();
});

test('works for any account, not just this one', async ({ page, request, baseURL }) => {
  // Serve this repo's index.html as if it were deployed at forker.github.io.
  await page.route('https://forker.github.io/', async route => route.fulfill({ response: await request.get(`${baseURL}/`) }));
  await page.route('https://forker.github.io/portfolio/', route => route.fulfill({ body: '<title>forker portfolio</title>', contentType: 'text/html' }));
  await page.goto('https://forker.github.io/');
  await expect(page).toHaveURL('https://forker.github.io/portfolio/');
});

const live = process.env.LIVE ? test : test.skip;
live('the deployed site lands on the portfolio', async ({ page }) => {
  const response = await page.request.get('https://shubin123.github.io/');
  expect(response.status()).toBe(200);
  await page.goto('https://shubin123.github.io/');
  await expect(page).toHaveURL('https://shubin123.github.io/portfolio/');
  await expect(page.locator('#profile-link')).toHaveAttribute('href', 'https://github.com/Shubin123');
});
