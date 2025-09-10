// google.spec.js
import { test, expect } from '@playwright/test';

test('Check Google homepage URL', async ({ page }) => {
  // 1. Navigate to the Google homepage
 await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });


  // 2. Assert that the URL is https://www.google.com/
  await expect(page).toHaveURL('https://www.google.com/');

  // 3. Print a success message to the console if the URL is correct
  console.log('✅ Success: URL is correct ->', page.url());
});
