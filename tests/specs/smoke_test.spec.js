// tests/checkout.test.js
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('End-to-end checkout using POM', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Login
  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // Inventory
  await inventory.verifyPage();
  await inventory.addItemToCart('sauce-labs-backpack');
  await inventory.addItemToCart('sauce-labs-bolt-t-shirt');

  // Cart
  await inventory.goToCart();
  await cart.verifyCartCount(2);
  await cart.verifyItemNames(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);
  await cart.checkout();

  // Checkout
  await checkout.fillCheckoutInfo('Hareesh', 'Nayak', '560001');
  await checkout.verifyPrices(45.98);
  await checkout.finishCheckout();
  await checkout.verifyConfirmation();
});
