import { request } from '@playwright/test';

export default async function globalSetup() {
  const apiContext = await request.newContext({
    baseURL: 'https://qauto.forstudy.space',
  });

  const response = await apiContext.post('/api/auth/signin', {
    data: {
      email: 'geresat765@paylaar.com',
      password: 'Password123'
    }
  });

  const storageState = await apiContext.storageState();
  require('fs').writeFileSync('storageState.json', JSON.stringify(storageState));
}