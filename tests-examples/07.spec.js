// herokuapp-text.spec.js
import { test, expect } from '@playwright/test';

test('Check visible text on Herokuapp homepage', async ({ page }) => {
  // 1. Navigate to the Internet Herokuapp page
  await page.goto('https://the-internet.herokuapp.com/');

  // 2. Assert that the text "Welcome to the-internet" is visible
  const heading = page.locator('h1'); // locate the heading element
  await expect(heading).toHaveText('Welcome to the-internet');

  console.log('✅ Verified: "Welcome to the-internet" text is visible on the page.');
});
