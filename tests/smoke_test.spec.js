import { test, expect } from '@playwright/test';
import { setTimeout } from 'node:timers';


test('test', async ({ page }) => {
     test.setTimeout(60000);

 //Module 1
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await expect(page.locator('[data-test="login-container"] div').filter({ hasText: 'Login' }).first()).toBeVisible();

  //Module 2 
  //Lab 2.1 Successfull login and Navigation
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  const container = page.locator('.inventory_container');
  await expect(container).toBeVisible();
  
  const items = container.locator('.inventory_item');
  await expect(await items.count()).toBeGreaterThan(1)

  //Lab 2.2  Locator Strategy Mastery

  const ProductName=page.getByText('Sauce Labs Backpack');
  await expect(ProductName).toBeVisible();
  const ProductImage=page.getByAltText('Sauce Labs Backpack');
  await expect(ProductImage).toBeVisible();
  await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible();

  //Module 3
  // Lab 3.1: Shopping Cart Functionality
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);
  const ItemNames=page.locator('.inventory_item_name');
  await expect(ItemNames).toContainText(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);

  //lab 3.2: Handling Dynamic Sorting
    await page.goto('https://www.saucedemo.com/inventory.html');

  await page.getByRole('combobox').selectOption('lohi');
  await page.waitForTimeout(5000);

  const productPrice = await page.locator('.inventory_item_price').allTextContents();
  const prices = productPrice.map(price => parseFloat(price.replace('$', '')));
  const sortedPrices = [...prices].sort((a,b) => a-b);
  expect(prices).toEqual(sortedPrices);

  //Module 4 Advanced Interactions & Flows
  //Lab 4.1: End to end checkout process

  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('hareesh');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('nayak');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('560001');
  await page.locator('[data-test="continue"]').click();

  const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
  const taxText = await page.locator('[data-test="tax-label"]').textContent();
  const totalText = await page.locator('[data-test="total-label"]').textContent();

  const itemTotal = parseFloat(subtotalText.replace('Item total: $', ''));
  const tax = parseFloat(taxText.replace('Tax: $', ''));
  const total = parseFloat(totalText.replace('Total: $', ''));

  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

  

});