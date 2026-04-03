const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test('loads and displays products', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
    // Wait for at least one product card to appear
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15000 });
  });

  test('category filter updates URL', async ({ page }) => {
    await page.goto('/');
    // Wait for category buttons
    await page.waitForSelector('button[aria-pressed]', { timeout: 10000 });
    const buttons = page.locator('button[aria-pressed]');
    const count = await buttons.count();
    if (count > 1) {
      await buttons.nth(1).click();
      await expect(page).toHaveURL(/category=/);
    }
  });

  test('sort dropdown updates URL', async ({ page }) => {
    await page.goto('/');
    await page.selectOption('#sort-select', 'price_asc');
    await expect(page).toHaveURL(/sort=price_asc/);
  });

  test('filter state persists on refresh', async ({ page }) => {
    await page.goto('/?sort=price_asc');
    await expect(page.locator('#sort-select')).toHaveValue('price_asc');
  });
});
