import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL);
  await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  await page.context().storageState({ path: 'storageState.json' });
});

import { request } from '@playwright/test';

export async function getAuthState() {
  const apiContext = await request.newContext({
    baseURL: 'https://qauto.forstudy.space',
  });

  // 🔐 Логін (підстав реальні креденшали)
  const loginResponse = await apiContext.post('/api/auth/signin', {
    data: {
      email: 'geresat765@paylaar.com',
      password: 'Password123'
    }
  });

  const cookies = loginResponse.headers()['set-cookie'];

  return {
    cookies,
  };
}