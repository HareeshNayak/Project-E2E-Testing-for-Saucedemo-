// pages/CheckoutPage.js
import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifyPrices(expectedItemTotal) {
    const subtotalText = await this.itemTotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    const itemTotal = parseFloat(subtotalText.replace('Item total: $', ''));
    const tax = parseFloat(taxText.replace('Tax: $', ''));
    const total = parseFloat(totalText.replace('Total: $', ''));

    expect(itemTotal).toBe(expectedItemTotal);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async verifyConfirmation() {
    await expect(this.confirmationHeader).toContainText('Thank you for your order!');
    await expect(this.backHomeButton).toBeVisible();
  }
}
