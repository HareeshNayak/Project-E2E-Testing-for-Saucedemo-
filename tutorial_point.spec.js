import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
  await expect(page.locator('#practiceForm')).toMatchAriaSnapshot(`- heading "Student Registration Form" [level=1]`);
});