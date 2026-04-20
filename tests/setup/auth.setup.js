import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL);
  await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  await page.context().storageState({ path: 'storageState.json' });
});