import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { testUser } from '../../test-data/user';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(testUser.email, testUser.password);

  await expect(page).toHaveURL(/panel/);

  console.log(await page.url());

  await page.context().storageState({
    path: 'storageState.json',
  });

  console.log('Storage state saved');
});