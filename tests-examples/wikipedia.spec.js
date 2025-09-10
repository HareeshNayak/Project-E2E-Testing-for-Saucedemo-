import { test, expect } from '@playwright/test';

test('Check Wikipedia homepage title and URL', async ({ page }) => {
  // 1. Navigate to the Wikipedia main page
  await page.goto('https://www.wikipedia.org/');

  // 2. Assert that the page title is "Wikipedia"
  await expect(page).toHaveTitle('Wikipedia');

  // 3. Print the current page URL to the console
  console.log('Current Page URL:', page.url());
});