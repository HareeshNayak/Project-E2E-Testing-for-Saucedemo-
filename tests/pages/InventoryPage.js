// pages/InventoryPage.js
import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.items = this.inventoryContainer.locator('.inventory_item');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.getByRole('combobox');
  }

  async verifyPage() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.inventoryContainer).toBeVisible();
    await expect(await this.items.count()).toBeGreaterThan(1);
  }

  async addItemToCart(itemDataTest) {
    await this.page.locator(`[data-test="add-to-cart-${itemDataTest}"]`).click();
  }

  async getItemPrices() {
    const pricesText = await this.page.locator('.inventory_item_price').allTextContents();
    return pricesText.map(price => parseFloat(price.replace('$', '')));
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
