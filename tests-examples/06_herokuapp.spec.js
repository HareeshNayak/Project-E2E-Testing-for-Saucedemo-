// herokuapp.spec.js
import { test, expect } from '@playwright/test';

test('Navigate to Herokuapp and verify title + URL', async ({ page }) => {
  // 1. Navigate to the Internet Herokuapp page
  await page.goto('https://the-internet.herokuapp.com/');

  // 2. Assert that you have landed on the correct page by checking the title
  await expect(page).toHaveTitle('The Internet');

  // 3. Verify the final URL did not change
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

  console.log('✅ Successfully reached The Internet Herokuapp page with no redirect.');
});
