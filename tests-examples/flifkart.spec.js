import { test, expect } from '@playwright/test';
test.setTimeout(90000);

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  await page.getByRole('link', { name: 'mobiles', exact: true }).click();
  await page.getByTitle('GB  Above').locator('div').nth(1).click();
  await page.getByTitle('OnePlus').locator('div').nth(1).click();
  await page.getByTitle('Google').locator('div').nth(1).click();
  await page.getByTitle('realme').locator('div').nth(1).click();
  await page.getByTitle('Samsung').locator('div').nth(1).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '(Refurbished) Samsung Galaxy F62 (Laser Blue, 128 GB) Currently unavailable (' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'NOTIFY ME' }).click();
  await page1.getByRole('button', { name: 'Allow' }).click();
});