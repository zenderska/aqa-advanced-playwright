import { test, expect } from '../../fixtures/userGarage.fixture.js';

test('User can open garage page when logged in', async ({ userGaragePage }) => {
  await userGaragePage.open();
  await expect(userGaragePage.title).toHaveText('Garage');
});

console.log(test);