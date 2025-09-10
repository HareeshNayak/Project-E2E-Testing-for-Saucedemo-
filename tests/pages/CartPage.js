// pages/CartPage.js
import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async verifyCartCount(expectedCount) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async verifyItemNames(expectedNames) {
    const itemNames = this.page.locator('.inventory_item_name');
    await expect(itemNames).toContainText(expectedNames);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
