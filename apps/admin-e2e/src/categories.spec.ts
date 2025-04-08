import { test, expect } from '@playwright/test';

test('user can create and delete category', async ({ page }) => {
  await page.goto('http://localhost:4200'); // o tu puerto

  await expect(page.locator('text=Admin Categories')).toBeVisible();

  await page.locator('button[aria-label="add"]').click();

  await page.fill('input[label="Name"]', 'Test Category');
  await page.fill('input[label="Color"]', '#123456');
  await page.click('button:text("Save")');

  await expect(page.locator('text=Test Category')).toBeVisible();

  await page.locator(`text=Test Category >> xpath=.. >> button[aria-label="delete"]`).click();

  await expect(page.locator('text=Test Category')).not.toBeVisible();
});
