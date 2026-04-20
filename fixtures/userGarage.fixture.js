import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
  const garagePage = new GaragePage(page);
  await use(garagePage);
},
});

export const expect = test.expect;