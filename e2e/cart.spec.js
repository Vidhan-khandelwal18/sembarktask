const { test, expect } = require('@playwright/test');

test.describe('Cart', () => {
  test('add item to cart and see count update', async ({ page }) => {
    await page.goto('/');
    await page.locator('article a').first().click();
    await page.locator('button[aria-label="Add to cart"]').click();
    // Navbar cart badge should show 1
    await expect(page.locator('nav a[aria-label*="Cart"]')).toContainText('1', { timeout: 5000 });
  });

  test('cart page shows added item', async ({ page }) => {
    await page.goto('/');
    await page.locator('article a').first().click();
    await page.locator('button[aria-label="Add to cart"]').click();
    await page.goto('/cart');
    await expect(page.locator('ul li').first()).toBeVisible();
  });

  test('remove item from cart', async ({ page }) => {
    await page.goto('/');
    await page.locator('article a').first().click();
    await page.locator('button[aria-label="Add to cart"]').click();
    await page.goto('/cart');
    const removeBtn = page.locator('button[aria-label^="Remove"]').first();
    await removeBtn.click();
    await expect(page.locator('text=Your cart is empty')).toBeVisible({ timeout: 5000 });
  });

  test('footer shows cart total', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toContainText('Items:');
    await expect(page.locator('footer')).toContainText('Total:');
  });
});
