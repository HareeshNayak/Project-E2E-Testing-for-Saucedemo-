import { test, expect } from '@playwright/test';
test.setTimeout(90000);
test('test', async ({ page }) => {
  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('harishnayaksn45@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).dblclick();
  await page.getByRole('textbox', { name: 'Password' }).fill('neetu1245');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByRole('link', { name: 'New' }).click();
});