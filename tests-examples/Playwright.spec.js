import { test, expect } from '@playwright/test';

test('Check Playwright homepage title', async ({ page }) => {
  // 1. Navigate to the Playwright documentation homepage
  await page.goto('https://playwright.dev');

  // 2. Print the page title to the console
  const title = await page.title();
  console.log('Page Title:', title);

  // 3. Assert that the title is as expected
  await expect(page).toHaveTitle(
    'Fast and reliable end-to-end testing for modern web apps | Playwright'
  );
});