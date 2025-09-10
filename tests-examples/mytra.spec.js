import { test, expect } from '@playwright/test';
 
test('test', async ({ page }) => {
  await page.goto('https://www.myntra.com/');
  await page.getByRole('textbox', { name: 'Search for products, brands' }).click();
  await page.getByRole('textbox', { name: 'Search for products, brands' }).fill('mens tshirt');
  await page.getByRole('textbox', { name: 'Search for products, brands' }).press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'Black (43020)' }).locator('div').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Campus Sutra Men Solid Polo' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'S', exact: true }).click();
  await page1.getByText('ADD TO BAG').click();
  await page1.getByText('Bag', { exact: true }).click();
});