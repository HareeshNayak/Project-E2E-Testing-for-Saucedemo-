// multiple-nav.spec.js
import { test, expect } from '@playwright/test';

test('Navigate to multiple sites and print titles', async ({ page }) => {
  // 1. Navigate to Playwright docs
  await page.goto('https://playwright.dev');
  const playwrightTitle = await page.title();
  console.log('Playwright Title:', playwrightTitle);

  // 2. Navigate to Wikipedia
  await page.goto('https://www.wikipedia.org/');
  const wikipediaTitle = await page.title();
  console.log('Wikipedia Title:', wikipediaTitle);

  // 3. Navigate to Google
  await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
  const googleTitle = await page.title();
  console.log('Google Title:', googleTitle);
});
