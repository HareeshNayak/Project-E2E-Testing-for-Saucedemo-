const { test, expect } = require('@playwright/test');

test('Browser navigation basics', async ({ page }) => {
  // Navigate to the TodoMVC app
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Verify page title
  await expect(page).toHaveTitle('React • TodoMVC');

  // Take a screenshot
  await page.screenshot({ path: 'homepage.png', fullPage: true });

  // Reload the page
  await page.reload();
  await expect(page).toHaveTitle('React • TodoMVC'); // re-verify after reload

  // Go to a different URL and then back
  await page.goto('https://demo.playwright.dev/todomvc/#/active');
  await expect(page).toHaveURL(/#\/active/);

  await page.goBack();

  // Verify we're back on the main page (with or without #/)
  await expect(page).toHaveURL(/todomvc(\/#\/)?$/);
});
