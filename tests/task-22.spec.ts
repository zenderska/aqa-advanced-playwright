import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Hillel Qauto');
});

test('should display Garage button on homepage', async ({ page }) => {
  await page.goto('/');

  const garageButton = page.locator('text=Garage');
  await expect(garageButton).toBeVisible();
});