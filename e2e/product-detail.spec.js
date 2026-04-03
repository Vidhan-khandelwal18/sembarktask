const { test, expect } = require('@playwright/test');

test.describe('Product Detail Page', () => {
  test('navigates to product detail from home', async ({ page }) => {
    await page.goto('/');
    await page.locator('article a').first().click();
    await expect(page).toHaveURL(/\/product\/\d+\/details/);
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  });

  test('displays product info', async ({ page }) => {
    await page.goto('/');
    await page.locator('article a').first().click();
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button[aria-label="Add to cart"]')).toBeVisible();
  });

  test('back button returns to home', async ({ page }) => {
    await page.goto('/');
    await page.locator('article a').first().click();
    await page.locator('button[aria-label="Go back"]').click();
    await expect(page).toHaveURL('/');
  });
});
