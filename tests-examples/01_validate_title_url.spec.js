

import { test, expect } from '@playwright/test';

test('validate title and url testautomation', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  
  const actualTitle = await page.title();
  const actualURL = await page.url();

  const expectedTitle = "Test Login | Practice Test Automation";
  const expectedURL = 'https://practicetestautomation.com/practice-test-login/';

  expect(actualTitle).toBe(expectedTitle);
  expect(actualURL).toBe(expectedURL);
});