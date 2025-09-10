import { test, expect } from '@playwright/test';
 
test.setTimeout(90000);
 
test('Amazon - Search and Add to Cart', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
 
  const searchBox = page.getByRole('searchbox', { name: 'Search Amazon.in' });
  await searchBox.click();
  await searchBox.fill('wireless headphones');
  await searchBox.press('Enter');
 
 
  await page.getByRole('link', { name: 'Apply the filter 4 Stars & Up' }).click();
 
 
  const page1Promise = page.waitForEvent('popup');
  await page.locator('.a-link-normal.s-no-outline').first().click();
  const page1 = await page1Promise;
 
 
  await page1.locator('#add-to-cart-button').waitFor({ state: 'visible' });
 
 
  await page1.locator('#add-to-cart-button').click();
});