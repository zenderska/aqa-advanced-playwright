import { test } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage.js';

test('Mock profile API and verify UI using Page Object', async ({ page }) => {

  const profilePage = new ProfilePage(page);

  await page.route('**/api/users/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          photoFilename: 'super-admin.png',
          name: 'Test Mock User',
          email: 'qa.mock@demo.com'
        }
      })
    });
  });

  await profilePage.open();

  await page.waitForTimeout(1000);

  await profilePage.expectUserName('Test Mock User');
  await profilePage.expectAvatar('super-admin.png');
});